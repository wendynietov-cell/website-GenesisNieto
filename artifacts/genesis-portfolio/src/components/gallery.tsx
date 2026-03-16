import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useContent } from "@/context/content-context";

// Definimos los nichos para filtrar
const CATEGORIES = ["Todos", "Fitness", "Beauty", "Gastro", "Lifestyle"];

export function Gallery() {
  const { content } = useContent();
  const { sectionTitle, videos, photos } = content.gallery;
  
  const [activeTab, setActiveTab] = useState<"videos" | "photos">("videos");
  const [filter, setFilter] = useState("Todos");

  // Filtrado lógico (Asumiendo que agregaremos 'category' a tus objetos en el context)
  const filteredVideos = useMemo(() => {
    if (filter === "Todos") return videos;
    return videos.filter((v: any) => v.category === filter);
  }, [videos, filter]);

  return (
    <section id="galeria" className="py-32 bg-[#faf7f2] texture-paper">
      <div className="max-w-310 mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-6xl font-heading mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2E1608" }}
          >
            {sectionTitle}
          </h2>

          {/* Selector de Tipo: Videos / Fotos */}
          <div className="inline-flex bg-stone-200/40 backdrop-blur-md rounded-full p-1 mb-8">
            {["videos", "photos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-8 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer",
                  activeTab === tab 
                    ? "bg-white text-[#2E1608] shadow-sm" 
                    : "text-stone-500 hover:text-stone-800"
                )}
              >
                {tab === "videos" ? "Contenido Video" : "Fotografía Estática"}
              </button>
            ))}
          </div>

          {/* Filtros de Nicho (Solo aparecen en videos para no saturar) */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all border cursor-pointer",
                  filter === cat
                    ? "bg-[#2E1608] text-white border-[#2E1608]"
                    : "bg-transparent text-stone-500 border-stone-200 hover:border-stone-400"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            <motion.div
              key="videos"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredVideos.map((item, i) => (
                <motion.div 
                  layout
                  key={item.src + i}
                  className="group relative aspect-9/16 rounded-4xl overflow-hidden bg-white border border-stone-100 p-2 shadow-xl shadow-stone-200/40"
                >
                  <div className="w-full h-full relative rounded-3xl overflow-hidden bg-stone-100">
                    <video
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      controls
                      playsInline
                      preload="none"
                    />
                    {/* Overlay informativo sutil */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                       <span className="text-[9px] uppercase tracking-widest bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-md">
                         {item.category || "UGC Content"}
                       </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {photos.map((item, i) => (
                <div key={i} className="break-inside-avoid bg-white p-2 rounded-4xl border border-stone-100 shadow-lg group cursor-pointer">
                  <div className="relative rounded-3xl overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={`Génesis Nieto UGC ${i}`} 
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}