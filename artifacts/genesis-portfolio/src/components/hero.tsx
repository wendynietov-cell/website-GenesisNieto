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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh", padding: "80px 24px 24px" }}
    >
      {/* ── Giant Glass Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: "1200px",
          height: "calc(100svh - 108px)",
          minHeight: "560px",
          borderRadius: "32px",
          /* Glassmorphism base */
          background: "linear-gradient(135deg, rgba(250,248,245,0.82) 0%, rgba(232,215,196,0.70) 55%, rgba(210,185,160,0.60) 100%)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(200,168,137,0.45)",
          /* Multi-layer glow */
          boxShadow: [
            "0 0 0 1px rgba(255,250,245,0.55) inset",
            "0 1px 0 rgba(255,255,255,0.75) inset",
            "0 32px 80px rgba(140,90,55,0.14)",
            "0 8px 24px rgba(200,168,137,0.18)",
          ].join(", "),
        }}
      >
        {/* ── Portrait image — right side, fills card ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ left: "45%" }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/genesis-portrait.png`}
            alt="Génesis Nieto"
            className="w-full h-full object-cover object-top"
            style={{ borderRadius: "0 32px 32px 0" }}
          />
          {/* Fade the image into the card on the left */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(245,238,228,0.98) 0%, rgba(240,228,212,0.80) 25%, rgba(235,218,198,0.30) 55%, transparent 100%)",
              borderRadius: "0 32px 32px 0",
            }}
          />
          {/* Subtle bottom vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 55%, rgba(215,190,165,0.45) 100%)",
              borderRadius: "0 32px 32px 0",
            }}
          />
        </div>

        {/* ── Shimmer highlight stripe ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,252,248,0.22) 48%, rgba(200,168,137,0.10) 54%, transparent 68%)",
            borderRadius: "32px",
          }}
        />

        {/* ── Top highlight ring (inner glow) ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-[32px]"
          style={{
            boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.70), inset 0 -1px 0 rgba(200,168,137,0.25)",
          }}
        />

        {/* ── Text Content — left side ── */}
        <motion.div
          className="relative z-20 flex flex-col justify-center h-full"
          style={{ maxWidth: "520px", padding: "clamp(2rem, 5vw, 4rem)" }}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } },
          }}
        >
          {/* Role pill */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
            className="mb-7"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
              style={{
                background: "rgba(255,250,245,0.55)",
                border: "1px solid rgba(200,168,137,0.40)",
                backdropFilter: "blur(12px)",
                color: "#7A5A45",
              }}
            >
              {parts.map((part, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span style={{ opacity: 0.4 }}>·</span>}
                  {i === parts.length - 1
                    ? <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>{part}</em>
                    : part}
                </span>
              ))}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="font-heading leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 5.5vw, 6rem)",
              color: "#4A2E1E",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 16px rgba(92,60,44,0.08)",
            }}
          >
            {name.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>

          {/* Accent rule */}
          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } } }}
            className="mb-6 origin-left"
            style={{ height: "1.5px", width: "56px", background: "linear-gradient(to right, #C8A889, #E8D4BC)" }}
          />

          {/* Bio */}
          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
            className="leading-relaxed mb-5"
            style={{ color: "#6B4C38", fontWeight: 300, fontSize: "clamp(0.875rem, 1.2vw, 1.05rem)", maxWidth: "380px" }}
          >
            {bio}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
            className="font-heading italic leading-snug mb-9"
            style={{ color: "#5C3C2C", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", maxWidth: "340px", opacity: 0.88 }}
          >
            "{tagline}"
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="flex items-center gap-3 flex-wrap"
          >
            <Button onClick={() => scrollTo('#servicios')} size="lg">
              {ctaPrimary}
            </Button>
            <Button onClick={() => scrollTo('#contacto')} variant="glass" size="lg">
              {ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
