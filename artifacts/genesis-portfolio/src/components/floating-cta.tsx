import { motion } from "framer-motion";

export function FloatingCTA() {
  const scrollToContact = () => {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      onClick={scrollToContact}
      className="fixed bottom-20 right-8 z-40 pulse-cta glass px-6 py-3.5 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/50 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-xl border border-white/40 cursor-pointer"
    >
      Trabajemos Juntas ✦
    </motion.button>
  );
}
