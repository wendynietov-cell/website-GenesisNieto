import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Button } from "./ui/button";
import { MapPin, PackageOpen, CheckCircle2 } from "lucide-react";
import { useContent } from "@/context/content-context";

export function Services() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, onsite, remote } = content.services;

  const handleQuote = (type: string) => {
    window.location.href = `mailto:${content.contact.email}?subject=Cotización - ${type}`;
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
          <h2 className="text-4xl md:text-5xl font-heading mb-4">{sectionTitle}</h2>
          <p className="text-foreground/70 text-lg">{sectionSubtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { data: onsite, Icon: MapPin, delay: 0.2, dir: -30 },
            { data: remote, Icon: PackageOpen, delay: 0.4, dir: 30 },
          ].map(({ data, Icon, delay, dir }) => (
            <motion.div
              key={data.title}
              initial={{ opacity: 0, x: dir }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay }}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8" style={{ color: "var(--accent-cafe)" }}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-heading mb-3">{data.title}</h3>
                <p className="text-xl text-foreground/80 font-medium mb-4">{data.subtitle}</p>
                <p className="text-foreground/70 mb-8 leading-relaxed">{data.description}</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {data.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "var(--accent-cafe)" }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={() => handleQuote(data.title)} className="w-full">
                  {data.cta}
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
