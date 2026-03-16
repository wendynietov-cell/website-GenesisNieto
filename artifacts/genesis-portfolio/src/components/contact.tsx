import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { ArrowRight, Instagram, Lock, Send, Check, AlertCircle } from "lucide-react";
import { useContent } from "@/context/content-context";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type FormState = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const { content } = useContent();
  const { title, subtitle, email, instagramHandle, instagramUrl, tiktokHandle, tiktokUrl, copyright } = content.contact;

  const [form, setForm] = useState({ name: "", email: "", brand: "", message: "", type: "contact" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormState("sending");
    
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      brand: form.brand || null,
      message: form.message,
      type: form.type,
    });

    if (error) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    } else {
      setFormState("sent");
      setForm({ name: "", email: "", brand: "", message: "", type: "contact" });
    }
  };

  return (
    <section id="contacto" className="pt-32 pb-12 bg-[#2E1608] relative overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(195,162,122,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-310 mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 
            className="text-5xl md:text-7xl mb-6 text-[#F5EDE0]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {title}
          </h2>
          <p className="text-[#F5EDE0]/60 text-lg md:text-xl max-w-xl mx-auto font-light">
            {subtitle}
          </p>

          <div className="mt-10">
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-4 text-2xl md:text-4xl text-[#C3A27A] hover:text-[#F5EDE0] transition-all duration-500 font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {email}
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              { url: instagramUrl, handle: instagramHandle, Icon: Instagram },
              { url: tiktokUrl, handle: tiktokHandle, Icon: "tiktok" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.url} 
                target="_blank" 
                className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 transition-all text-[#F5EDE0] text-sm"
              >
                {social.Icon === "tiktok" ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                ) : <social.Icon className="w-4 h-4" />}
                {social.handle}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-32">
          <GlassCard className="p-8 md:p-12 bg-white/3 border-white/10 backdrop-blur-2xl rounded-[40px]">
            {formState === "sent" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#C3A27A]/20 flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-[#C3A27A]" />
                </div>
                <h3 className="text-2xl text-[#F5EDE0] mb-2 font-heading">¡Recibido con éxito!</h3>
                <p className="text-[#F5EDE0]/60 mb-8">Te responderé personalmente en las próximas 24 horas.</p>
                <button onClick={() => setFormState("idle")} className="text-[#C3A27A] text-sm uppercase tracking-widest font-bold">Enviar otro</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-wrap gap-2 mb-8">
                  {["contact", "quote", "collab"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, type })}
                      className={cn(
                        "px-5 py-2 rounded-full text-[10px] uppercase tracking-tighter font-bold transition-all border cursor-pointer",
                        form.type === type 
                          ? "bg-[#C3A27A] border-[#C3A27A] text-[#2E1608]" 
                          : "border-white/10 text-[#F5EDE0]/40 hover:border-white/30"
                      )}
                    >
                      {type === "contact" ? "General" : type === "quote" ? "Cotización" : "Colaboración"}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Tu Nombre" value={form.name} onChange={(v: string) => setForm({...form, name: v})} placeholder="Génesis Nieto" required />
                  <InputField label="Email" type="email" value={form.email} onChange={(v: string) => setForm({...form, email: v})} placeholder="hola@marca.com" required />
                </div>
                
                <InputField label="Marca / Empresa" value={form.brand} onChange={(v: string) => setForm({...form, brand: v})} placeholder="Nombre de tu proyecto" />
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#C3A27A] font-bold">Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="Cuéntame sobre tu visión..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[#F5EDE0] placeholder:text-white/10 focus:outline-none focus:border-[#C3A27A]/50 transition-colors resize-none"
                  />
                </div>

                {formState === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle size={14} /> Error al enviar. Intenta de nuevo.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full py-5 bg-[#C3A27A] text-[#2E1608] rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#F5EDE0] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {formState === "sending" ? "Enviando..." : "Enviar Propuesta"}
                </button>
              </form>
            )}
          </GlassCard>
        </div>

        <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">{copyright}</p>
          <a href="/admin" className="text-white/10 hover:text-white/30 flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors">
            <Lock size={10} /> Acceso Privado
          </a>
        </footer>
      </div>
    </section>
  );
}

// Sub-componente para limpiar el código
function InputField({ label, type = "text", value, onChange, placeholder, required = false }: { label: string; type?: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean }) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] uppercase tracking-[0.2em] text-[#C3A27A] font-bold">{label} {required && "*"}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[#F5EDE0] placeholder:text-white/10 focus:outline-none focus:border-[#C3A27A]/50 transition-colors"
      />
    </div>
  );
}