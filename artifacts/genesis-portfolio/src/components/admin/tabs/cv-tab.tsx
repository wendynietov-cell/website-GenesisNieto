import React, { useState, useRef } from "react";
import { X, Plus, Download, Camera, User } from "lucide-react";
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

export interface CvData {
  nombre: string;
  titulo: string;
  email: string;
  telefono: string;
  ciudad: string;
  instagram: string;
  website: string;
  perfil: string;
  foto: string; // base64 or URL
  experiencia: CvExperience[];
  educacion: CvEducacion[];
  habilidades: string;
}

const defaultCv: CvData = {
  nombre: "Génesis Nieto",
  titulo: "Content Creator & UGC Specialist",
  email: "hola@genesisnieto.com",
  telefono: "+57 300 000 0000",
  ciudad: "Bogotá, Colombia",
  instagram: "@genesis_nieto",
  website: "genesisnieto.com",
  foto: "",
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
  habilidades:
    "UGC, Fotografía, Video, Edición, Copywriting, Lifestyle, Fitness, Beauty",
};

/* ─────────────────────────────────────────────
   SHARED STYLES (consistent with other tabs)
───────────────────────────────────────────── */
const sectionLabel: React.CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#B09070",
  display: "block",
  marginBottom: "0.375rem",
};

const inputStyle: React.CSSProperties = {
  background: "#F7F5F2",
  border: "1px solid rgba(200,168,137,0.22)",
  borderRadius: "0.75rem",
  color: "#4A3728",
  fontSize: "0.875rem",
  width: "100%",
  padding: "0.5rem 0.75rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color .15s, box-shadow .15s",
  boxSizing: "border-box" as const,
};

function focusOn(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = "#C8A889";
  e.target.style.boxShadow = "0 0 0 3px rgba(200,168,137,0.15)";
}
function focusOff(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = "rgba(200,168,137,0.22)";
  e.target.style.boxShadow = "none";
}

function InlineField({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label style={sectionLabel}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      )}
    </div>
  );
}

function EditCard({
  children,
  title,
  description,
  count,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  count?: number;
}) {
  return (
    <div
      className="rounded-2xl p-5 mb-4"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(200,168,137,0.22)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <p className="text-sm font-semibold" style={{ color: "#4A3728" }}>
          {title}
        </p>
        {count !== undefined && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "#EFE9E1",
              color: "#B09070",
              fontSize: "0.6rem",
            }}
          >
            {count}
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs mb-3" style={{ color: "#B09070" }}>
          {description}
        </p>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHOTO UPLOADER
───────────────────────────────────────────── */
function PhotoUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemove = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-4">
      {/* Avatar preview */}
      <div
        className="relative shrink-0"
        style={{ width: "80px", height: "80px" }}
      >
        <div
          className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            background: "#EFE9E1",
            border: "1px solid rgba(200,168,137,0.35)",
          }}
        >
          {value ? (
            <img
              src={value}
              alt="Foto de perfil"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <User size={28} style={{ color: "#C8A889" }} />
          )}
        </div>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{
              background: "#FEF1EE",
              border: "1px solid rgba(200,80,60,0.25)",
              color: "#C05040",
            }}
          >
            <X size={10} />
          </button>
        )}
      </div>

      {/* Upload area */}
      <div className="flex-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ display: "none" }}
          id="cv-photo-input"
        />
        <label
          htmlFor="cv-photo-input"
          className="flex flex-col items-center justify-center gap-1.5 w-full py-4 rounded-xl cursor-pointer transition-colors"
          style={{
            border: "1.5px dashed #C8A889",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLLabelElement).style.background = "#EFE9E1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLLabelElement).style.background =
              "transparent";
          }}
        >
          <Camera size={16} style={{ color: "#C8A889" }} />
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "#8A6B52", letterSpacing: "0.06em" }}
          >
            {value ? "Cambiar foto" : "Subir foto"}
          </span>
          <span className="text-xs" style={{ color: "#B09070" }}>
            JPG, PNG · Rec. cuadrada
          </span>
        </label>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CV PREVIEW
