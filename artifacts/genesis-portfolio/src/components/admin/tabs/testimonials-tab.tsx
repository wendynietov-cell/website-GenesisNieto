import { useContent, Testimonial } from "@/context/content-context";
import { X, Plus, Quote, Layers } from "lucide-react";

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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <label style={sectionLabel}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
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

function AuthorAvatar({ name }: { name: string }) {
  const initial = name?.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold"
      style={{ background: "#EFE9E1", color: "#8A6B52" }}
    >
      {initial}
    </div>
  );
}

export default function TestimonialsTab() {
  const { content, updateContent } = useContent();

  const updateItem = (idx: number, key: keyof Testimonial, val: string) =>
    updateContent((prev) => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: prev.testimonials.items.map((t, i) =>
          i === idx ? { ...t, [key]: val } : t
        ),
      },
    }));

  const addItem = () =>
    updateContent((prev) => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: [
          ...prev.testimonials.items,
          { quote: "", author: "", brand: "" },
        ],
      },
    }));

  const removeItem = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: prev.testimonials.items.filter((_, i) => i !== idx),
      },
    }));

  return (
    <div className="space-y-1">
      {/* Encabezado */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(200,168,137,0.22)",
        }}
      >
        <div className="flex items-start gap-3 mb-5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "#EFE9E1", color: "#8A6B52" }}
          >
            <Layers size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#4A3728" }}>
              Encabezado de sección
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#B09070" }}>
              Título y subtítulo que introducen los testimonios
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <InlineField
            label="Título"
            value={content.testimonials.sectionTitle}
            onChange={(v) =>
              updateContent((p) => ({
                ...p,
                testimonials: { ...p.testimonials, sectionTitle: v },
              }))
            }
            placeholder="Ej: Lo que dicen las marcas"
          />
          <InlineField
            label="Subtítulo"
            value={content.testimonials.sectionSubtitle}
            onChange={(v) =>
              updateContent((p) => ({
                ...p,
                testimonials: { ...p.testimonials, sectionSubtitle: v },
              }))
            }
            placeholder="Ej: Resultados que hablan por sí solos"
          />
        </div>
      </div>

      {/* Lista de testimonios */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-0.5">
          <p style={{ ...sectionLabel, margin: 0 }}>Testimonios</p>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "#EFE9E1",
              color: "#B09070",
              fontSize: "0.6rem",
            }}
          >
            {content.testimonials.items.length}
          </span>
        </div>

        <div className="space-y-3">
          {content.testimonials.items.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 transition-all"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(200,168,137,0.22)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(200,168,137,0.5)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 12px rgba(200,168,137,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(200,168,137,0.22)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Header de la tarjeta */}
              <div className="flex items-center gap-3 mb-4">
                <AuthorAvatar name={t.brand || t.author} />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: "#4A3728" }}
                  >
                    {t.brand || (
                      <span style={{ color: "#C8A889" }}>Nombre de marca</span>
                    )}
                  </p>
                  <p className="text-xs truncate" style={{ color: "#B09070" }}>
                    {t.author || "Rol del contacto"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0"
                  style={{
                    color: "#B09070",
                    border: "1px solid rgba(200,168,137,0.22)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#FEF1EE";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#C05040";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(200,80,60,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#B09070";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(200,168,137,0.22)";
                  }}
                >
                  <X size={13} />
                </button>
              </div>

              {/* Campos */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InlineField
                    label="Nombre de la marca"
                    value={t.brand}
                    onChange={(v) => updateItem(i, "brand", v)}
                    placeholder="Ej: Nike Colombia"
                  />
                  <InlineField
                    label="Rol del contacto"
                    value={t.author}
                    onChange={(v) => updateItem(i, "author", v)}
                    placeholder="Ej: Brand Manager"
                  />
                </div>

                {/* Cita con ícono decorativo */}
                <div>
                  <label style={sectionLabel}>Cita / Testimonio</label>
                  <div className="relative">
                    <Quote
                      size={14}
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        color: "#C8A889",
                        opacity: 0.6,
                        pointerEvents: "none",
                      }}
                    />
                    <textarea
                      value={t.quote}
                      onChange={(e) => updateItem(i, "quote", e.target.value)}
                      placeholder="Lo que la marca dice de tu trabajo..."
                      rows={3}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        paddingLeft: "2rem",
                      }}
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón agregar */}
        <button
          type="button"
          onClick={addItem}
          className="w-full mt-3 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          style={{
            border: "1.5px dashed #C8A889",
            color: "#8A6B52",
            background: "transparent",
            letterSpacing: "0.06em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#EFE9E1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          <Plus size={13} />
          Agregar testimonio
        </button>
      </div>
    </div>
  );
}