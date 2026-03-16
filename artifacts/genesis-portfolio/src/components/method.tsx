import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { useContent } from "@/context/content-context";

export function Method() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, steps } = content.method;

  return (
    <section id="metodo" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            El <em className="font-heading italic">Proceso</em>
          </h2>
          <p className="text-foreground/70 text-lg">{sectionSubtitle}</p>
        </motion.div>

        <GlassCard className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-between relative">
            <div className="hidden md:block absolute top-12 left-10 right-10 h-[1px] bg-foreground/10 z-0" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex-1 relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full glass mb-6 flex items-center justify-center bg-background/50 shadow-inner">
                  <span className="font-heading text-4xl italic text-foreground/80 group-hover:text-primary transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed max-w-[200px] text-balance">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
