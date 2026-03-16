import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Button } from "./ui/button";
import { Gift, Target, Mail } from "lucide-react";

export function Collabs() {
  const handleApply = () => {
    window.location.href = "mailto:hola@genesisnieto.com?subject=Propuesta de Colaboración - Gifting";
  };

  return (
    <section id="colaboraciones" className="py-32 relative overflow-hidden">
      {/* Decorative blurred blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block glass px-4 py-1.5 rounded-full text-sm font-medium tracking-widest uppercase mb-6 text-foreground/80">
            Gifting & PR
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mb-6">Colaboraciones No Pagas</h2>
          <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
            Estoy abierta a propuestas de gifting e intercambio para marcas que se alineen con mi estilo de vida: bienestar, fitness, alimentación saludable y lifestyle auténtico.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <GlassCard className="h-full text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-6 text-primary">
                <Gift size={24} />
              </div>
              <h4 className="text-xl font-heading mb-3">¿Qué ofrezco?</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Creación de contenido orgánico, reseñas honestas en mis canales y exposición a una audiencia comprometida con el bienestar.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <GlassCard className="h-full text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-6 text-primary">
                <Target size={24} />
              </div>
              <h4 className="text-xl font-heading mb-3">¿Qué busco?</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Productos funcionales, estéticos y de calidad que genuinamente usaría en mi día a día: activewear, suplementos, skincare.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <GlassCard className="h-full text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-6 text-primary">
                <Mail size={24} />
              </div>
              <h4 className="text-xl font-heading mb-3">¿Cómo aplicar?</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Envíame un correo con la información de tu marca, el producto propuesto y expectativas. Si hay match, avanzamos.
              </p>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button onClick={handleApply} size="lg" className="px-12">
            Proponer Colaboración
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
