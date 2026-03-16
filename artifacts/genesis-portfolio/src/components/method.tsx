import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useContent } from "@/context/content-context";

export function Method() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, steps } = content.method;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
      style={{ background: "#140C06" }}
    >
      {/* ── Fondo texturizado con ruido grain ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Glow ambiental dorado centrado ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-125 rounded-full pointer-events-none"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse at center, rgba(195,162,122,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Líneas decorativas laterales ── */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#C3A27A]/20 to-transparent" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#C3A27A]/20 to-transparent" />

      <div className="max-w-310 mx-auto px-6 relative z-10">

        {/* ── Cabecera ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-28"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="inline-block text-[10px] uppercase font-bold mb-6"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#C3A27A",
            }}
          >
            Metodología
          </motion.span>

          <h2
            className="text-5xl md:text-7xl tracking-tight leading-[0.9]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#F5EDE0",
              fontWeight: 300,
            }}
          >
            El{" "}
            <em
              className="italic"
              style={{ color: "#C3A27A", fontWeight: 600 }}
            >
              Proceso
            </em>{" "}
            <br />
            <span style={{ fontWeight: 700 }}>Estratégico</span>
          </h2>

          {/* Línea dorada centrada */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px w-24 mx-auto mt-8 mb-6"
            style={{
              background:
                "linear-gradient(to right, transparent, #C3A27A, transparent)",
            }}
          />

          <p
            className="text-stone-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* ── Grid de pasos ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C3A27A]/10 rounded-2xl overflow-hidden border border-[#C3A27A]/10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group p-10 bg-[#140C06] flex flex-col overflow-hidden cursor-default"
            >
              {/* Hover fill de fondo */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 30%, rgba(195,162,122,0.07) 0%, transparent 70%)",
                }}
              />

              {/* Número enorme decorativo */}
              <div
                className="absolute -top-4 -right-2 select-none pointer-events-none transition-all duration-700 group-hover:opacity-20 group-hover:-translate-y-1"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "9rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(195,162,122,0.12)",
                }}
              >
                {step.num}
              </div>

              {/* Número pequeño activo */}
              <motion.div
                className="relative z-10 mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: "#C3A27A",
                    borderColor: "rgba(195,162,122,0.3)",
                    background: "rgba(195,162,122,0.05)",
                  }}
                >
                  {step.num}
                </span>
              </motion.div>

              {/* Título */}
              <h3
                className="relative z-10 text-lg mb-3 leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#F5EDE0",
                  fontWeight: 600,
                  fontSize: "1.35rem",
                }}
              >
                {step.title}
              </h3>

              {/* Línea que se expande en hover */}
              <div className="relative z-10 mb-4 h-px overflow-hidden">
                <div
                  className="h-full w-8 group-hover:w-full transition-all duration-500 ease-out"
                  style={{
                    background:
                      "linear-gradient(to right, #C3A27A, rgba(195,162,122,0.2))",
                  }}
                />
              </div>

              {/* Descripción */}
              <p
                className="relative z-10 text-sm leading-relaxed"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "rgba(245,237,224,0.5)",
                  fontWeight: 300,
                }}
              >
                {step.desc}
              </p>

              {/* Corner accent */}
              <div
                className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 50%, rgba(195,162,122,0.15) 50%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Footer de la sección ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 flex items-center justify-center gap-6"
        >
          <div
            className="h-px flex-1 max-w-30"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(195,162,122,0.3))",
            }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-bold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "rgba(195,162,122,0.5)",
            }}
          >
            Entregas en 7 días
          </span>
          <div
            className="h-px flex-1 max-w-30"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(195,162,122,0.3))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}