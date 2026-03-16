import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Button } from "./ui/button";
import { Gift, Target, Mail } from "lucide-react";
import { useContent } from "@/context/content-context";

export function Collabs() {
  const { content } = useContent();
  const { sectionTitle, description, card1Title, card1Text, card2Title, card2Text, card3Title, card3Text, cta } = content.collabs;

  const handleApply = () => {
    window.location.href = `mailto:${content.contact.email}?subject=Propuesta de Colaboración - Gifting`;
  };

  const cards = [
    { title: card1Title, text: card1Text, Icon: Gift },
    { title: card2Title, text: card2Text, Icon: Target },
    { title: card3Title, text: card3Text, Icon: Mail },
  ];

  return (
    <section id="colaboraciones" className="py-32 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-heading mb-6">{sectionTitle}</h2>
          <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map(({ title, text, Icon }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="h-full text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-6" style={{ color: "var(--accent-cafe)" }}>
                  <Icon size={24} />
                </div>
                <h4 className="text-xl font-heading mb-3">{title}</h4>
                <p className="text-foreground/70 text-sm leading-relaxed">{text}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button onClick={handleApply} size="lg" className="px-12">
            {cta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
