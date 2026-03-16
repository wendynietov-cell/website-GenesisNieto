import { Link } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />
      
      <GlassCard className="max-w-md w-full text-center relative z-10 py-16">
        <h1 className="text-8xl font-heading text-primary/40 mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-4 text-foreground">Página no encontrada</h2>
        <p className="text-foreground/70 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </GlassCard>
    </div>
  );
}
