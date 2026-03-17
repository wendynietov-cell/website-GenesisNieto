import { useState, useRef, useEffect } from "react";
import { Download, Plus, X, FileText, User, Briefcase, DollarSign, StickyNote, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Entregable {
  id: number;
  texto: string;
}

interface ProposalData {
  numero: string;
  fecha: string;
  validez: string;
  // Creadora
  creadoraNombre: string;
  creadoraRol: string;
  creadoraInstagram: string;
  creadoraWebsite: string;
  // Cliente
  clienteNombre: string;
  clienteEmpresa: string;
  clienteEmail: string;
  titulo: string;
  descripcion: string;
  entregables: Entregable[];
  precio: string;
  formaPago: string;
  tiempoEntrega: string;
  revisiones: string;
  notas: string;
}

const defaultData: ProposalData = {
  numero: "001",
  fecha: new Date().toLocaleDateString("es-CO"),
  validez: "15 días",
  creadoraNombre: "Génesis Nieto",
  creadoraRol: "UGC Creator · Entrenadora Personal · Creadora de Contenido",
  creadoraInstagram: "@genesis_nieto",
  creadoraWebsite: "genesisnieto.co",
  clienteNombre: "",
  clienteEmpresa: "",
  clienteEmail: "",
  titulo: "",
  descripcion: "",
  entregables: [{ id: 1, texto: "" }],
  precio: "",
  formaPago: "50% al inicio · 50% al finalizar",
  tiempoEntrega: "",
  revisiones: "2 rondas de revisión incluidas",
  notas: "",
};

/* ─────────────────────────────────────────────
   SHARED FIELD STYLES
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
      {label && <label style={sectionLabel}>{label}</label>}
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
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-5 mb-4"
      style={{ background: "#FFFFFF", border: "1px solid rgba(200,168,137,0.22)" }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "#EFE9E1", color: "#8A6B52" }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#4A3728" }}>{title}</p>
          {description && (
            <p className="text-xs mt-0.5" style={{ color: "#B09070" }}>{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROPOSAL PREVIEW — elegant two-tone design
───────────────────────────────────────────── */
function ProposalPreview({ data }: { data: ProposalData }) {
  const filledEntregables = data.entregables.filter((e) => e.texto);

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #proposal-print, #proposal-print * { visibility: visible !important; }
          #proposal-print { position: fixed; top: 0; left: 0; width: 100%; }
          @page { size: A4; margin: 0; }
        }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      `}</style>

      <div
        id="proposal-print"
        style={{
          width: "595px",
          minHeight: "842px",
          background: "#FFFFFF",
          fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
          fontSize: "10px",
          color: "#2C1A0A",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── TOP ACCENT BAR ── */}
        <div style={{ height: "6px", background: "linear-gradient(90deg, #3D2518 0%, #C8A889 60%, #EFE9E1 100%)" }} />

        {/* ── HEADER ── */}
        <div
          style={{
            background: "#3D2518",
            padding: "28px 36px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "26px",
                fontWeight: 700,
                color: "#FAF8F5",
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
              }}
            >
              {data.clienteNombre ? "Propuesta para" : (data.creadoraNombre || "Tu nombre")}
            </div>
            {data.clienteNombre ? (
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#C8A889",
                  marginTop: "2px",
                }}
              >
                {data.clienteNombre}
              </div>
            ) : null}
            <div
              style={{
                fontSize: "8.5px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(200,168,137,0.7)",
                marginTop: "6px",
              }}
            >
              {data.creadoraRol || "Tu rol profesional"}
            </div>
          </div>

          {/* Proposal meta */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C8A889",
                marginBottom: "8px",
              }}
            >
              Propuesta Comercial
            </div>
            {[
              { label: "N.°", val: data.numero },
              { label: "Fecha", val: data.fecha },
              { label: "Válida", val: data.validez },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginBottom: "2px" }}>
                <span style={{ color: "rgba(200,168,137,0.6)", fontSize: "9px" }}>{r.label}</span>
                <span style={{ color: "#FAF8F5", fontSize: "9px", fontWeight: 500 }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ flex: 1, padding: "28px 36px", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Client info strip */}
          {(data.clienteEmpresa || data.clienteEmail) && (
            <div
              style={{
                display: "flex",
                gap: "20px",
                padding: "10px 14px",
                borderRadius: "8px",
                background: "#FAF7F2",
                border: "1px solid rgba(200,168,137,0.2)",
              }}
            >
              {data.clienteEmpresa && (
                <div>
                  <div style={{ fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8A889", marginBottom: "2px" }}>Empresa</div>
                  <div style={{ fontSize: "10px", fontWeight: 600, color: "#2C1A0A" }}>{data.clienteEmpresa}</div>
                </div>
              )}
              {data.clienteEmail && (
                <div>
                  <div style={{ fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8A889", marginBottom: "2px" }}>Correo</div>
                  <div style={{ fontSize: "10px", color: "#5A3B22" }}>{data.clienteEmail}</div>
                </div>
              )}
            </div>
          )}

          {/* Service */}
          <div>
            <div style={{ fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A889", marginBottom: "6px" }}>
              Servicio propuesto
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#2C1A0A",
                marginBottom: "8px",
                lineHeight: 1.2,
              }}
            >
              {data.titulo || "Título del servicio"}
            </div>
            {data.descripcion && (
              <p style={{ color: "#5A3B22", whiteSpace: "pre-wrap", lineHeight: 1.7, fontSize: "10px" }}>
                {data.descripcion}
              </p>
            )}
          </div>

          {/* Entregables */}
          {filledEntregables.length > 0 && (
            <div>
              <div style={{ fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A889", marginBottom: "8px" }}>
                Entregables
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {filledEntregables.map((e) => (
                  <div
                    key={e.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      background: "#FAF7F2",
                      border: "1px solid rgba(200,168,137,0.18)",
                    }}
                  >
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#C8A889",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "#2C1A0A", fontSize: "10px" }}>{e.texto}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investment block */}
          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(200,168,137,0.3)",
            }}
          >
            <div
              style={{
                background: "#3D2518",
                padding: "8px 16px",
                fontSize: "7.5px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#C8A889",
              }}
            >
              Inversión
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: "#FFFFFF",
              }}
            >
              {[
                { label: "Valor total", val: data.precio || "$ —", large: true },
                { label: "Forma de pago", val: data.formaPago, large: false },
                { label: "Tiempo de entrega", val: data.tiempoEntrega, large: false },
                { label: "Revisiones", val: data.revisiones, large: false },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    borderRight: i % 2 === 0 ? "1px solid rgba(200,168,137,0.15)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(200,168,137,0.15)" : "none",
                  }}
                >
                  <div style={{ fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8A889", marginBottom: "4px" }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: item.large ? "20px" : "10px",
                      fontWeight: item.large ? 700 : 500,
                      color: item.large ? "#3D2518" : "#2C1A0A",
                      fontFamily: item.large ? "'Cormorant Garamond', Georgia, serif" : "inherit",
                    }}
                  >
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          {data.notas && (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "8px",
                borderLeft: "3px solid #C8A889",
                background: "#FAF7F2",
              }}
            >
              <div style={{ fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A889", marginBottom: "4px" }}>
                Notas adicionales
              </div>
              <p style={{ color: "#5A3B22", whiteSpace: "pre-wrap", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>
                {data.notas}
              </p>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div
          style={{
            padding: "14px 36px",
            borderTop: "1px solid rgba(200,168,137,0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#FAF7F2",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                background: "#3D2518",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#C8A889" }}>
                {data.creadoraNombre?.charAt(0).toUpperCase() || "G"}
              </span>
            </div>
            <span style={{ fontSize: "9px", color: "#8A6B52", fontWeight: 500 }}>
              {data.creadoraNombre || "Tu nombre"}{data.creadoraInstagram ? ` · ${data.creadoraInstagram}` : ""}
            </span>
          </div>
          <span style={{ fontSize: "9px", color: "#B09070" }}>{data.creadoraWebsite}</span>
        </div>

        {/* ── BOTTOM ACCENT ── */}
        <div style={{ height: "4px", background: "linear-gradient(90deg, #C8A889 0%, #3D2518 100%)" }} />
      </div>
    </>
  );
}

/* Scales the 595px preview to fit any container */
function ScaledPreview({ data }: { data: ProposalData }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setScale(Math.min(w / 595, 1));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", overflow: "hidden" }}>
      <div
        style={{
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          width: "595px",
          height: `${Math.round(842 * scale)}px`,
          pointerEvents: "none",
        }}
      >
        <ProposalPreview data={data} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN TAB
───────────────────────────────────────────── */
export default function ProposalTab() {
  const [data, setData] = useState<ProposalData>(defaultData);
  const u = <K extends keyof ProposalData>(key: K, val: ProposalData[K]) =>
    setData((p) => ({ ...p, [key]: val }));

  const addEntregable = () =>
    u("entregables", [...data.entregables, { id: Date.now(), texto: "" }]);
  const updateEntregable = (id: number, texto: string) =>
    u("entregables", data.entregables.map((e) => e.id === id ? { ...e, texto } : e));
  const removeEntregable = (id: number) =>
    u("entregables", data.entregables.filter((e) => e.id !== id));

  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        .proposal-layout{display:flex;flex-direction:column;gap:24px;}
        .proposal-form{width:100%;}
        .proposal-panel{width:100%;position:static;}
        @media(min-width:1024px){
          .proposal-layout{flex-direction:row;align-items:flex-start;}
          .proposal-form{width:45%;flex-shrink:0;}
          .proposal-panel{flex:1;position:sticky;top:80px;}
        }
      `}</style>

      <div className="proposal-layout">
        {/* ── FORM ── */}
        <div className="proposal-form">

          {/* Datos del documento */}
          <EditCard icon={<FileText size={16} />} title="Datos del documento" description="Identificación de la propuesta">
            <div className="grid grid-cols-3 gap-3">
              <InlineField label="N.° propuesta" value={data.numero} onChange={(v) => u("numero", v)} placeholder="001" />
              <InlineField label="Fecha" value={data.fecha} onChange={(v) => u("fecha", v)} placeholder="DD/MM/AAAA" />
              <InlineField label="Válida por" value={data.validez} onChange={(v) => u("validez", v)} placeholder="15 días" />
            </div>
          </EditCard>

          {/* Tus datos */}
          <EditCard icon={<Sparkles size={16} />} title="Tus datos" description="Aparecen en el encabezado y pie del documento">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InlineField label="Tu nombre" value={data.creadoraNombre} onChange={(v) => u("creadoraNombre", v)} placeholder="Génesis Nieto" />
              <InlineField label="Instagram" value={data.creadoraInstagram} onChange={(v) => u("creadoraInstagram", v)} placeholder="@genesis_nieto" />
            </div>
            <InlineField label="Rol / Especialidad" value={data.creadoraRol} onChange={(v) => u("creadoraRol", v)} placeholder="UGC Creator · Entrenadora Personal · Creadora de Contenido" />
            <InlineField label="Website" value={data.creadoraWebsite} onChange={(v) => u("creadoraWebsite", v)} placeholder="genesisnieto.co" />
          </EditCard>

          {/* Cliente */}
          <EditCard icon={<User size={16} />} title="Cliente" description="¿A quién va dirigida la propuesta?">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InlineField label="Nombre completo" value={data.clienteNombre} onChange={(v) => u("clienteNombre", v)} placeholder="Ana García" />
              <InlineField label="Empresa / Marca" value={data.clienteEmpresa} onChange={(v) => u("clienteEmpresa", v)} placeholder="Marca XYZ" />
            </div>
            <InlineField label="Correo electrónico" value={data.clienteEmail} onChange={(v) => u("clienteEmail", v)} placeholder="ana@marca.com" />
          </EditCard>

          {/* El servicio */}
          <EditCard icon={<Briefcase size={16} />} title="El servicio" description="Qué ofreces y qué incluye">
            <InlineField label="Título de la propuesta" value={data.titulo} onChange={(v) => u("titulo", v)} placeholder="Ej: Paquete UGC — 10 videos" />
            <InlineField label="Descripción" value={data.descripcion} onChange={(v) => u("descripcion", v)} multiline rows={4} placeholder="Describe detalladamente lo que incluye el servicio..." />

            {/* Entregables */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label style={sectionLabel}>Entregables</label>
                <button
                  type="button"
                  onClick={addEntregable}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
                  style={{
                    color: "#8A6B52",
                    border: "1px solid rgba(200,168,137,0.35)",
                    background: "transparent",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#EFE9E1"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <Plus size={11} /> Añadir
                </button>
              </div>
              <div className="space-y-2">
                {data.entregables.map((e) => (
                  <div key={e.id} className="flex items-center gap-2">
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#C8A889",
                        flexShrink: 0,
                      }}
                    />
                    <input
                      type="text"
                      value={e.texto}
                      onChange={(ev) => updateEntregable(e.id, ev.target.value)}
                      placeholder="Ej: 5 videos UGC de 30 segundos"
                      style={inputStyle}
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                    {data.entregables.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEntregable(e.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        style={{ color: "#B09070", border: "1px solid rgba(200,168,137,0.22)", background: "transparent" }}
                        onMouseEnter={(ev) => {
                          (ev.currentTarget as HTMLButtonElement).style.background = "#FEF1EE";
                          (ev.currentTarget as HTMLButtonElement).style.color = "#C05040";
                        }}
                        onMouseLeave={(ev) => {
                          (ev.currentTarget as HTMLButtonElement).style.background = "transparent";
                          (ev.currentTarget as HTMLButtonElement).style.color = "#B09070";
                        }}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </EditCard>

          {/* Inversión */}
          <EditCard icon={<DollarSign size={16} />} title="Inversión" description="Precio, pago y tiempos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InlineField label="Precio total" value={data.precio} onChange={(v) => u("precio", v)} placeholder="$ 500.000" />
              <InlineField label="Tiempo de entrega" value={data.tiempoEntrega} onChange={(v) => u("tiempoEntrega", v)} placeholder="7 días hábiles" />
              <InlineField label="Forma de pago" value={data.formaPago} onChange={(v) => u("formaPago", v)} placeholder="50% al inicio · 50% al finalizar" />
              <InlineField label="Revisiones incluidas" value={data.revisiones} onChange={(v) => u("revisiones", v)} placeholder="2 rondas de revisión" />
            </div>
          </EditCard>

          {/* Notas */}
          <EditCard icon={<StickyNote size={16} />} title="Notas adicionales" description="Términos, condiciones especiales, etc.">
            <InlineField label="" value={data.notas} onChange={(v) => u("notas", v)} multiline rows={3} placeholder="Ej: Esta propuesta no incluye derechos de uso extendidos..." />
          </EditCard>

          {/* Download */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#3D2518", color: "#FAF8F5", letterSpacing: "0.06em" }}
          >
            <Download size={15} />
            Descargar propuesta en PDF
          </button>
        </div>

        {/* ── PREVIEW ── */}
        <div className="proposal-panel">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#C3A27A" }}>
              Vista previa
            </span>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: "#3D2518", color: "#FAF8F5" }}
            >
              <Download size={12} /> PDF
            </button>
          </div>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 32px rgba(61,37,24,0.12)",
              border: "1px solid rgba(200,168,137,0.25)",
            }}
          >
            <ScaledPreview data={data} />
          </div>
        </div>
      </div>
    </>
  );
}