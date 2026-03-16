import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Button } from "./ui/button";
import { MapPin, PackageOpen, CheckCircle2 } from "lucide-react";

export function Services() {
  const handleQuote = (type: string) => {
    alert(`En un entorno real, esto abriría un formulario de contacto pre-llenado para: ${type}`);
  };

  return (
    <section id="servicios" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-4">Modalidades de Servicio</h2>
          <p className="text-foreground/70 text-lg">Elige la opción que mejor se adapte a tu marca</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 text-primary">
                <MapPin size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-3xl font-heading mb-3">Servicio On-Site</h3>
              <p className="text-xl text-foreground/80 font-medium mb-4">Grabación presencial en locación</p>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Voy al lugar, grabo cada ángulo necesario y te entrego una pieza final lista para <em className="accent-italic not-italic font-heading italic text-xl">impactar</em> en redes. Ideal para restaurantes, gimnasios, hoteles y experiencias.
              </p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {["Grabación en locación", "Tomas B-roll incluidas", "Video editado y listo", "Formatos adaptados para redes"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-primary/60" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button onClick={() => handleQuote("Servicio On-Site")} className="w-full">
                Solicitar Cotización
              </Button>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 text-primary">
                <PackageOpen size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-3xl font-heading mb-3">Servicio Remoto</h3>
              <p className="text-xl text-foreground/80 font-medium mb-4">Recibe el producto, crea el contenido</p>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Recepción de productos por envío, pauta de estilo acordada y entrega de video o entregable final. Perfecto para e-commerce, suplementos, ropa y skincare.
              </p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {["Recepción de envío del producto", "Pauta de estilo acordada", "Entrega digital en alta calidad", "Revisiones incluidas"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-primary/60" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button onClick={() => handleQuote("Servicio Remoto")} className="w-full">
                Solicitar Cotización
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
