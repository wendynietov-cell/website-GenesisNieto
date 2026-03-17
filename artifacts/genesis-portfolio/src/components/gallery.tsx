import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/content-context";

// ──────────────────────────────────────────────────────────────
// Categorías
// ──────────────────────────────────────────────────────────────
const CATEGORIES = ["Todos", "Fitness", "Beauty", "Gastro", "Lifestyle", "Moda", "Otros"];

// ──────────────────────────────────────────────────────────────
// Empty state
// ──────────────────────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-24 gap-5"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-px w-12" style={{ background: "rgba(195,162,122,0.25)" }} />
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(245,237,224,0.25)",
            fontSize: "1.2rem",
            fontStyle: "italic",
          }}
        >
          Sin contenido en esta categoría
        </p>
        <div className="h-px w-12" style={{ background: "rgba(195,162,122,0.25)" }} />
      </div>
      <button
        onClick={onReset}
        className="px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer hover:opacity-80"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: "rgba(195,162,122,0.1)",
          color: "#C3A27A",
          border: "1px solid rgba(195,162,122,0.25)",
        }}
      >
        Ver todos
      </button>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────────────────────
export function Gallery() {
  const { content } = useContent();
  const { sectionTitle, videos, photos } = content.gallery;

  const [activeTab, setActiveTab] = useState<"videos" | "photos">("videos");
  const [filter, setFilter] = useState("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // ── Filtrado ──
  const filteredVideos = useMemo(() => {
    if (filter === "Todos") return videos;
    return videos.filter((v: any) => v.category === filter);
  }, [videos, filter]);

  const filteredPhotos = useMemo(() => {
    if (filter === "Todos") return photos;
    return photos.filter((p: any) => p.category === filter);
  }, [photos, filter]);

  const currentItems = activeTab === "videos" ? filteredVideos : filteredPhotos;

  // ── Contadores por categoría ──
  const counts = useMemo(() => {
    const source = activeTab === "videos" ? videos : photos;
    const result: Record<string, number> = { Todos: source.length };
    CATEGORIES.slice(1).forEach((cat) => {
      result[cat] = source.filter((i: any) => i.category === cat).length;
    });
    return result;
  }, [videos, photos, activeTab]);

  // ── Lightbox item actual ──
  const lightboxItem = lightboxIndex !== null ? currentItems[lightboxIndex] : null;

  // ── Navegación lightbox ──
  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % currentItems.length);
  }, [lightboxIndex, currentItems.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + currentItems.length) % currentItems.length);
  }, [lightboxIndex, currentItems.length]);

  // ── Teclado ──
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [goNext, goPrev]
  );

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, handleKey]);

  return (
    <section id="galeria" className="py-32 bg-[#faf7f2]">
      <div className="max-w-310 mx-auto px-6">

        {/* ── Cabecera ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-end justify-between flex-wrap gap-6">

            {/* Título */}
            <div>
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.05em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
                className="block text-[12px] uppercase font-bold mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#C3A27A" }}
              >
                Contenido UGC
              </motion.span>
              <h2
                className="text-6xl md:text-7xl tracking-tight leading-[0.9]"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2E1608", fontWeight: 300 }}
              >
                Porta
                <em className="italic" style={{ fontWeight: 700, color: "#2E1608" }}>folio</em>
              </h2>
            </div>

            {/* Controles */}
            <div className="flex flex-col items-end gap-3">

              {/* Tabs video/fotos */}
              <div
                className="inline-flex rounded-full p-1.5 gap-1"
                style={{ background: "rgba(20,12,6,0.08)", border: "1px solid rgba(195,162,122,0.2)" }}
              >
                {(["videos", "photos"] as const).map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setFilter("Todos");
                    }}
                    className="relative px-7 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 cursor-pointer"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      background: activeTab === tab ? "#140C06" : "transparent",
                      color: activeTab === tab ? "#C3A27A" : "#9a8070",
                      boxShadow: activeTab === tab
                        ? "0 2px 12px rgba(14,8,2,0.25), inset 0 1px 0 rgba(195,162,122,0.15)"
                        : "none",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {tab === "videos" ? "Video" : "Fotos"}
                  </motion.button>
                ))}
              </div>

              {/* Filtros con contador */}
              <div className="flex flex-wrap justify-end gap-2">
                {CATEGORIES.map((cat) => {
                  const count = counts[cat] ?? 0;
                  const active = filter === cat;
                  if (cat !== "Todos" && count === 0) return null; // ocultar categorías vacías
                  return (
                    <motion.button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        background: active ? "#140C06" : "transparent",
                        color: active ? "#C3A27A" : "#9a8070",
                        border: `1px solid ${active ? "rgba(195,162,122,0.3)" : "rgba(46,22,8,0.15)"}`,
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {cat}
                      {/* Contador */}
                      <span
                        className="inline-flex items-center justify-center rounded-full tabular-nums"
                        style={{
                          fontSize: "9px",
                          minWidth: 16,
                          height: 16,
                          background: active ? "rgba(195,162,122,0.2)" : "rgba(46,22,8,0.08)",
                          color: active ? "#C3A27A" : "#9a8070",
                          padding: "0 4px",
                        }}
                      >
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Línea dorada */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 h-px w-full origin-left"
            style={{ background: "linear-gradient(to right, #C3A27A, rgba(195,162,122,0.1))" }}
          />
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            <motion.div
              key={`videos-${filter}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredVideos.length === 0 ? (
                <EmptyState onReset={() => setFilter("Todos")} />
              ) : (
                filteredVideos.map((item: any, i: number) => (
                  <motion.div
                    key={item.src + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative cursor-pointer"
                    style={{ aspectRatio: "9/16" }}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <div
                      className="w-full h-full rounded-[28px] overflow-hidden p-2 shadow-xl"
                      style={{ background: "#140C06", border: "1px solid rgba(195,162,122,0.15)" }}
                    >
                      <div className="w-full h-full relative rounded-[20px] overflow-hidden bg-stone-200">
                        {item.poster ? (
                          <img
                            src={item.poster}
                            alt={item.category}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <video src={item.src} className="w-full h-full object-cover" preload="none" muted />
                        )}

                        {/* Overlay */}
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                          style={{ background: "rgba(14,8,2,0.45)", backdropFilter: "blur(2px)" }}
                        >
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                            style={{ background: "rgba(195,162,122,0.2)", border: "1px solid rgba(195,162,122,0.5)" }}
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M6 3.5L14.5 9L6 14.5V3.5Z" fill="#F5EDE0" />
                            </svg>
                          </div>
                          <span
                            className="text-[9px] uppercase tracking-widest"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(245,237,224,0.7)" }}
                          >
                            Ver video
                          </span>
                        </div>

                        {/* Badge categoría — abajo izquierda */}
                        <div className="absolute bottom-3 left-3">
                          <span
                            className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md"
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              background: "rgba(14,8,2,0.55)",
                              backdropFilter: "blur(8px)",
                              color: "rgba(245,237,224,0.8)",
                            }}
                          >
                            {item.category || "UGC"}
                          </span>
                        </div>

                        {/* Duración — arriba derecha */}
                        {item.duration && (
                          <div className="absolute top-3 right-3">
                            <span
                              className="text-[9px] tabular-nums px-2 py-1 rounded-md"
                              style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                background: "rgba(14,8,2,0.55)",
                                backdropFilter: "blur(8px)",
                                color: "rgba(245,237,224,0.7)",
                              }}
                            >
                              {item.duration}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`photos-${filter}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {filteredPhotos.length === 0 ? (
                <EmptyState onReset={() => setFilter("Todos")} />
              ) : (
                filteredPhotos.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.6 }}
                    className="break-inside-avoid p-2 rounded-[28px] shadow-lg group cursor-pointer"
                    style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <div className="relative rounded-[20px] overflow-hidden">
                      <img
                        src={item.src}
                        alt={`Portafolio ${i + 1}`}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                        style={{ background: "rgba(14,8,2,0.35)", backdropFilter: "blur(2px)" }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(195,162,122,0.2)", border: "1px solid rgba(195,162,122,0.5)" }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 8h10" stroke="#F5EDE0" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lightbox con navegación ── */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(8,4,1,0.93)", backdropFilter: "blur(14px)" }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Cerrar */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer z-10"
              style={{
                background: "rgba(195,162,122,0.15)",
                border: "1px solid rgba(195,162,122,0.3)",
                color: "#F5EDE0",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Contador posición */}
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.5)" }}
            >
              {lightboxIndex + 1} / {currentItems.length}
            </div>

            {/* Flecha anterior */}
            {currentItems.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer z-10"
                style={{
                  background: "rgba(195,162,122,0.12)",
                  border: "1px solid rgba(195,162,122,0.25)",
                  color: "#F5EDE0",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Contenido */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {activeTab === "videos" ? (
                <video
                  src={lightboxItem.src}
                  poster={(lightboxItem as any).poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
                  style={{ background: "#000" }}
                />
              ) : (
                <img
                  src={lightboxItem.src}
                  alt="Portafolio"
                  className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain"
                />
              )}

              {/* Categoría del item */}
              {(lightboxItem as any).category && (
                <div className="absolute bottom-4 left-4">
                  <span
                    className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      background: "rgba(14,8,2,0.6)",
                      color: "rgba(195,162,122,0.8)",
                      border: "1px solid rgba(195,162,122,0.2)",
                    }}
                  >
                    {(lightboxItem as any).category}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Flecha siguiente */}
            {currentItems.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer z-10"
                style={{
                  background: "rgba(195,162,122,0.12)",
                  border: "1px solid rgba(195,162,122,0.25)",
                  color: "#F5EDE0",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Hint teclado */}
            <p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.3)" }}
            >
              ← → navegar · ESC cerrar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}