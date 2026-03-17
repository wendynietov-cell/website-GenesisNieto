import React, { useState, useRef } from "react";
import { X, Plus, Download, Camera, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Types
export interface CvExperience { empresa: string; rol: string; periodo: string; descripcion: string; }
export interface CvEducacion { institucion: string; titulo: string; anio: string; }
export interface CvData {
  nombre: string; titulo: string; email: string; telefono: string; ciudad: string;
  instagram: string; website: string; perfil: string; foto: string;
  experiencia: CvExperience[]; educacion: CvEducacion[]; habilidades: string;
}

// Constants
const colors = {
  bg: "#F7F5F2", border: "rgba(200,168,137,0.22)", primary: "#C8A889",
  dark: "#5C3C2C", text: "#4A3728", textLight: "#B09070", white: "#FFFFFF",
  sidebarBg: "#3D2518", sidebarText: "#FAF8F5", accent: "#8A6B52",
  danger: "#C05040", dangerBg: "#FEF1EE",
};
const border = { light: `1px solid ${colors.border}`, dashed: `1.5px dashed ${colors.primary}` };

// Shared styles objects
const inputBase = {
  background: colors.bg, border: border.light, borderRadius: "0.75rem",
  color: colors.text, fontSize: "0.875rem", width: "100%", padding: "0.5rem 0.75rem",
  outline: "none", fontFamily: "inherit", transition: "border-color .15s, box-shadow .15s",
  boxSizing: "border-box" as const,
};
const sectionLabelStyle = { fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: colors.textLight, display: "block", marginBottom: "0.375rem" };
const cardBase = { background: colors.white, border: border.light, borderRadius: "1rem", padding: "1.25rem", marginBottom: "1rem" };
const previewLeftTitle = { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "11px", fontWeight: 700, color: colors.sidebarText, textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 10px", paddingBottom: "5px", borderBottom: "1px solid rgba(255,255,255,0.2)" };
const previewRightTitle = { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "12px", fontWeight: 700, color: colors.dark, textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 10px", paddingBottom: "4px", borderBottom: `1px solid ${colors.border}` };

// Global styles
const globalStyles = `
  .input-focusable:focus { border-color: ${colors.primary} !important; box-shadow: 0 0 0 3px rgba(200,168,137,0.15) !important; }
  .card-hover { transition: border-color 0.15s; } .card-hover:hover { border-color: ${colors.primary} !important; }
  .remove-btn { border: ${border.light}; background: transparent; color: ${colors.textLight}; transition: background 0.15s, color 0.15s; }
  .remove-btn:hover { background: ${colors.dangerBg} !important; color: ${colors.danger} !important; }
  .dashed-btn { border: ${border.dashed}; color: ${colors.accent}; background: transparent; transition: background 0.15s; }
  .dashed-btn:hover { background: ${colors.bg} !important; }
  .upload-label { border: ${border.dashed}; background: transparent; transition: background 0.15s; }
  .upload-label:hover { background: ${colors.bg} !important; }
  .cv-layout{display:flex;flex-direction:column;gap:24px;align-items:flex-start;}
  .cv-form{width:100%;} .cv-panel{width:100%;position:static;}
  @media(min-width:768px){.cv-layout{flex-direction:row;}.cv-form{width:45%;flex-shrink:0;}.cv-panel{flex:1;position:sticky;top:80px;}}
  @media print {
    body * { visibility: hidden !important; }
    #cv-preview-print, #cv-preview-print * { visibility: visible !important; }
    #cv-preview-print { position: fixed !important; top: 0 !important; left: 0 !important; width: 595px !important; height: 842px !important; transform: none !important; overflow: hidden !important; }
    @page { size: A4 portrait; margin: 0; }
  }
`;

// Shared components
const SectionLabel = ({ children }: { children: React.ReactNode }) => <label style={sectionLabelStyle}>{children}</label>;

const Field = ({ label, value, onChange, placeholder, multiline, rows = 3 }: { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean; rows?: number; }) => (
  <div>
    <SectionLabel>{label}</SectionLabel>
    {multiline ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className="input-focusable" style={{ ...inputBase, resize: "vertical" }} />
    ) : (
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="input-focusable" style={inputBase} />
    )}
  </div>
);

const EditCard = ({ children, title, description, count }: { children: React.ReactNode; title: string; description?: string; count?: number; }) => (
  <div style={cardBase}>
    <div className="flex items-center gap-2 mb-4">
      <p className="text-sm font-semibold" style={{ color: colors.text }}>{title}</p>
      {count !== undefined && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.textLight }}>{count}</span>}
    </div>
    {description && <p className="text-xs mb-3" style={{ color: colors.textLight }}>{description}</p>}
    <div className="space-y-3">{children}</div>
  </div>
);

