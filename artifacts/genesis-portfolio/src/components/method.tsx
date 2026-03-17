import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useContent } from "@/context/content-context";

export function Method() {
  const { content } = useContent();
  const { sectionSubtitle, steps } = content.method;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="relative py-14 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#faf7f2" }}
    >
      {/* ── Ruido y Textura Editorial ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-310 mx-auto px-6 relative z-10">
        {/* ── Cabecera Editorial ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-32"
        >
          <span 
            className="inline-block text-[10px] uppercase font-bold tracking-[0.4em] mb-6 text-[#C3A27A]"
          >
            Metodología
          </span>
          <h2
            className="text-5xl md:text-8xl tracking-tight leading-none mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2E1608", fontWeight: 300 }}
          >
            El Proceso <em className="italic font-light">Estratégico</em>
          </h2>
          <p className="text-stone-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* ── Grid de Pasos Estilo "Luxury Box" ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C3A27A]/20 border border-[#C3A27A]/20 rounded-3xl overflow-hidden shadow-2xl shadow-[#2E1608]/5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative group p-6 md:p-12 bg-[#140C06] flex flex-col min-h-0 md:min-h-100 transition-colors duration-700 hover:bg-[#1a110a]"
            >
              {/* Número de fondo (Outline) */}
              <div
                className="absolute -top-6 -right-4 select-none pointer-events-none transition-all duration-1000 group-hover:scale-110 group-hover:-translate-x-4 opacity-10"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12rem",
                  fontWeight: 700,
                  color: "transparent",
                  WebkitTextStroke: "1px #C3A27A",
                }}
              >
                {step.num}
              </div>

              {/* Contenido Superior */}
              <div className="relative z-10 grow">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#C3A27A]/30 flex items-center justify-center mb-5 md:mb-10 group-hover:bg-[#C3A27A] group-hover:text-[#2E1608] transition-all duration-500"
                  style={{ color: "#C3A27A", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
                >
                  {step.num}
                </div>
                
                <h3
                  className="text-2xl mb-4 text-[#F5EDE0] leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {step.title}
                </h3>
                
                <p className="text-sm text-[#F5EDE0]/40 leading-relaxed font-light group-hover:text-[#F5EDE0]/70 transition-colors duration-500">
                  {step.desc}
                </p>
              </div>

              {/* Línea decorativa inferior */}
              <div className="relative z-10 pt-8 mt-auto">
                <div className="h-px w-full bg-white/5 overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#C3A27A]" 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer con Branding Sutil ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 md:mt-24 text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-[#C3A27A]/30" />
             <span className="text-[10px] uppercase tracking-[0.5em] text-[#C3A27A] font-bold">
               Eficiencia & Estética
             </span>
             <div className="h-px w-12 bg-[#C3A27A]/30" />
          </div>
          <p className="text-stone-400 text-xs font-light">Optimizado para resultados en tiempo récord</p>
        </motion.div>
      </div>
    </section>
  );
}