import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useContent } from "@/context/content-context";

export function Hero() {
  const { content } = useContent();
  const { name, subtitle } = content.hero;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const parts = subtitle.split("·").map((s) => s.trim());

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-svh px-6 py-20 overflow-hidden"
      style={{ backgroundColor: "#faf7f2" }}
    >
      {/* ══════════════════════
          TARJETA PRINCIPAL
      ══════════════════════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-310 h-[calc(100svh-120px)] min-h-160 rounded-[40px] overflow-hidden border border-white shadow-2xl shadow-stone-200/50"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* FOTO — Derecha */}
        <div className="absolute inset-0 left-[48%] pointer-events-none md:block hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/genesi.png`}
            alt={name}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-[center_15%] transition-opacity duration-1000 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/40 to-transparent w-[40%]" />
        </div>

        {/* CONTENIDO — Izquierda */}
        <motion.div
          className="relative z-10 flex flex-col justify-center h-full w-full md:w-[48%] p-8 md:p-20"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
          }}
        >
          {/* Pill de roles */}
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <span
              className="inline-block px-4 py-1.5 rounded-full border mb-8"
              style={{
                backgroundColor: "rgba(255,250,242,0.6)",
                borderColor: "rgba(196,162,122,0.3)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7A5840"
              }}
            >
              {parts.join(" · ")}
            </span>
          </motion.div>

          {/* Nombre en Café Oscuro */}
          <motion.h1
            className="text-6xl md:text-[6.8rem] leading-[0.85] tracking-tighter"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#2E1608",
              fontWeight: 700
            }}
          >
            {name.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>

          {/* Línea decorativa */}
          <motion.div
            className="h-1 w-20 rounded-full mb-4"
            style={{ background: "linear-gradient(to right, #C3A27A, rgba(195,162,122,0.1))" }}
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          />

          {/* Descripción Completa */}
          <motion.div
            className="space-y-1 mb-6"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#5A3B22",
              lineHeight: 1.7
            }}
          >
            <p className="text-lg md:text-xl">
              Ayudo a marcas a contar su historia a través de contenido
              <span className="font-semibold" style={{ color: "#2E1608" }}> UGC estratégico</span> y estético.
            </p>
            <p className="text-sm md:text-base opacity-80 font-light max-w-sm italic">
              Especializada en moda, bienestar y estilo de vida con un propósito 100% comercial.
            </p>
          </motion.div>

          {/* Botones */}
          <motion.div
            className="flex gap-3 flex-wrap mb-6"
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <button
              onClick={() => scrollTo("#portafolio")}
              className="px-6 py-3 rounded-lg text-[10px] uppercase tracking-widest font-bold shadow-xl shadow-stone-900/10 transition-all hover:-translate-y-1 cursor-pointer"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: "#2C1A0A",
                color: "#F5EDE0",
                border: "none",
              }}
            >
              Ver mi portafolio
            </button>
            <button
              onClick={() => scrollTo("#contacto")}
              className="px-6 py-3 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all hover:bg-white cursor-pointer"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: "rgba(255,250,242,0.4)",
                color: "#7A5838",
                border: "1px solid rgba(176,136,90,0.3)",
              }}
            >
              Trabajemos juntos
            </button>
          </motion.div>

          {/* Línea Divisora entre botones y redes */}
          <div className="w-full mb-5" style={{ borderTop: "1px solid rgba(195, 162, 122, 0.4)" }} />

          {/* Redes Sociales */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {/* Label */}
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C3A27A",
                fontWeight: 600,
                marginRight: "4px",
              }}
            >
              Sígueme
            </span>

            {/* Instagram */}
            <a
              href="https://instagram.com/genesis_nieto"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,250,242,0.8)",
                border: "1px solid rgba(195,162,122,0.3)",
                color: "#7A5840",
              }}
              title="Instagram"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 2.163c-3.151 0-3.503.011-4.743.066-2.386.108-3.525 1.226-3.632 3.632-.055 1.24-.065 1.592-.065 4.743s.01 3.503.065 4.743c.107 2.386 1.246 3.525 3.632 3.632 1.24.055 1.592.065 4.743.065s3.503-.01 4.743-.065c2.386-.107 3.525-1.246 3.632-3.632.055-1.24.065-1.592.065-4.743s-.01-3.503-.065-4.743c-.107-2.386-1.246-3.525-3.632-3.632-1.24-.055-1.592-.065-4.743-.065zm0 3.674a4.163 4.163 0 110 8.326 4.163 4.163 0 010-8.326zm0 2.163a2 2 0 100 4 2 2 0 000-4zm4.884-3.8a.96.96 0 110 1.92.96.96 0 010-1.92z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@genesis_nieto"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,250,242,0.8)",
                border: "1px solid rgba(195,162,122,0.3)",
                color: "#7A5840",
              }}
              title="TikTok"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/genesisnieto"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,250,242,0.8)",
                border: "1px solid rgba(195,162,122,0.3)",
                color: "#7A5840",
              }}
              title="LinkedIn"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/genesisnieto"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,250,242,0.8)",
                border: "1px solid rgba(195,162,122,0.3)",
                color: "#7A5840",
              }}
              title="Facebook"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #hero [data-photo] { left: 0 !important; opacity: 0.1 !important; display: block !important; }
          .text-6xl { font-size: 4rem !important; }
        }
      `}</style>
    </section>
  );
}