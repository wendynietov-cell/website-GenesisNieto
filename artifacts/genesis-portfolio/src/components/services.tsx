import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { MapPin, PackageOpen, CheckCircle2 } from "lucide-react";
import { useContent } from "@/context/content-context";

export function Services() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, onsite, remote } = content.services;

  const handleQuote = (type: string) => {
    window.location.href = `mailto:${content.contact.email}?subject=Cotización - ${type}`;
  };

  return (
    <section
      id="servicios"
      className="py-12 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #140C06, #1C1008)" }}
    >
      {/* Decoración de fondo oscuro */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(195,162,122,0.06)" }} />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(195,162,122,0.06)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-20"
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-semibold mb-6" style={{ color: "#C3A27A" }}>
            Servicios
          </span>
          <h2
            className="text-4xl md:text-6xl mb-6 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 600 }}
          >
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light" style={{ color: "rgba(245,237,224,0.55)" }}>
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* ── Mobile: carrusel horizontal ── */}
        <div className="flex md:hidden gap-4 overflow-x-auto -mx-6 px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
          {[
            { data: onsite, Icon: MapPin },
            { data: remote, Icon: PackageOpen },
          ].map(({ data, Icon }) => (
            <div key={data.title} className="shrink-0 w-[82vw] snap-center">
              <GlassCard dark className="h-full flex flex-col p-5 rounded-[28px]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(195,162,122,0.15)", color: "#C3A27A" }}
                >
                  <Icon size={20} strokeWidth={1.2} />
                </div>
                <h3 className="text-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 600 }}>
                  {data.title}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C3A27A] font-bold mb-3">{data.subtitle}</p>
                <p className="text-sm text-stone-300 mb-4 leading-relaxed font-light">{data.description}</p>
                <ul className="space-y-2 mb-5 grow">
                  {data.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "rgba(245,237,224,0.7)" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#C3A27A" }} />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleQuote(data.title)}
                  className="w-full py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold cursor-pointer"
                  style={{ backgroundColor: "#F5EDE0", color: "#2E1608" }}
                >
                  {data.cta}
                </button>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* ── Desktop: grid (sin cambios) ── */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {[
            { data: onsite, Icon: MapPin, delay: 0.2, dir: -20 },
            { data: remote, Icon: PackageOpen, delay: 0.4, dir: 20 },
          ].map(({ data, Icon, delay, dir }) => (
            <motion.div
              key={data.title}
              initial={{ opacity: 0, x: dir }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <GlassCard dark className="h-full flex flex-col p-8 rounded-[40px] transition-all duration-500 group-hover:-translate-y-2">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500"
                  style={{ backgroundColor: "rgba(195,162,122,0.15)", color: "#C3A27A" }}
                >
                  <Icon size={24} strokeWidth={1.2} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 600 }}>
                  {data.title}
                </h3>
                <p className="text-sm uppercase tracking-[0.2em] text-[#C3A27A] font-bold mb-4">{data.subtitle}</p>
                <p className="text-stone-300 mb-6 leading-relaxed font-light">{data.description}</p>
                <ul className="space-y-3 mb-8 grow">
                  {data.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm" style={{ color: "rgba(245,237,224,0.75)" }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#C3A27A" }} />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleQuote(data.title)}
                  className="w-full py-4 rounded-2xl text-[11px] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer overflow-hidden relative group/btn"
                  style={{ backgroundColor: "#F5EDE0", color: "#2E1608" }}
                >
                  <span className="relative z-10">{data.cta}</span>
                  <div className="absolute inset-0 bg-[#C3A27A] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
