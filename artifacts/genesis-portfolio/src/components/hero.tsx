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
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* ── Desktop: two-column editorial split ── */}
      <div className="hidden md:grid h-[calc(100svh-80px)] min-h-[600px]" style={{ gridTemplateColumns: "1fr 2px 45%" }}>

        {/* LEFT — Text Column */}
        <motion.div
          className="flex flex-col justify-center px-10 lg:px-16 xl:px-24 py-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          {/* Role pill */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-foreground/75">
              {parts.map((part, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="opacity-40">·</span>}
                  {i === parts.length - 1
                    ? <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>{part}</em>
                    : part}
                </span>
              ))}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="font-heading leading-none mb-5"
            style={{ fontSize: "clamp(2.8rem, 4.5vw, 5.2rem)", color: "#5C3C2C", letterSpacing: "-0.03em" }}
          >
            {name.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>

          {/* Thin accent rule */}
          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
            className="mb-5 h-px w-12 origin-left"
            style={{ background: "#C8A889" }}
          />

          {/* Bio */}
          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
            className="text-sm lg:text-base leading-relaxed mb-4 max-w-sm"
            style={{ color: "#7A5A45", fontWeight: 300 }}
          >
            {bio}
          </motion.p>

          {/* Tagline quote */}
          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
            className="font-heading italic text-base lg:text-lg leading-snug mb-7 max-w-xs"
            style={{ color: "#5C3C2C", opacity: 0.85 }}
          >
            "{tagline}"
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="flex items-center gap-3"
          >
            <Button onClick={() => scrollTo('#servicios')} size="lg">
              {ctaPrimary}
            </Button>
            <Button onClick={() => scrollTo('#contacto')} variant="glass" size="lg">
              {ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        {/* CENTER — Thin vertical separator */}
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="self-stretch my-12"
          style={{ background: "linear-gradient(to bottom, transparent, #C8A889 20%, #C8A889 80%, transparent)", width: "1px" }}
        />

        {/* RIGHT — Portrait image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/genesis-portrait.png`}
            alt="Génesis Nieto — UGC Creator & Fitness Coach"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Gradient fade edges to blend with background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(250,248,245,0.6) 0%, transparent 15%, transparent 80%, rgba(250,248,245,0.4) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(250,248,245,0.3) 0%, transparent 12%, transparent 75%, rgba(240,230,215,0.7) 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="md:hidden flex flex-col min-h-[calc(100svh-80px)]">
        {/* Portrait image — top half on mobile */}
        <div className="relative h-64 xs:h-80 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/genesis-portrait.png`}
            alt="Génesis Nieto"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(250,248,245,0.95) 100%)" }}
          />
        </div>

        {/* Text — below on mobile */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block glass px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-6 text-foreground/75 self-center"
          >
            {parts.map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-1.5 opacity-40">·</span>}
                {i === parts.length - 1
                  ? <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>{part}</em>
                  : part}
              </span>
            ))}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-heading text-5xl leading-none mb-6"
            style={{ color: "#5C3C2C", letterSpacing: "-0.03em" }}
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="text-sm leading-relaxed mb-6 max-w-xs mx-auto"
            style={{ color: "#7A5A45", fontWeight: 300 }}
          >
            {bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="flex flex-col items-center gap-3"
          >
            <Button onClick={() => scrollTo('#servicios')} size="lg" className="w-full max-w-xs">
              {ctaPrimary}
            </Button>
            <Button onClick={() => scrollTo('#contacto')} variant="glass" size="lg" className="w-full max-w-xs">
              {ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
