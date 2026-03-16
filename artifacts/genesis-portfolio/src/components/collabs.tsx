import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
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
    <section
      id="colaboraciones"
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: "#2E1608" }}
    >
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(195,162,122,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-semibold mb-6 px-4 py-1.5 rounded-full" style={{ color: "#C3A27A", border: "1px solid rgba(195,162,122,0.25)", background: "rgba(195,162,122,0.08)" }}>
            Gifting & PR
          </span>
          <h2
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 600 }}
          >
            {sectionTitle}
          </h2>
          <p className="text-lg leading-relaxed font-light" style={{ color: "rgba(245,237,224,0.6)" }}>
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map(({ title, text, Icon }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <GlassCard dark className="h-full text-center flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(195,162,122,0.15)", color: "#C3A27A" }}
                >
                  <Icon size={22} />
                </div>
                <h4
                  className="text-xl mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 600 }}
                >
                  {title}
                </h4>
                <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(245,237,224,0.6)" }}>
                  {text}
                </p>
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
          <button
            onClick={handleApply}
            className="px-12 py-4 rounded-2xl text-[11px] uppercase tracking-widest font-bold transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ backgroundColor: "#F5EDE0", color: "#2E1608" }}
          >
            {cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