───────────────────────────────────────────── */
export function CvPreview({ cv }: { cv: CvData }) {
  const tags = cv.habilidades
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <>
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
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Foto */}
          {cv.foto && (
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "12px",
                overflow: "hidden",
                flexShrink: 0,
                border: "1px solid rgba(200,168,137,0.35)",
              }}
            >
              <img
                src={cv.foto}
                alt={cv.nombre}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          <div style={{ flex: 1 }}>
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
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, #C8A889 0%, #C3A27A 60%, transparent 100%)",
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <strong style={{ color: "#2C1A0A", fontSize: "11px" }}>
                    {e.empresa}
                  </strong>
                  <span
                    style={{
                      color: "#B09070",
                      fontSize: "10px",
                      flexShrink: 0,
                      marginLeft: "8px",
                    }}
                  >
                    {e.periodo}
                  </span>
                </div>
                {e.rol && (
                  <p
                    style={{
                      color: "#8A6B52",
                      fontSize: "10px",
                      margin: "1px 0 4px",
                      fontStyle: "italic",
                    }}
                  >
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <strong style={{ color: "#2C1A0A", fontSize: "11px" }}>
                    {ed.institucion}
                  </strong>
                  <span
                    style={{
                      color: "#B09070",
                      fontSize: "10px",
                      flexShrink: 0,
                      marginLeft: "8px",
                    }}
                  >
                    {ed.anio}
                  </span>
                </div>
                {ed.titulo && (
                  <p
                    style={{
                      color: "#8A6B52",
                      fontSize: "10px",
                      margin: "1px 0 0",
                      fontStyle: "italic",
                    }}
                  >
                    {ed.titulo}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Habilidades */}
        {tags.length > 0 && (
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
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN TAB
───────────────────────────────────────────── */
export default function CvTab() {
  const [cv, setCv] = useState<CvData>(defaultCv);

  const u = (key: keyof CvData, val: string) =>
    setCv((prev) => ({ ...prev, [key]: val }));

  /* Experience helpers */
  const updateExp = (idx: number, key: keyof CvExperience, val: string) =>
    setCv((prev) => ({
      ...prev,
      experiencia: prev.experiencia.map((e, i) =>
        i === idx ? { ...e, [key]: val } : e
      ),
    }));
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
    setCv((prev) => ({
      ...prev,
      educacion: prev.educacion.map((e, i) =>
        i === idx ? { ...e, [key]: val } : e
      ),
    }));
  const addEdu = () =>
    setCv((prev) => ({
      ...prev,
      educacion: [
        ...prev.educacion,
        { institucion: "", titulo: "", anio: "" },
      ],
    }));
  const removeEdu = (idx: number) =>
    setCv((prev) => ({
      ...prev,
      educacion: prev.educacion.filter((_, i) => i !== idx),
    }));

  const handlePrint = () => window.print();

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

        {/* Foto de perfil */}
        <EditCard
          title="Foto de perfil"
          description="Aparece en la esquina superior del CV junto a tu nombre"
        >
          <PhotoUploader value={cv.foto} onChange={(v) => u("foto", v)} />
        </EditCard>

        {/* Información Personal */}
        <EditCard title="Información personal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InlineField
              label="Nombre completo"
              value={cv.nombre}
              onChange={(v) => u("nombre", v)}
              placeholder="Tu nombre"
            />
            <InlineField
              label="Ciudad"
              value={cv.ciudad}
              onChange={(v) => u("ciudad", v)}
              placeholder="Bogotá, Colombia"
            />
          </div>
          <InlineField
            label="Título profesional"
            value={cv.titulo}
            onChange={(v) => u("titulo", v)}
            placeholder="ej: Content Creator & UGC Specialist"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InlineField
              label="Email"
              value={cv.email}
              onChange={(v) => u("email", v)}
              placeholder="hola@tudominio.com"
            />
            <InlineField
              label="Teléfono"
              value={cv.telefono}
              onChange={(v) => u("telefono", v)}
              placeholder="+57 300..."
            />
            <InlineField
              label="Instagram"
              value={cv.instagram}
              onChange={(v) => u("instagram", v)}
              placeholder="@genesis_nieto"
            />
            <InlineField
              label="Website"
              value={cv.website}
              onChange={(v) => u("website", v)}
              placeholder="genesisnieto.com"
            />
          </div>
        </EditCard>

        {/* Perfil Profesional */}
        <EditCard
          title="Perfil profesional"
          description="Resumen que aparece al inicio del CV"
        >
          <InlineField
            label="Bio / Resumen"
            value={cv.perfil}
            onChange={(v) => u("perfil", v)}
            multiline
            rows={5}
            placeholder="Cuéntale a las marcas quién eres, qué haces y qué te diferencia..."
          />
        </EditCard>

        {/* Experiencia */}
        <EditCard title="Experiencia" count={cv.experiencia.length}>
          <div className="space-y-3">
            {cv.experiencia.map((e, i) => (
              <div
                key={i}
                className="rounded-xl p-4 transition-all"
                style={{
                  background: "#F7F5F2",
                  border: "1px solid rgba(200,168,137,0.22)",
                }}
                onMouseEnter={(el) => {
                  (el.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(200,168,137,0.5)";
                }}
                onMouseLeave={(el) => {
                  (el.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(200,168,137,0.22)";
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#C8A889" }}
                  >
                    Exp. {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExp(i)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      color: "#B09070",
                      border: "1px solid rgba(200,168,137,0.22)",
                      background: "transparent",
                    }}
                    onMouseEnter={(ev) => {
                      (ev.currentTarget as HTMLButtonElement).style.background =
                        "#FEF1EE";
                      (ev.currentTarget as HTMLButtonElement).style.color =
                        "#C05040";
                    }}
                    onMouseLeave={(ev) => {
                      (ev.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                      (ev.currentTarget as HTMLButtonElement).style.color =
                        "#B09070";
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="space-y-2">
                  <InlineField
                    label="Empresa"
                    value={e.empresa}
                    onChange={(v) => updateExp(i, "empresa", v)}
                    placeholder="Freelance / Marca / Agencia"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <InlineField
                      label="Rol"
                      value={e.rol}
                      onChange={(v) => updateExp(i, "rol", v)}
                      placeholder="Content Creator"
                    />
                    <InlineField
                      label="Período"
                      value={e.periodo}
                      onChange={(v) => updateExp(i, "periodo", v)}
                      placeholder="2022 – Presente"
                    />
                  </div>
                  <InlineField
                    label="Descripción"
                    value={e.descripcion}
                    onChange={(v) => updateExp(i, "descripcion", v)}
                    multiline
                    rows={3}
                    placeholder="Describe tus logros y responsabilidades..."
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addExp}
            className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            style={{
              border: "1.5px dashed #C8A889",
              color: "#8A6B52",
              background: "transparent",
              letterSpacing: "0.06em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#EFE9E1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
            }}
          >
            <Plus size={13} /> Agregar experiencia
          </button>
        </EditCard>

        {/* Educación */}
        <EditCard title="Educación" count={cv.educacion.length}>
          <div className="space-y-3">
            {cv.educacion.map((ed, i) => (
              <div
                key={i}
                className="rounded-xl p-4 transition-all"
                style={{
                  background: "#F7F5F2",
                  border: "1px solid rgba(200,168,137,0.22)",
                }}
                onMouseEnter={(el) => {
                  (el.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(200,168,137,0.5)";
                }}
                onMouseLeave={(el) => {
                  (el.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(200,168,137,0.22)";
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#C8A889" }}
                  >
                    Edu. {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEdu(i)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      color: "#B09070",
                      border: "1px solid rgba(200,168,137,0.22)",
                      background: "transparent",
                    }}
                    onMouseEnter={(ev) => {
                      (ev.currentTarget as HTMLButtonElement).style.background =
                        "#FEF1EE";
                      (ev.currentTarget as HTMLButtonElement).style.color =
                        "#C05040";
                    }}
                    onMouseLeave={(ev) => {
                      (ev.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                      (ev.currentTarget as HTMLButtonElement).style.color =
                        "#B09070";
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="space-y-2">
                  <InlineField
                    label="Institución"
                    value={ed.institucion}
                    onChange={(v) => updateEdu(i, "institucion", v)}
                    placeholder="Universidad / Academia / Plataforma"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <InlineField
                      label="Título / Certificación"
                      value={ed.titulo}
                      onChange={(v) => updateEdu(i, "titulo", v)}
                      placeholder="Comunicación Social"
                    />
                    <InlineField
                      label="Año"
                      value={ed.anio}
                      onChange={(v) => updateEdu(i, "anio", v)}
                      placeholder="2021"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addEdu}
            className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            style={{
              border: "1.5px dashed #C8A889",
              color: "#8A6B52",
              background: "transparent",
              letterSpacing: "0.06em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#EFE9E1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
            }}
          >
            <Plus size={13} /> Agregar educación
          </button>
        </EditCard>

        {/* Habilidades */}
        <EditCard
          title="Habilidades"
          description="Escribe las habilidades separadas por comas"
        >
          <textarea
            value={cv.habilidades}
            onChange={(e) => u("habilidades", e.target.value)}
            rows={3}
            placeholder="UGC, Fotografía, Video, Edición, Fitness, Beauty..."
            style={{ ...inputStyle, resize: "none" }}
            onFocus={focusOn}
            onBlur={focusOff}
          />
          {cv.habilidades && (
            <div className="flex flex-wrap gap-1.5 mt-1">
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
        </EditCard>
      </div>

      {/* ── RIGHT: LIVE PREVIEW ── */}
      <div style={{ flex: 1, position: "sticky", top: "80px" }}>
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#C3A27A" }}
          >
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
          <div
            style={{
              transformOrigin: "top left",
              transform: "scale(0.88)",
              width: "595px",
            }}
          >
            <CvPreview cv={cv} />
          </div>
        </div>
      </div>
    </div>
  );
}