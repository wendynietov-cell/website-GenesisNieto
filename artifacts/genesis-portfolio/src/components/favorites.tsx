import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useContent } from "@/context/content-context";

export function Favorites() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, items } = content.favorites;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);
  const constraintsRef = useRef(null);

  const total = items.length;

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setCurrent((next + total) % total);
  };

  const prev = () => go(current - 1, -1);
  const next = () => go(current + 1, 1);

  // Visible indices: prev, active, next (and possibly +2 for a peek)
  const getIndex = (offset: number) => (current + offset + total) % total;

  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.88,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.88,
      transition: { duration: 0.4, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
    }),
  };

  return (
    <section
      id="favoritos"
      className="py-12 md:py-32 overflow-hidden texture-paper relative"
      style={{ backgroundColor: "#faf7f2" }}
    >
      {/* Top + bottom golden lines */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header editorial ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8 mb-10 md:mb-20"
        >
          <div className="md:max-w-xs">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="block text-[10px] uppercase font-bold mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#C3A27A" }}
            >
              Picks del Mes
            </motion.span>
            <h2
              className="text-5xl md:text-6xl tracking-tight leading-[0.9]"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2E1608", fontWeight: 300 }}
            >
              Mis{" "}
              <em className="italic" style={{ fontWeight: 700 }}>
                Favoritos
              </em>
            </h2>
          </div>

          <div className="hidden md:block md:max-w-md">
            <div
              className="h-px w-full mb-6"
              style={{ background: "linear-gradient(to right, #C3A27A, transparent)", opacity: 0.4 }}
            />
            <p
              className="text-base leading-relaxed font-light"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#5A3B22" }}
            >
              {sectionSubtitle}
            </p>
          </div>
        </motion.div>

        {/* ── Carousel ── */}
        <div className="relative flex items-center gap-4 md:gap-8">

          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer z-10"
            style={{
              background: "rgba(46,22,8,0.07)",
              border: "1px solid rgba(195,162,122,0.35)",
              color: "#2E1608",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Cards track */}
          <div ref={constraintsRef} className="flex-1 overflow-hidden">
            <div className="flex items-stretch justify-center gap-5">

              {/* Side peek — prev */}
              <div
                className="hidden md:block shrink-0 w-[180px] rounded-[2rem] overflow-hidden relative select-none"
                style={{ aspectRatio: "3/4", opacity: 0.45, filter: "blur(1.5px)", transform: "scale(0.94)" }}
              >
                {items[getIndex(-1)].img ? (
                  <img
                    src={items[getIndex(-1)].img}
                    alt={items[getIndex(-1)].category}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: "1.75rem" }}
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: "rgba(195,162,122,0.12)", borderRadius: "1.75rem" }} />
                )}
              </div>

              {/* Active card */}
              <div className="relative flex-1 max-w-[320px] md:max-w-[360px]" style={{ aspectRatio: "3/4" }}>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={constraintsRef}
                    dragElastic={0.15}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) next();
                      else if (info.offset.x > 60) prev();
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    {/* Frame */}
                    <div
                      className="w-full h-full p-2.5 rounded-[2rem] shadow-2xl"
                      style={{
                        background: "#140C06",
                        border: "1px solid rgba(195,162,122,0.25)",
                        boxShadow: "0 24px 80px rgba(46,22,8,0.22), 0 4px 16px rgba(46,22,8,0.12)",
                      }}
                    >
                      <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                        {items[current].img ? (
                          <img
                            src={items[current].img}
                            alt={items[current].category}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: "rgba(200,168,137,0.15)" }}
                          >
                            <span className="text-4xl">📷</span>
                          </div>
                        )}

                        {/* Category badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold"
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              background: "rgba(14,8,2,0.55)",
                              backdropFilter: "blur(8px)",
                              color: "#C3A27A",
                              border: "1px solid rgba(195,162,122,0.3)",
                            }}
                          >
                            {items[current].category}
                          </span>
                        </div>

                        {/* Product name */}
                        {items[current].productName && (
                          <div
                            className="absolute bottom-0 left-0 right-0 p-5"
                            style={{ background: "linear-gradient(to top, rgba(14,8,2,0.7), transparent)" }}
                          >
                            <p
                              className="text-sm font-medium truncate"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F5EDE0" }}
                            >
                              {items[current].productName}
                            </p>
                          </div>
                        )}

                        {/* Counter overlay */}
                        <div
                          className="absolute bottom-4 right-4 flex items-center gap-1"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          <span className="text-2xl font-light" style={{ color: "rgba(245,237,224,0.9)" }}>
                            {String(current + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs" style={{ color: "rgba(195,162,122,0.5)" }}>
                            /{String(total).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Side peek — next */}
              <div
                className="hidden md:block shrink-0 w-[180px] rounded-[2rem] overflow-hidden relative select-none"
                style={{ aspectRatio: "3/4", opacity: 0.45, filter: "blur(1.5px)", transform: "scale(0.94)" }}
              >
                {items[getIndex(1)].img ? (
                  <img
                    src={items[getIndex(1)].img}
                    alt={items[getIndex(1)].category}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: "1.75rem" }}
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: "rgba(195,162,122,0.12)", borderRadius: "1.75rem" }} />
                )}
              </div>

            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer z-10"
            style={{
              background: "rgba(46,22,8,0.07)",
              border: "1px solid rgba(195,162,122,0.35)",
              color: "#2E1608",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-2 mt-6 md:mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Ir a favorito ${i + 1}`}
              className="transition-all duration-300 rounded-full cursor-pointer"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background: i === current ? "#2E1608" : "rgba(195,162,122,0.4)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
