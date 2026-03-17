import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Portafolio",     href: "#galeria" },
  { name: "Marcas",         href: "#marcas" },
  { name: "Servicios",      href: "#servicios" },
  { name: "Método",         href: "#metodo" },
  { name: "Testimonios",    href: "#testimonios" },
  { name: "Favoritos",      href: "#favoritos" },
  { name: "Colaboraciones", href: "#colaboraciones" },
  { name: "Contacto",       href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [hidden, setHidden]               = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Hide on scroll-down, show on scroll-up
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 80);
      setScrolled(y > 40);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(250,247,242,0.92)" : "rgba(250,247,242,0.72)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: "1px solid rgba(195,162,122,0.22)",
          boxShadow: scrolled ? "0 4px 32px rgba(120,80,40,0.07)" : "none",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "0 clamp(1.25rem, 4vw, 3rem)", height: "68px" }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="flex flex-col leading-none transition-opacity hover:opacity-60"
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#2E1608",
                letterSpacing: "0.01em",
              }}
            >
              Génesis Nieto
            </span>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                color: "#C3A27A",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              UGC Creator
            </span>
          </a>

          {/* Desktop Nav — sin cambios */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {links.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="relative py-1 group transition-opacity"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: isActive ? "#2E1608" : "#7A5840",
                    opacity: 1,
                  }}
                >
                  {link.name}
                  <span
                    className="absolute left-0 bottom-0 h-px transition-all duration-300"
                    style={{ background: "#C3A27A", width: isActive ? "100%" : "0%" }}
                  />
                  <span
                    className="absolute left-0 bottom-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: "rgba(195,162,122,0.5)" }}
                  />
                </a>
              );
            })}
          </nav>

          {/* CTA Desktop — sin cambios */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); scrollTo("#contacto"); }}
              className="px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all hover:shadow-lg hover:-translate-y-px"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: "#2C1A0A",
                color: "#F5EDE0",
              }}
            >
              Trabajemos juntos
            </a>
          </div>

          {/* Mobile hamburger — mejorado */}
          <motion.button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{
              background: mobileOpen ? "rgba(44,26,10,0.08)" : "transparent",
              color: "#2E1608",
              border: "1px solid rgba(195,162,122,0.25)",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: "rgba(250,247,242,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="flex flex-col h-full pt-[68px]">

              {/* Línea de acento animada */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-px mx-6"
                style={{
                  background: "linear-gradient(to right, #C3A27A, rgba(195,162,122,0.0))",
                  transformOrigin: "left",
                }}
              />

              {/* Links */}
              <nav className="flex-1 flex flex-col justify-center px-6 overflow-y-auto py-2">
                {links.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 + 0.07, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="flex items-center justify-between py-3.5 border-b"
                      style={{ borderColor: "rgba(195,162,122,0.15)" }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Punto activo */}
                        <motion.span
                          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.2 }}
                          transition={{ duration: 0.18 }}
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "#C3A27A" }}
                        />
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(20px, 5.5vw, 26px)",
                            fontWeight: isActive ? 700 : 300,
                            color: isActive ? "#2E1608" : "#7A5840",
                            fontStyle: isActive ? "italic" : "normal",
                            letterSpacing: "-0.01em",
                            lineHeight: 1,
                          }}
                        >
                          {link.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          color: isActive ? "#C3A27A" : "rgba(195,162,122,0.45)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </motion.a>
                  );
                })}
              </nav>

              {/* CTA + tagline */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.38 }}
                className="px-6 pb-8 pt-5 space-y-3"
              >
                <a
                  href="#contacto"
                  onClick={(e) => { e.preventDefault(); scrollTo("#contacto"); }}
                  className="flex items-center justify-center w-full py-4 rounded-2xl text-xs uppercase tracking-widest font-bold active:scale-[0.98] transition-transform"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: "#2C1A0A",
                    color: "#F5EDE0",
                    boxShadow: "0 8px 28px rgba(44,26,10,0.2)",
                  }}
                >
                  Trabajemos juntos
                </a>
                <p className="text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: "#C3A27A", fontStyle: "italic" }}>
                  UGC Creator · Colombia
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
