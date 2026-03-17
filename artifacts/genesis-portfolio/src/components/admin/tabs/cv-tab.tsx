import React, { useState } from "react";
import { X, Plus, Download } from "lucide-react";
import { Field, Card, inputBase } from "@/components/admin/shared";

/* ─────────────────────────────────────────────
   CV-RELATED TYPES
───────────────────────────────────────────── */
export interface CvExperience {
  empresa: string;
  rol: string;
  periodo: string;
  descripcion: string;
}

export interface CvEducacion {
  institucion: string;
  titulo: string;
  anio: string;
}

export interface CvServicio {
  nombre: string;
  precio: string;
}

export interface CvData {
  nombre: string;
  titulo: string;
  email: string;
  telefono: string;
  ciudad: string;
  instagram: string;
  website: string;
  perfil: string;
  experiencia: CvExperience[];
  educacion: CvEducacion[];
  habilidades: string;
  servicios: CvServicio[];
}

const defaultCv: CvData = {
  nombre: "Génesis Nieto",
  titulo: "Content Creator & UGC Specialist",
  email: "hola@genesisnieto.com",
  telefono: "+57 300 000 0000",
  ciudad: "Bogotá, Colombia",
  instagram: "@genesis_nieto",
  website: "genesisnieto.com",
  perfil:
    "Creadora de contenido especializada en UGC (User Generated Content) con experiencia en las verticales de fitness, beauty, gastronomía y lifestyle. Trabajo con marcas para crear contenido auténtico que conecta, convierte y construye comunidad.",
  experiencia: [
    {
      empresa: "Freelance — UGC Creator",
      rol: "Content Creator",
      periodo: "2022 – Presente",
      descripcion:
        "Creación de contenido UGC para marcas nacionales e internacionales en Instagram, TikTok y plataformas de e-commerce.",
    },
  ],
  educacion: [
    {
      institucion: "Universidad Nacional",
      titulo: "Comunicación Social",
      anio: "2021",
    },
  ],
  habilidades: "UGC, Fotografía, Video, Edición, Copywriting, Lifestyle, Fitness, Beauty",
  servicios: [
    { nombre: "Pack UGC On-Site (1 día)", precio: "USD 350 – 500" },
    { nombre: "Contenido Remoto (3 videos)", precio: "USD 150 – 250" },
  ],
};

