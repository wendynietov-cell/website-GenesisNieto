import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Sparkles, Flower, Building2, MapPin } from "lucide-react";
import { useContent } from "@/context/content-context";

const TABS = [
  { id: "marcas",   label: "Marcas",   sublabel: "Belleza · Skincare · UGC" },
  { id: "empresas", label: "Empresas", sublabel: "Moda · Entidades · Ropa" },
  { id: "lugares",  label: "Lugares",  sublabel: "Restaurantes · Lifestyle" },
];

function iconForCategory(category: string) {
  const c = category.toLowerCase();
  if (c.includes("skin") || c.includes("flor") || c.includes("beauty")) return Flower;
  if (c.includes("empresa") || c.includes("entidad") || c.includes("ropa") || c.includes("moda")) return Building2;
  if (c.includes("restaurante") || c.includes("lugar") || c.includes("discoteca") || c.includes("club")) return MapPin;
  return Sparkles;
}

export function Brands() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, items } = content.brands;
  const [activeTab, setActiveTab] = useState<"marcas" | "empresas" | "lugares">("marcas");
  const filtered = items.filter((b) => (b.tab ?? "marcas") === activeTab);

  return (
    <section
      id="marcas"
      className="py-12 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #140C06, #1C1008)" }}
    >
      {/* Líneas borde */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.25), transparent)" }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.25), transparent)" }} />

      {/* Glow ambiental */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(195,162,122,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Cabecera ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-14"
        >
          <h2
            className="text-5xl md:text-6xl tracking-tight leading-[0.9]"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 300 }}
          >
            {sectionTitle.split("&")[0].trim()}{" "}&amp;{" "}
            <em className="italic" style={{ fontWeight: 700, color: "#C3A27A" }}>
              {sectionTitle.split("&")[1]?.trim() ?? "Partners"}
            </em>
          </h2>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center mb-8 md:mb-14"
        >
          <div
            className="flex items-stretch rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(195,162,122,0.2)",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(12px)",
            }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "marcas" | "empresas" | "lugares")}
                className="relative px-8 py-4 flex flex-col items-center transition-all duration-400 cursor-pointer"
                style={{
                  background: activeTab === tab.id ? "rgba(195,162,122,0.1)" : "transparent",
                  borderRight: i < TABS.length - 1 ? "1px solid rgba(195,162,122,0.12)" : "none",
                }}
              >
                {/* Indicador activo */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-4 right-4 h-px"
                    style={{ background: "#C3A27A" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className="text-sm font-semibold mb-0.5 transition-colors duration-300"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: activeTab === tab.id ? "#F5EDE0" : "rgba(245,237,224,0.3)",
                  }}
                >
                  {tab.label}
                </span>
                <span
                  className="text-[9px] uppercase tracking-widest transition-opacity duration-300"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: "#C3A27A",
                    opacity: activeTab === tab.id ? 0.7 : 0.25,
                  }}
                >
                  {tab.sublabel}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Tarjetas ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {filtered.length === 0 ? (
              <div
                className="flex items-center justify-center"
                style={{ minHeight: "200px", color: "rgba(245,237,224,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px" }}
              >
                Sin entradas aún
              </div>
            ) : (
              <>
                {/* Grid: 2 columnas en mobile, 2 en tablet, 3 en desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5" style={{ minHeight: "280px" }}>
                  {filtered.map((brand, i) => {
                    const Icon = iconForCategory(brand.category);
                    const num = String(i + 1).padStart(2, "0");
                    return (
                      <motion.div
                        key={brand.name + i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <GlassCard dark className="group h-36 sm:h-44 w-full flex flex-col justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-400 hover:-translate-y-1">
                          <div
                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(195,162,122,0.08), transparent 70%)" }}
                          />
                          <div className="flex items-center justify-between relative z-10">
                            <span className="text-[10px] font-bold tabular-nums" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.4)", letterSpacing: "0.1em" }}>{num}</span>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110" style={{ background: "rgba(195,162,122,0.08)", color: "#C3A27A" }}>
                              <Icon size={16} strokeWidth={1.5} />
                            </div>
                          </div>
                          <div className="relative z-10">
                            <div className="h-px mb-3 w-4 group-hover:w-10 transition-all duration-500" style={{ background: "#C3A27A", opacity: 0.5 }} />
                            <h3 className="text-base sm:text-xl md:text-2xl leading-tight mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 500, fontStyle: "italic" }}>
                              {brand.name}
                            </h3>
                            <span className="text-[9px] uppercase tracking-[0.25em] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.55)" }}>
                              {brand.category}
                            </span>
                          </div>
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
