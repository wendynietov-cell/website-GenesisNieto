import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";

const testimonials = [
  {
    quote: "El contenido que creó para nuestra marca superó todas las expectativas. Las tomas son puras, el ritmo del video perfecto y el engagement fue el más alto del mes.",
    author: "Brand Manager",
    brand: "Aesthetic Active",
  },
  {
    quote: "Génesis entiende la esencia de cada producto. Cuando recibimos los entregables, parecían salir de una producción profesional. ¡Lo recomendamos al 100%!",
    author: "Directora de Marketing",
    brand: "Glow Skincare",
  },
  {
    quote: "El proceso fue sencillo, claro y el resultado impecable. El video generó más conversiones que nuestra publicidad pagada. Definitivamente repetiremos.",
    author: "Fundadora",
    brand: "Pure Matcha",
  }
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-32 bg-background/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-4">Lo que dicen las marcas</h2>
          <p className="text-foreground/70 text-lg">Experiencias reales con contenido que convierte</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <GlassCard className="h-full flex flex-col relative pt-12 pb-10 px-8 rounded-3xl group">
                <span className="absolute top-4 left-6 text-9xl font-heading text-foreground/5 leading-none select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                  "
                </span>
                
                <p className="text-xl font-heading italic text-foreground/80 leading-relaxed flex-grow relative z-10">
                  {t.quote}
                </p>
                
                <div className="mt-8 pt-6 border-t border-foreground/10 relative z-10 flex flex-col">
                  <span className="font-medium text-foreground">{t.brand}</span>
                  <span className="text-sm text-foreground/60">{t.author}</span>
                </div>
                
                {/* Tail for bubble effect */}
                <div className="absolute -bottom-3 left-12 w-6 h-6 bg-[rgba(255,255,255,0.35)] border-b border-r border-[rgba(255,255,255,0.5)] transform rotate-45" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