export function CvPreview({ cv }: { cv: CvData }) {
  const tags = cv.habilidades
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <>
      {/* Print styles — injected inline so they travel with the component */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #cv-preview-print, #cv-preview-print * { visibility: visible !important; }
          #cv-preview-print { position: fixed; top: 0; left: 0; width: 100%; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <div
        id="cv-preview-print"
        style={{
          width: "595px",
          minHeight: "842px",
          background: "#FFFFFF",
          fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
          fontSize: "11px",
          color: "#2C1A0A",
          boxSizing: "border-box",
          padding: "48px 44px",
          lineHeight: 1.5,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "30px",
              fontWeight: 600,
              color: "#2C1A0A",
              margin: "0 0 4px",
              letterSpacing: "-0.5px",
            }}
          >
            {cv.nombre || "Tu Nombre"}
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "14px",
              color: "#8A6B52",
              margin: "0 0 16px",
              fontStyle: "italic",
            }}
          >
            {cv.titulo}
          </p>

          {/* Contact row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 20px",
              fontSize: "10px",
              color: "#8A6B52",
            }}
          >
            {cv.email && <span>{cv.email}</span>}
            {cv.telefono && <span>{cv.telefono}</span>}
            {cv.ciudad && <span>{cv.ciudad}</span>}
            {cv.instagram && <span>{cv.instagram}</span>}
            {cv.website && <span>{cv.website}</span>}
          </div>
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, #C8A889 0%, #C3A27A 60%, transparent 100%)",
            marginBottom: "24px",
            borderRadius: "2px",
          }}
        />

        {/* Perfil */}
        {cv.perfil && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 8px",
              }}
            >
              Perfil Profesional
            </h2>
            <p style={{ color: "#3a2519", lineHeight: 1.7 }}>{cv.perfil}</p>
          </div>
        )}

        {/* Experiencia */}
        {cv.experiencia.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px",
                borderBottom: "1px solid rgba(200,168,137,0.35)",
                paddingBottom: "4px",
              }}
            >
              Experiencia
            </h2>
            {cv.experiencia.map((e, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ color: "#2C1A0A", fontSize: "11px" }}>
                    {e.empresa}
                  </strong>
                  <span style={{ color: "#B09070", fontSize: "10px", flexShrink: 0, marginLeft: "8px" }}>
                    {e.periodo}
                  </span>
                </div>
                {e.rol && (
                  <p style={{ color: "#8A6B52", fontSize: "10px", margin: "1px 0 4px", fontStyle: "italic" }}>
                    {e.rol}
                  </p>
                )}
                {e.descripcion && (
                  <p style={{ color: "#3a2519", lineHeight: 1.6, margin: 0 }}>
                    {e.descripcion}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Educacion */}
        {cv.educacion.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px",
                borderBottom: "1px solid rgba(200,168,137,0.35)",
                paddingBottom: "4px",
              }}
            >
              Educación
            </h2>
            {cv.educacion.map((ed, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ color: "#2C1A0A", fontSize: "11px" }}>
                    {ed.institucion}
                  </strong>
                  <span style={{ color: "#B09070", fontSize: "10px", flexShrink: 0, marginLeft: "8px" }}>
                    {ed.anio}
                  </span>
                </div>
                {ed.titulo && (
                  <p style={{ color: "#8A6B52", fontSize: "10px", margin: "1px 0 0", fontStyle: "italic" }}>
                    {ed.titulo}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Habilidades */}
        {tags.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px",
                borderBottom: "1px solid rgba(200,168,137,0.35)",
                paddingBottom: "4px",
              }}
            >
              Habilidades
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "20px",
                    background: "rgba(200,168,137,0.15)",
                    border: "1px solid rgba(200,168,137,0.4)",
                    color: "#5C3C2C",
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Servicios */}
        {cv.servicios.length > 0 && (
          <div style={{ marginBottom: "8px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px",
                borderBottom: "1px solid rgba(200,168,137,0.35)",
                paddingBottom: "4px",
              }}
            >
              Servicios y Tarifas
            </h2>
            {cv.servicios.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 0",
                  borderBottom: i < cv.servicios.length - 1 ? "1px solid rgba(200,168,137,0.2)" : "none",
                }}
              >
                <span style={{ color: "#2C1A0A", fontWeight: 500 }}>{s.nombre}</span>
                <span
                  style={{
                    color: "#5C3C2C",
                    fontWeight: 600,
                    fontSize: "11px",
                    background: "rgba(200,168,137,0.12)",
                    padding: "2px 8px",
                    borderRadius: "8px",
                    flexShrink: 0,
                    marginLeft: "12px",
                  }}
                >
                  {s.precio}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function CvTab() {
  const [cv, setCv] = useState<CvData>(defaultCv);

  const u = (key: keyof CvData, val: string) =>
    setCv((prev) => ({ ...prev, [key]: val }));

  /* Experience helpers */
  const updateExp = (idx: number, key: keyof CvExperience, val: string) =>
    setCv((prev) => {
      const experiencia = prev.experiencia.map((e, i) =>
        i === idx ? { ...e, [key]: val } : e
      );
      return { ...prev, experiencia };
    });
  const addExp = () =>
    setCv((prev) => ({
      ...prev,
      experiencia: [
        ...prev.experiencia,
        { empresa: "", rol: "", periodo: "", descripcion: "" },
      ],
    }));
  const removeExp = (idx: number) =>
    setCv((prev) => ({
      ...prev,
      experiencia: prev.experiencia.filter((_, i) => i !== idx),
    }));

  /* Education helpers */
  const updateEdu = (idx: number, key: keyof CvEducacion, val: string) =>
    setCv((prev) => {
      const educacion = prev.educacion.map((e, i) =>
        i === idx ? { ...e, [key]: val } : e
      );
      return { ...prev, educacion };
    });
  const addEdu = () =>
    setCv((prev) => ({
      ...prev,
      educacion: [...prev.educacion, { institucion: "", titulo: "", anio: "" }],
    }));
  const removeEdu = (idx: number) =>
    setCv((prev) => ({
      ...prev,
      educacion: prev.educacion.filter((_, i) => i !== idx),
    }));

  /* Services helpers */
  const updateSvc = (idx: number, key: keyof CvServicio, val: string) =>
    setCv((prev) => {
      const servicios = prev.servicios.map((s, i) =>
        i === idx ? { ...s, [key]: val } : s
      );
      return { ...prev, servicios };
    });
  const addSvc = () =>
    setCv((prev) => ({
      ...prev,
      servicios: [...prev.servicios, { nombre: "", precio: "" }],
    }));
  const removeSvc = (idx: number) =>
    setCv((prev) => ({
      ...prev,
      servicios: prev.servicios.filter((_, i) => i !== idx),
    }));

  const handlePrint = () => window.print();

  const subFieldStyle: React.CSSProperties = {
    ...inputBase,
    fontSize: "13px",
    padding: "8px 12px",
    borderRadius: "10px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div className="flex gap-6" style={{ alignItems: "flex-start" }}>
      {/* ── LEFT: FORM ── */}
      <div style={{ width: "45%", flexShrink: 0 }}>
        {/* Download button */}
        <button
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold mb-5 transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: "#5C3C2C", color: "#FAF8F5" }}
        >
          <Download size={15} />
          Descargar PDF (Imprimir)
        </button>

        {/* Información Personal */}
        <Card title="Información Personal">
          <Field label="Nombre completo" value={cv.nombre} onChange={(v) => u("nombre", v)} />
          <Field
            label="Título profesional"
            value={cv.titulo}
            onChange={(v) => u("titulo", v)}
            placeholder="ej: Content Creator & UGC Specialist"
          />
          <Field label="Email" value={cv.email} onChange={(v) => u("email", v)} placeholder="hola@tudominio.com" />
          <Field label="Teléfono" value={cv.telefono} onChange={(v) => u("telefono", v)} placeholder="+57 300..." />
          <Field label="Ciudad" value={cv.ciudad} onChange={(v) => u("ciudad", v)} placeholder="Bogotá, Colombia" />
          <Field label="Instagram" value={cv.instagram} onChange={(v) => u("instagram", v)} placeholder="@genesis_nieto" />
          <Field label="Website" value={cv.website} onChange={(v) => u("website", v)} placeholder="genesisnieto.com" />
        </Card>

        {/* Perfil Profesional */}
        <Card title="Perfil Profesional">
          <Field
            label="Bio / Resumen"
            value={cv.perfil}
            onChange={(v) => u("perfil", v)}
            multiline
            rows={5}
            placeholder="Cuéntale a las marcas quién eres, qué haces y qué te diferencia..."
          />
        </Card>

        {/* Experiencia */}
        <Card title="Experiencia">
          {cv.experiencia.map((e, i) => (
            <div
              key={i}
              className="mb-4 p-3 rounded-xl relative"
              style={{ background: "#F7F5F2", border: "1px solid rgba(200,168,137,0.2)" }}
            >
              <button
                onClick={() => removeExp(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50"
                style={{ color: "#B09070" }}
              >
                <X size={12} />
              </button>
              <div className="mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Empresa</label>
                <input style={subFieldStyle} value={e.empresa} onChange={(ev) => updateExp(i, "empresa", ev.target.value)} placeholder="Freelance / Marca / Agencia" />
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Rol</label>
                  <input style={subFieldStyle} value={e.rol} onChange={(ev) => updateExp(i, "rol", ev.target.value)} placeholder="Content Creator" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Período</label>
                  <input style={subFieldStyle} value={e.periodo} onChange={(ev) => updateExp(i, "periodo", ev.target.value)} placeholder="2022 – Presente" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Descripción</label>
                <textarea
                  style={{ ...subFieldStyle, resize: "none" }}
                  rows={3}
                  value={e.descripcion}
                  onChange={(ev) => updateExp(i, "descripcion", ev.target.value)}
                  placeholder="Describe tus logros y responsabilidades..."
                />
              </div>
            </div>
          ))}
          <button
            onClick={addExp}
            className="w-full py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
            style={{ borderColor: "#C8A889", color: "#8A6B52" }}
          >
            <Plus size={13} /> Agregar experiencia
          </button>
        </Card>

        {/* Educación */}
        <Card title="Educación">
          {cv.educacion.map((ed, i) => (
            <div
              key={i}
              className="mb-4 p-3 rounded-xl relative"
              style={{ background: "#F7F5F2", border: "1px solid rgba(200,168,137,0.2)" }}
            >
              <button
                onClick={() => removeEdu(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50"
                style={{ color: "#B09070" }}
              >
                <X size={12} />
              </button>
              <div className="mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Institución</label>
                <input style={subFieldStyle} value={ed.institucion} onChange={(ev) => updateEdu(i, "institucion", ev.target.value)} placeholder="Universidad / Academia / Plataforma" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Título / Certificación</label>
                  <input style={subFieldStyle} value={ed.titulo} onChange={(ev) => updateEdu(i, "titulo", ev.target.value)} placeholder="Comunicación Social" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Año</label>
                  <input style={subFieldStyle} value={ed.anio} onChange={(ev) => updateEdu(i, "anio", ev.target.value)} placeholder="2021" />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addEdu}
            className="w-full py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
            style={{ borderColor: "#C8A889", color: "#8A6B52" }}
          >
            <Plus size={13} /> Agregar educación
          </button>
        </Card>

        {/* Habilidades */}
        <Card title="Habilidades">
          <p className="text-xs mb-3" style={{ color: "#B09070" }}>
            Escribe las habilidades separadas por comas.
          </p>
          <textarea
            value={cv.habilidades}
            onChange={(e) => u("habilidades", e.target.value)}
            rows={3}
            placeholder="UGC, Fotografía, Video, Edición, Fitness, Beauty..."
            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
            style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
          />
          {/* Tag preview */}
          {cv.habilidades && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {cv.habilidades
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(200,168,137,0.15)",
                      border: "1px solid rgba(200,168,137,0.4)",
                      color: "#5C3C2C",
                    }}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </Card>

        {/* Servicios */}
        <Card title="Servicios y Tarifas">
          {cv.servicios.map((s, i) => (
            <div
              key={i}
              className="mb-3 p-3 rounded-xl relative"
              style={{ background: "#F7F5F2", border: "1px solid rgba(200,168,137,0.2)" }}
            >
              <button
                onClick={() => removeSvc(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50"
                style={{ color: "#B09070" }}
              >
                <X size={12} />
              </button>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Servicio</label>
                  <input style={subFieldStyle} value={s.nombre} onChange={(ev) => updateSvc(i, "nombre", ev.target.value)} placeholder="Pack UGC On-Site" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Precio / Rango</label>
                  <input style={subFieldStyle} value={s.precio} onChange={(ev) => updateSvc(i, "precio", ev.target.value)} placeholder="USD 350 – 500" />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addSvc}
            className="w-full py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
            style={{ borderColor: "#C8A889", color: "#8A6B52" }}
          >
            <Plus size={13} /> Agregar servicio
          </button>
        </Card>
      </div>

      {/* ── RIGHT: LIVE PREVIEW ── */}
      <div style={{ flex: 1, position: "sticky", top: "80px" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#C3A27A" }}>
            Vista previa A4
          </span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: "#5C3C2C", color: "#FAF8F5" }}
          >
            <Download size={12} />
            PDF
          </button>
        </div>
        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "calc(100vh - 160px)",
            borderRadius: "16px",
            boxShadow: "0 4px 32px rgba(92,60,44,0.10)",
            border: "1px solid rgba(200,168,137,0.25)",
          }}
        >
          <div style={{ transformOrigin: "top left", transform: "scale(0.88)", width: "595px" }}>
            <CvPreview cv={cv} />
          </div>
        </div>
      </div>
    </div>
  );
}
