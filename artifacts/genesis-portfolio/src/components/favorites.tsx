import { motion } from "framer-motion";
import { useContent } from "@/context/content-context";

export function Favorites() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, items } = content.favorites;

  const titleParts = sectionTitle.split("Favoritos");

  return (
    <section id="favoritos" className="py-32 overflow-hidden texture-paper" style={{ backgroundColor: "#faf7f2" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            {titleParts.length > 1 ? (
              <>
                {titleParts[0]}<em className="font-heading italic">Favoritos</em>{titleParts[1]}
              </>
            ) : sectionTitle}
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto text-balance">{sectionSubtitle}</p>
        </motion.div>

        <div className="flex overflow-x-auto pb-12 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-5 gap-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {items.map((fav, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-center shrink-0 w-64 md:w-auto"
            >
              <div className="glass p-2 rounded-[2rem] overflow-hidden aspect-[3/4] group relative cursor-pointer hover:shadow-xl transition-all duration-500">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  {fav.img ? (
                    <img
                      src={fav.img}
                      alt={fav.category}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(200,168,137,0.15)" }}>
                      <span className="text-4xl">📷</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="glass px-3 py-1.5 rounded-full text-xs font-medium text-foreground/90 backdrop-blur-md bg-white/40">
                      {fav.category}
                    </span>
                  </div>
                  {fav.productName && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/30 to-transparent">
                      <p className="text-white text-xs font-medium truncate">{fav.productName}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
