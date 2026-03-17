import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Marcas", href: "#marcas" },
  { name: "Galería", href: "#galeria" },
  { name: "Servicios", href: "#servicios" },
  { name: "Colaboraciones", href: "#colaboraciones" },
  { name: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      // Set scrolled state for background changes
      setScrolled(currentScrollY > 40);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -72 }}
      animate={{ y: hidden ? -72 : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(250,248,245,0.90)"
          : "rgba(250,248,245,0.76)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(200,168,137,0.30)",
        boxShadow: scrolled ? "0 4px 24px rgba(140,90,55,0.08)" : "0 1px 12px rgba(140,90,55,0.04)",
      }}
    >
      {/* Full-width inner strip — aligned to page edges with padding */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "0 clamp(1.5rem, 4vw, 3.5rem)", height: "72px" }}
      >
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          className="font-heading text-xl md:text-2xl font-medium transition-opacity hover:opacity-70"
          style={{ color: "#5C3C2C", letterSpacing: "0.02em" }}
        >
          Génesis Nieto
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-xs font-medium transition-opacity hover:opacity-60"
              style={{
                color: "#5C3C2C",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 transition-opacity hover:opacity-60"
          style={{ color: "#5C3C2C" }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgba(200,168,137,0.25)",
              background: "rgba(250,248,245,0.96)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="flex flex-col"
              style={{ padding: "0.5rem clamp(1.5rem, 4vw, 3.5rem) 1rem" }}
            >
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="py-3 text-sm font-medium transition-opacity hover:opacity-60"
                  style={{
                    color: "#5C3C2C",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid rgba(200,168,137,0.18)",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