const PhotoUploader = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      // Subir a Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `cv-photo_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `cv/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("favorites-images") // Reutilizamos bucket existente
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("favorites-images")
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error) {
      console.error("Error subiendo foto:", error);
      // Fallback a base64 si falla Supabase
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result as string);
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };
  
  const handleRemove = (ev: React.MouseEvent) => { 
    ev.stopPropagation(); 
    onChange(""); 
    if (inputRef.current) inputRef.current.value = ""; 
  };
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: "80px", height: "80px" }}>
        <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center" style={{ background: colors.bg, border: "1px solid rgba(200,168,137,0.35)" }}>
          {value ? <img src={value} alt="foto" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <User size={28} style={{ color: colors.primary }} />}
        </div>
        {value && <button type="button" onClick={handleRemove} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: colors.dangerBg, border: "1px solid rgba(200,80,60,0.25)", color: colors.danger }}><X size={10} /></button>}
      </div>
      <div className="flex-1">
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} id="cv-photo-input" />
        <label htmlFor="cv-photo-input" className="upload-label flex flex-col items-center justify-center gap-1.5 w-full py-4 rounded-xl cursor-pointer">
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#C8A889] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.accent, letterSpacing: "0.06em" }}>Subiendo...</span>
            </>
          ) : (
            <>
              <Camera size={16} style={{ color: colors.primary }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.accent, letterSpacing: "0.06em" }}>{value ? "Cambiar foto" : "Subir foto"}</span>
              <span className="text-xs" style={{ color: colors.textLight }}>JPG, PNG · Rec. cuadrada</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

// Preview subcomponents
const ContactItem = ({ label, value }: { label: string; value: string }) => value ? (
  <div>
    <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: colors.primary, marginBottom: "1px" }}>{label}</div>
    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.75)", wordBreak: "break-all" }}>{value}</div>
  </div>
) : null;

const TagList = ({ tags, isPreview = false }: { tags: string[]; isPreview?: boolean }) => {
  if (!tags.length) return null;
  const baseStyle = isPreview
    ? { padding: "2px 8px", borderRadius: "20px", background: "rgba(200,168,137,0.18)", border: "1px solid rgba(200,168,137,0.35)", color: "#F0E0D0", fontSize: "9px", fontWeight: 500 }
    : { background: "rgba(200,168,137,0.15)", border: "1px solid rgba(200,168,137,0.4)", color: colors.dark, padding: "0.25rem 0.625rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 500 };
  return <div className="flex flex-wrap gap-1.5">{tags.map((t, i) => <span key={i} style={baseStyle}>{t}</span>)}</div>;
};

const PreviewSectionTitle = ({ title, isLeft }: { title: string; isLeft?: boolean }) => <div style={isLeft ? previewLeftTitle : previewRightTitle}>{title}</div>;

const ExperienceItem = ({ exp, index, onUpdate, onRemove }: { exp: CvExperience; index: number; onUpdate: (key: keyof CvExperience, value: string) => void; onRemove: () => void; }) => (
  <div className="rounded-xl p-4 card-hover" style={{ background: colors.bg, border: border.light }}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.primary }}>Exp. {index + 1}</span>
      <button type="button" onClick={onRemove} className="w-7 h-7 rounded-lg flex items-center justify-center remove-btn"><X size={12} /></button>
    </div>
    <div className="space-y-2">
      <Field label="Empresa" value={exp.empresa} onChange={(v: string) => onUpdate("empresa", v)} placeholder="Freelance / Marca / Agencia" />
      <div className="grid grid-cols-2 gap-2">
        <Field label="Rol" value={exp.rol} onChange={(v: string) => onUpdate("rol", v)} placeholder="Content Creator" />
        <Field label="Período" value={exp.periodo} onChange={(v: string) => onUpdate("periodo", v)} placeholder="2022 – Presente" />
      </div>
      <Field label="Descripción" value={exp.descripcion} onChange={(v: string) => onUpdate("descripcion", v)} multiline rows={3} placeholder="Describe tus logros..." />
    </div>
  </div>
);

