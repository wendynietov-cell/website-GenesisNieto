import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useContent } from "@/context/content-context";

export function Hero() {
  const { content } = useContent();
  const { name, subtitle, bio, tagline, ctaPrimary, ctaSecondary } = content.hero;

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const parts = subtitle.split("·").map((s) => s.trim());

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Abstract elegant background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block glass px-4 py-1.5 rounded-full text-sm font-medium tracking-widest uppercase mb-8 text-foreground/80">
            {parts.map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-2 opacity-50">·</span>}
                {i === parts.length - 1 ? (
                  <em className="font-heading italic not-italic" style={{ fontStyle: "italic" }}>{part}</em>
                ) : (
                  part
                )}
              </span>
            ))}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-9xl font-heading text-foreground mb-6"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed text-balance"
        >
          {bio}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl font-heading italic text-foreground max-w-3xl mx-auto mb-12 text-balance"
        >
          "{tagline}"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button onClick={() => scrollTo('#servicios')} size="lg">
            {ctaPrimary}
          </Button>
          <Button onClick={() => scrollTo('#contacto')} variant="glass" size="lg">
            {ctaSecondary}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
