import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { ArrowRight, Instagram } from "lucide-react";

export function Contact() {
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
            <h2 className="text-5xl md:text-6xl font-heading mb-6">Conectemos</h2>
            <p className="text-xl text-foreground/70 mb-10 max-w-lg mx-auto">
              ¿Lista para crear contenido que impacte y conecte genuinamente con tu audiencia?
            </p>
            
            <a 
              href="mailto:hola@genesisnieto.com"
              className="inline-flex items-center gap-2 text-2xl md:text-3xl font-heading hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary pb-1"
            >
              hola@genesisnieto.com
              <ArrowRight className="w-6 h-6" />
            </a>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="https://instagram.com/genesis_nieto" target="_blank" rel="noreferrer" className="w-full sm:w-auto block">
                <div className="glass hover:bg-white/40 px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1">
                  <Instagram className="w-5 h-5" />
                  <span className="font-medium">@genesis_nieto</span>
                </div>
              </a>
              <a href="https://tiktok.com/@genesis_nieto" target="_blank" rel="noreferrer" className="w-full sm:w-auto block">
                <div className="glass hover:bg-white/40 px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1">
                  {/* Custom TikTok Icon SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="font-medium">@genesis_nieto</span>
                </div>
              </a>
            </div>
          </GlassCard>
        </motion.div>

        <footer className="text-center text-foreground/50 text-sm flex flex-col items-center">
          <p>© {new Date().getFullYear()} Génesis Nieto · Todos los derechos reservados</p>
          <div className="mt-4">
            <a href="/admin" className="inline-flex items-center gap-1.5 text-foreground/25 hover:text-foreground/50 transition-colors text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Admin
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
