import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Gift, Target, Mail } from "lucide-react";
import { useContent } from "@/context/content-context";

export function Collabs() {
  const { content } = useContent();
  const {
    sectionTitle,
    description,
    card1Title, card1Text,
    card2Title, card2Text,
    card3Title, card3Text,
    cta,
  } = content.collabs;

  const handleApply = () => {
    window.location.href = `mailto:${content.contact.email}?subject=Propuesta de Colaboración - Gifting`;
  };

  const cards = [
    { title: card1Title, text: card1Text, Icon: Gift, num: "01" },
    { title: card2Title, text: card2Text, Icon: Target, num: "02" },
    { title: card3Title, text: card3Text, Icon: Mail, num: "03" },
  ];

  return (
    <section
      id="colaboraciones"
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: "#faf7f2" }}
    >
      {/* Líneas borde */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />

      {/* Glow ambiental */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(195,162,122,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Cabecera editorial — dos columnas ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20"
        >
          {/* Izquierda — título */}
          <div className="md:max-w-sm">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="block text-[10px] uppercase font-bold mb-4"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#C3A27A",
              }}
            >
              Gifting & PR
            </motion.span>

            <h2
              className="text-5xl md:text-6xl tracking-tight leading-[0.9]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#2E1608",
                fontWeight: 300,
              }}
            >
              {sectionTitle.split(" ").slice(0, 1).join(" ")}{" "}
              <em
                className="italic"
                style={{ fontWeight: 700 }}
              >
                {sectionTitle.split(" ").slice(1).join(" ")}
              </em>
            </h2>
          </div>

          {/* Derecha — descripción */}
          <div className="md:max-w-md">
            <div
              className="h-px w-full mb-6"
              style={{ background: "linear-gradient(to right, #C3A27A, transparent)", opacity: 0.4 }}
            />
            <p
              className="text-base leading-relaxed font-light"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#5A3B22",
              }}
            >
              {description}
            </p>
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map(({ title, text, Icon, num }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard className="h-full flex flex-col group relative overflow-hidden" style={{ padding: "2rem", border: "1px solid rgba(195,162,122,0.3)" }}>

                {/* Número decorativo de fondo */}
                <span
                  className="absolute -top-3 -right-1 select-none pointer-events-none transition-all duration-700 group-hover:opacity-20"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "7rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(195,162,122,0.15)",
                  }}
                >
                  {num}
                </span>

                {/* Ícono + número activo */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div
                    className="transition-transform duration-500 group-hover:scale-110"
                    style={{ color: "#C3A27A" }}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-[0.2em] font-bold"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: "rgba(195,162,122,0.5)",
                    }}
                  >
                    {num}
                  </span>
                </div>

                {/* Línea que se expande en hover */}
                <div className="relative mb-5 h-px overflow-hidden">
                  <div
                    className="h-full w-8 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ background: "linear-gradient(to right, #C3A27A, rgba(195,162,122,0.1))" }}
                  />
                </div>

                {/* Título */}
                <h4
                  className="text-2xl mb-3 relative z-10 leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#2E1608",
                    fontWeight: 600,
                  }}
                >
                  {title}
                </h4>

                {/* Texto */}
                <p
                  className="text-sm leading-relaxed font-light relative z-10"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: "#5A3B22",
                    opacity: 0.85,
                  }}
                >
                  {text}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center"
        >
          <button
            onClick={handleApply}
            className="group relative flex items-center gap-3 px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              backgroundColor: "#2E1608",
              color: "#F5EDE0",
              boxShadow: "0 8px 32px rgba(46,22,8,0.25), inset 0 1px 0 rgba(195,162,122,0.15)",
            }}
          >
            {/* Shimmer en hover */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(195,162,122,0.12) 50%, transparent 70%)",
              }}
            />
            <span className="relative z-10">{cta}</span>
            {/* Flecha animada */}
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{ color: "#C3A27A" }}
            >
              →
            </motion.span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}