import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { ArrowRight, Instagram, Lock, Check, AlertCircle, MessageCircle, Calculator, Handshake, Clock, Mail } from "lucide-react";
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

  const stats = [
    { value: "+50K", label: "Seguidores" },
    { value: "8.4%", label: "Engagement" },
    { value: "3–5x", label: "ROI promedio" },
    { value: "<24h", label: "Tiempo de respuesta" },
  ];

  return (
    <section
      id="contacto"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1C1008 0%, #0E0804 55%, #140C06 100%)" }}
    >
      {/* Línea top */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />

      {/* Glow central */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "900px",
          height: "500px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(195,162,122,0.1) 0%, transparent 65%)",
        }}
      />

      {/* Líneas verticales decorativas */}
      <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(195,162,122,0.08), transparent)" }} />
      <div className="absolute right-8 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(195,162,122,0.08), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10 pt-24 pb-0">

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-20 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(195,162,122,0.12)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 px-4 text-center"
              style={{ background: "rgba(195,162,122,0.04)" }}
            >
              <span
                className="text-2xl md:text-3xl mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C3A27A", fontWeight: 600 }}
              >
                {s.value}
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.2em] font-bold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(245,237,224,0.3)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Grid principal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-20 items-start">

          {/* ── Columna izquierda ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="block text-[10px] uppercase font-bold mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#C3A27A" }}
            >
              Trabajemos Juntos
            </motion.span>

            {/* Título */}
            <h2
              className="text-5xl md:text-6xl tracking-tight leading-[0.88] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 300 }}
            >
              {title.split(" ").slice(0, 1).join(" ")}{" "}
              <em className="italic" style={{ fontWeight: 700, color: "#C3A27A" }}>
                {title.split(" ").slice(1).join(" ")}
              </em>
            </h2>

            {/* Línea dorada */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px w-16 mb-7 origin-left"
              style={{ background: "linear-gradient(to right, #C3A27A, transparent)" }}
            />

            <p
              className="text-sm leading-relaxed font-light mb-10"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(245,237,224,0.45)" }}
            >
              {subtitle}
            </p>

            {/* Info cards */}
            <div className="space-y-3 mb-10">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5"
                style={{ border: "1px solid rgba(195,162,122,0.12)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(195,162,122,0.1)", color: "#C3A27A" }}
                >
                  <Mail size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.5)" }}>
                    Email directo
                  </p>
                  <p
                    className="text-sm font-light truncate transition-colors duration-300 group-hover:text-[#C3A27A]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontSize: "1rem" }}
                  >
                    {email}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color: "rgba(195,162,122,0.4)" }} />
              </a>

              <div
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ border: "1px solid rgba(195,162,122,0.12)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(195,162,122,0.1)", color: "#C3A27A" }}
                >
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.5)" }}>
                    Tiempo de respuesta
                  </p>
                  <p className="text-sm font-light" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(245,237,224,0.7)" }}>
                    Menos de 24 horas hábiles
                  </p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex gap-3">
              {[
                { url: instagramUrl, handle: instagramHandle, icon: "instagram" },
                { url: tiktokUrl, handle: tiktokHandle, icon: "tiktok" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/10"
                  style={{
                    background: "rgba(195,162,122,0.06)",
                    border: "1px solid rgba(195,162,122,0.18)",
                    color: "rgba(245,237,224,0.55)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {social.icon === "instagram" ? (
                    <Instagram size={13} />
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  )}
                  {social.handle}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Columna derecha — formulario ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard dark className="p-7 md:p-10 rounded-[36px]">
              {formState === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(195,162,122,0.12)", border: "1px solid rgba(195,162,122,0.3)" }}
                  >
                    <Check className="w-9 h-9" style={{ color: "#C3A27A" }} />
                  </motion.div>
                  <h3
                    className="text-2xl mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 600 }}
                  >
                    ¡Mensaje recibido!
                  </h3>
                  <p className="text-sm mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(245,237,224,0.4)" }}>
                    Te respondo antes de 24 horas.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="text-[10px] uppercase tracking-widest font-bold cursor-pointer px-6 py-3 rounded-full transition-all hover:bg-white/10"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#C3A27A", border: "1px solid rgba(195,162,122,0.2)" }}
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Tipo de consulta */}
                  <div className="mb-6">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.5)" }}>
                      Tipo de consulta
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { type: "contact", label: "General", icon: MessageCircle },
                        { type: "quote", label: "Cotización", icon: Calculator },
                        { type: "collab", label: "Colaboración", icon: Handshake },
                      ].map(({ type, label, icon: Icon }) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm({ ...form, type })}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer",
                            form.type === type
                              ? "text-[#2E1608]"
                              : "text-[rgba(245,237,224,0.3)] hover:text-[rgba(245,237,224,0.6)]"
                          )}
                          style={{
                            background: form.type === type ? "#C3A27A" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${form.type === type ? "#C3A27A" : "rgba(255,255,255,0.08)"}`,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          <Icon size={11} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nombre + Email */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <InputField label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Tu nombre" required />
                    <InputField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="hola@marca.com" required />
                  </div>

                  {/* Marca */}
                  <div className="mb-3">
                    <InputField label="Marca / Proyecto" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} placeholder="Nombre de tu marca" />
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-1.5 mb-5">
                    <label
                      className="block text-[9px] uppercase tracking-[0.2em] font-bold"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.6)" }}
                    >
                      Mensaje *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Cuéntame sobre tu visión, producto y lo que necesitas..."
                      className="w-full rounded-2xl p-4 text-sm resize-none focus:outline-none transition-all duration-200"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        color: "#F5EDE0",
                        fontSize: "13px",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(195,162,122,0.35)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                    />
                  </div>

                  {/* Error */}
                  {formState === "error" && (
                    <div
                      className="flex items-center gap-2 p-3 rounded-xl text-xs mb-4"
                      style={{ background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", color: "#f87171" }}
                    >
                      <AlertCircle size={13} />
                      Error al enviar. Por favor inténtalo de nuevo.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="group w-full py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3 relative overflow-hidden"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      background: "#C3A27A",
                      color: "#2E1608",
                      boxShadow: "0 4px 24px rgba(195,162,122,0.3)",
                    }}
                  >
                    {/* Shimmer hover */}
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)" }}
                    />
                    <span className="relative z-10">
                      {formState === "sending" ? "Enviando..." : "Enviar Propuesta"}
                    </span>
                    {formState !== "sending" && (
                      <motion.span
                        className="relative z-10"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(195,162,122,0.08)" }}
        >
          <p
            className="text-[10px] uppercase tracking-widest"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.25)" }}
          >
            {copyright}
          </p>
          <a
            href="/admin"
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest transition-all duration-300 hover:opacity-80 hover:scale-105"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255,255,255,0.15)", marginRight: "20px" }}
          >
            <Lock size={9} /> Acceso Privado
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function InputField({
  label, type = "text", value, onChange, placeholder, required = false,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5 w-full">
      <label
        className="block text-[9px] uppercase tracking-[0.2em] font-bold"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(195,162,122,0.6)" }}
      >
        {label}{required && " *"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl p-3.5 text-sm focus:outline-none transition-all duration-200"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          color: "#F5EDE0",
          fontSize: "13px",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(195,162,122,0.35)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
      />
    </div>
  );
}
