import { motion } from "framer-motion";

const favorites = [
  {
    category: "Suplementación",
    img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=600&h=750&fit=crop"
  },
  {
    category: "Activewear",
    img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=750&fit=crop"
  },
  {
    category: "Recetas & Cocina",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=750&fit=crop"
  },
  {
    category: "Skincare",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=750&fit=crop"
  },
  {
    category: "Bienestar",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=750&fit=crop"
  }
];

export function Favorites() {
  return (
    <section id="favoritos" className="py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            Mis <em className="accent-italic not-italic font-heading italic">Favoritos</em> del Mes
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto text-balance">
            Los productos que forman parte de mi rutina este mes — mis marcas favoritas del momento.
          </p>
        </motion.div>

        {/* Horizontal Scroll on Mobile, Flex wrap on Desktop */}
        <div className="flex overflow-x-auto pb-12 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-5 gap-6 snap-x snap-mandatory scrollbar-hide">
          {favorites.map((fav, i) => (
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
                  <img 
                    src={fav.img} 
                    alt={fav.category} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="glass px-3 py-1.5 rounded-full text-xs font-medium text-foreground/90 backdrop-blur-md bg-white/40">
                      {fav.category}
                    </span>
                  </div>
                  {/* Subtle vignette for depth */}
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