const EducationItem = ({ edu, index, onUpdate, onRemove }: { edu: CvEducacion; index: number; onUpdate: (key: keyof CvEducacion, value: string) => void; onRemove: () => void; }) => (
  <div className="rounded-xl p-4 card-hover" style={{ background: colors.bg, border: border.light }}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.primary }}>Edu. {index + 1}</span>
      <button type="button" onClick={onRemove} className="w-7 h-7 rounded-lg flex items-center justify-center remove-btn"><X size={12} /></button>
    </div>
    <div className="space-y-2">
      <Field label="Institución" value={edu.institucion} onChange={(v: string) => onUpdate("institucion", v)} placeholder="Universidad / Academia" />
      <div className="grid grid-cols-2 gap-2">
        <Field label="Título" value={edu.titulo} onChange={(v: string) => onUpdate("titulo", v)} placeholder="Comunicación Social" />
        <Field label="Año" value={edu.anio} onChange={(v: string) => onUpdate("anio", v)} placeholder="2021" />
      </div>
    </div>
  </div>
);

// Main preview component
export function CvPreview({ cv, printId }: { cv: CvData; printId?: string }) {
  const tags = cv.habilidades.split(",").map(t => t.trim()).filter(Boolean);
  const contactFields = [
    { label: "Email", value: cv.email }, { label: "Tel", value: cv.telefono }, { label: "Ciudad", value: cv.ciudad },
    { label: "IG", value: cv.instagram }, { label: "Web", value: cv.website }
  ].filter(c => c.value);

  return (
    <div id={printId} style={{ 
      width: "595px", 
      height: "842px", 
      background: colors.white, 
      fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif", 
      fontSize: "10px", 
      color: "#2C1A0A", 
      boxSizing: "border-box", 
      display: "flex", 
      lineHeight: 1.5,
      overflow: "hidden",
      margin: 0,
      padding: 0
    }}>
      {/* Left sidebar */}
      <div style={{ width: "210px", flexShrink: 0, background: colors.sidebarBg, padding: "36px 22px", display: "flex", flexDirection: "column", gap: "22px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(200,168,137,0.5)", background: colors.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {cv.foto ? <img src={cv.foto} alt={cv.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ textAlign: "center" }}><div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(200,168,137,0.35)", margin: "0 auto 4px" }} /><div style={{ width: "56px", height: "28px", borderRadius: "28px 28px 0 0", background: "rgba(200,168,137,0.25)", margin: "0 auto" }} /></div>}
          </div>
        </div>
        <div><PreviewSectionTitle title="Contacto" isLeft /><div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>{contactFields.map((c, i) => <ContactItem key={i} {...c} />)}</div></div>
        {tags.length > 0 && <div><PreviewSectionTitle title="Habilidades" isLeft /><TagList tags={tags} isPreview /></div>}
        {cv.educacion.length > 0 && <div><PreviewSectionTitle title="Educación" isLeft /><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{cv.educacion.map((ed, i) => <div key={i}><div style={{ fontSize: "9px", fontWeight: 700, color: colors.sidebarText }}>{ed.institucion}</div>{ed.titulo && <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.65)", fontStyle: "italic", margin: "1px 0" }}>{ed.titulo}</div>}{ed.anio && <div style={{ fontSize: "9px", color: colors.primary }}>{ed.anio}</div>}</div>)}</div></div>}
      </div>
      {/* Right main */}
      <div style={{ flex: 1, padding: "36px 28px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "0px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 600, color: "#2C1A0A", margin: "0 0 3px", letterSpacing: "-0.5px", lineHeight: 1.1 }}>{cv.nombre || "Tu Nombre"}</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "13px", color: colors.accent, margin: "0", fontStyle: "italic" }}>{cv.titulo}</p>
          <div style={{ height: "2px", width: "48px", background: colors.primary, borderRadius: "2px", marginTop: "12px" }} />
        </div>
        {cv.perfil && <div style={{ marginBottom: "20px" }}><PreviewSectionTitle title="Perfil Profesional" /><p style={{ color: "#3a2519", lineHeight: 1.7, fontSize: "10px" }}>{cv.perfil}</p></div>}
        {cv.experiencia.length > 0 && <div style={{ marginBottom: "20px" }}><PreviewSectionTitle title="Experiencia" /><div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>{cv.experiencia.map((e, i) => (
          <div key={i} style={{ paddingLeft: "10px", borderLeft: "2px solid rgba(200,168,137,0.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><strong style={{ color: "#2C1A0A", fontSize: "10px" }}>{e.empresa}</strong><span style={{ color: colors.textLight, fontSize: "9px", flexShrink: 0, marginLeft: "8px", background: "rgba(200,168,137,0.12)", padding: "1px 6px", borderRadius: "8px" }}>{e.periodo}</span></div>
            {e.rol && <p style={{ color: colors.accent, fontSize: "9px", margin: "2px 0 4px", fontStyle: "italic" }}>{e.rol}</p>}
            {e.descripcion && <p style={{ color: "#3a2519", lineHeight: 1.6, margin: 0, fontSize: "9.5px" }}>{e.descripcion}</p>}
          </div>
        ))}</div></div>}
      </div>
    </div>
  );
}

// Scaled preview
function ScaledPreview({ cv }: { cv: CvData }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.88);
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => { const w = entry.contentRect.width; if (w > 0) setScale(Math.min(w / 595, 1)); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={wrapRef} style={{ width: "100%", overflow: "hidden" }}>
      <div style={{ transformOrigin: "top left", transform: `scale(${scale})`, width: "595px", height: `${Math.round(842 * scale)}px` }}><CvPreview cv={cv} /></div>
    </div>
  );
}

// Main tab
const defaultCv: CvData = {
  nombre: "Génesis Nieto", titulo: "Content Creator & UGC Specialist", email: "hola@genesisnieto.com", telefono: "+57 300 000 0000",
  ciudad: "Bogotá, Colombia", instagram: "@genesis_nieto", website: "genesisnieto.com", foto: "",
  perfil: "Creadora de contenido especializada en UGC (User Generated Content) con experiencia en las verticales de fitness, beauty, gastronomía y lifestyle. Trabajo con marcas para crear contenido auténtico que conecta, convierte y construye comunidad.",
  experiencia: [{ empresa: "Freelance — UGC Creator", rol: "Content Creator", periodo: "2022 – Presente", descripcion: "Creación de contenido UGC para marcas nacionales e internacionales en Instagram, TikTok y plataformas de e-commerce." }],
  educacion: [{ institucion: "Universidad Nacional", titulo: "Comunicación Social", anio: "2021" }],
  habilidades: "UGC, Fotografía, Video, Edición, Copywriting, Lifestyle, Fitness, Beauty",
};

export default function CvTab() {
  const [cv, setCv] = useState<CvData>(defaultCv);
  const u = (k: keyof CvData, v: string) => setCv(p => ({ ...p, [k]: v }));
  const updateExp = (i: number, k: keyof CvExperience, v: string) => setCv(p => ({ ...p, experiencia: p.experiencia.map((e, idx) => idx === i ? { ...e, [k]: v } : e) }));
  const addExp = () => setCv(p => ({ ...p, experiencia: [...p.experiencia, { empresa: "", rol: "", periodo: "", descripcion: "" }] }));
  const removeExp = (i: number) => setCv(p => ({ ...p, experiencia: p.experiencia.filter((_, idx) => idx !== i) }));
  const updateEdu = (i: number, k: keyof CvEducacion, v: string) => setCv(p => ({ ...p, educacion: p.educacion.map((e, idx) => idx === i ? { ...e, [k]: v } : e) }));
  const addEdu = () => setCv(p => ({ ...p, educacion: [...p.educacion, { institucion: "", titulo: "", anio: "" }] }));
  const removeEdu = (i: number) => setCv(p => ({ ...p, educacion: p.educacion.filter((_, idx) => idx !== i) }));
  const handlePrint = () => window.print();
  const tags = cv.habilidades.split(",").map(t => t.trim()).filter(Boolean);

  return (
    <>
      <style>{globalStyles}</style>

      {/* ── PRINT TARGET: oculto en pantalla, visible solo al imprimir ── */}
      <div style={{ position: "fixed", top: 0, left: "-9999px", width: "595px", pointerEvents: "none", overflow: "hidden" }}>
        <CvPreview cv={cv} printId="cv-preview-print" />
      </div>

      <div className="cv-layout">
        <div className="cv-form">
          <button onClick={handlePrint} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold mb-5 transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: colors.dark, color: colors.sidebarText }}><Download size={15} /> Descargar PDF (Imprimir)</button>
          <EditCard title="Foto de perfil" description="Aparece en la esquina superior del CV junto a tu nombre"><PhotoUploader value={cv.foto} onChange={v => u("foto", v)} /></EditCard>
          <EditCard title="Información personal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Nombre completo" value={cv.nombre} onChange={v => u("nombre", v)} placeholder="Tu nombre" />
              <Field label="Ciudad" value={cv.ciudad} onChange={v => u("ciudad", v)} placeholder="Bogotá, Colombia" />
            </div>
            <Field label="Título profesional" value={cv.titulo} onChange={v => u("titulo", v)} placeholder="ej: Content Creator & UGC Specialist" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Email" value={cv.email} onChange={v => u("email", v)} placeholder="hola@tudominio.com" />
              <Field label="Teléfono" value={cv.telefono} onChange={v => u("telefono", v)} placeholder="+57 300..." />
              <Field label="Instagram" value={cv.instagram} onChange={v => u("instagram", v)} placeholder="@genesis_nieto" />
              <Field label="Website" value={cv.website} onChange={v => u("website", v)} placeholder="genesisnieto.com" />
            </div>
          </EditCard>
          <EditCard title="Perfil profesional" description="Resumen que aparece al inicio del CV"><Field label="Bio / Resumen" value={cv.perfil} onChange={v => u("perfil", v)} multiline rows={5} placeholder="Cuéntale a las marcas quién eres..." /></EditCard>
          <EditCard title="Experiencia" count={cv.experiencia.length}>
            <div className="space-y-3">{cv.experiencia.map((e, i) => <ExperienceItem key={i} exp={e} index={i} onUpdate={(k: any, v: any) => updateExp(i, k, v)} onRemove={() => removeExp(i)} />)}</div>
            <button type="button" onClick={addExp} className="dashed-btn w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2" style={{ letterSpacing: "0.06em" }}><Plus size={13} /> Agregar experiencia</button>
          </EditCard>
          <EditCard title="Educación" count={cv.educacion.length}>
            <div className="space-y-3">{cv.educacion.map((ed, i) => <EducationItem key={i} edu={ed} index={i} onUpdate={(k: any, v: any) => updateEdu(i, k, v)} onRemove={() => removeEdu(i)} />)}</div>
            <button type="button" onClick={addEdu} className="dashed-btn w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2" style={{ letterSpacing: "0.06em" }}><Plus size={13} /> Agregar educación</button>
          </EditCard>
          <EditCard title="Habilidades" description="Escribe las habilidades separadas por comas">
            <textarea value={cv.habilidades} onChange={e => u("habilidades", e.target.value)} rows={3} placeholder="UGC, Fotografía, Video, Edición, Fitness, Beauty..." className="input-focusable" style={{ ...inputBase, resize: "none" }} />
            {tags.length > 0 && <TagList tags={tags} />}
          </EditCard>
        </div>
        <div className="cv-panel">
          <div className="flex items-center justify-between mb-3"><span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#C3A27A" }}>Vista previa A4</span><button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90" style={{ background: colors.dark, color: colors.sidebarText }}><Download size={12} /> PDF</button></div>
          <div style={{ borderRadius: "16px", boxShadow: "0 4px 32px rgba(92,60,44,0.10)", border: border.light, overflow: "hidden" }}><ScaledPreview cv={cv} /></div>
        </div>
      </div>
    </>
  );
}