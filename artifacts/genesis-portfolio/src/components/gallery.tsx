import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const videos = [
  /* aesthetic gym workout */
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1422&fit=crop",
  /* healthy breakfast bowl */
  "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&h=1422&fit=crop",
  /* lifestyle coffee shop */
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1422&fit=crop",
  /* skincare routine */
  "https://images.unsplash.com/photo-1615397323719-09a478b09335?w=800&h=1422&fit=crop"
];

const photos = [
  /* girl in athletic wear */
  "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
  /* matcha latte */
  "https://images.unsplash.com/photo-1536290074213-9aa2a98f1fbd?w=800&q=80",
  /* yoga mat aesthetic */
  "https://images.unsplash.com/photo-1599901860904-17e086208940?w=800&q=80",
  /* aesthetic interior */
  "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?w=800&q=80",
  /* healthy salad */
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  /* running shoes */
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
];

export function Gallery() {
  const [activeTab, setActiveTab] = useState<"videos" | "photos">("videos");

  return (
    <section id="galeria" className="py-32 bg-background/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-8">Contenido UGC</h2>
          
          <div className="inline-flex glass rounded-full p-1">
            <button
              onClick={() => setActiveTab("videos")}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === "videos" ? "bg-white/50 shadow-sm text-foreground" : "text-foreground/60 hover:text-foreground"
              )}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === "photos" ? "bg-white/50 shadow-sm text-foreground" : "text-foreground/60 hover:text-foreground"
              )}
            >
              Fotografías
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {videos.map((src, i) => (
                <div key={i} className="group relative aspect-[9/16] rounded-3xl overflow-hidden glass p-2 cursor-pointer">
                  <div className="w-full h-full relative rounded-2xl overflow-hidden">
                    <img src={src} alt={`Video thumbnail ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white transform scale-90 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {photos.map((src, i) => (
                <div key={i} className="break-inside-avoid glass p-2 rounded-3xl overflow-hidden group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img src={src} alt={`Photo ${i+1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
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
