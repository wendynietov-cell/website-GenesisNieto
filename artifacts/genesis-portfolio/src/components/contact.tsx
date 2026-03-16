import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { ArrowRight, Instagram, Lock } from "lucide-react";
import { useContent } from "@/context/content-context";

export function Contact() {
  const { content } = useContent();
  const { title, subtitle, email, instagramHandle, instagramUrl, tiktokHandle, tiktokUrl, copyright } = content.contact;

  return (
    <section id="contacto" className="pt-32 pb-12 bg-background/80">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <GlassCard className="text-center py-20 px-8">
            <h2 className="text-5xl md:text-6xl font-heading mb-6">{title}</h2>
            <p className="text-xl text-foreground/70 mb-10 max-w-lg mx-auto">{subtitle}</p>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-2xl md:text-3xl font-heading hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary pb-1"
            >
              {email}
              <ArrowRight className="w-6 h-6" />
            </a>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto block">
                <div className="glass hover:bg-white/40 px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1">
                  <Instagram className="w-5 h-5" />
                  <span className="font-medium">{instagramHandle}</span>
                </div>
              </a>
              <a href={tiktokUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto block">
                <div className="glass hover:bg-white/40 px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="font-medium">{tiktokHandle}</span>
                </div>
              </a>
            </div>
          </GlassCard>
        </motion.div>

        <footer className="text-center text-foreground/50 text-sm">
          <p>{copyright}</p>
          <div className="mt-4">
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 text-foreground/20 hover:text-foreground/45 transition-colors text-xs"
            >
              <Lock size={11} />
              Admin
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
