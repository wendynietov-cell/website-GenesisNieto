import { useContent, MethodStep } from "@/context/content-context";
import { Layers } from "lucide-react";

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

export default function MethodTab() {
  const { content, updateContent } = useContent();

  const updateStep = (idx: number, key: keyof MethodStep, val: string) =>
    updateContent((prev) => ({
      ...prev,
      method: {
        ...prev.method,
        steps: prev.method.steps.map((s, i) =>
          i === idx ? { ...s, [key]: val } : s
        ),
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
              Título y subtítulo que introducen tu método
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <InlineField
            label="Título"
            value={content.method.sectionTitle}
            onChange={(v) =>
              updateContent((p) => ({
                ...p,
                method: { ...p.method, sectionTitle: v },
              }))
            }
            placeholder="Ej: Mi método de trabajo"
          />
          <InlineField
            label="Subtítulo"
            value={content.method.sectionSubtitle}
            onChange={(v) =>
              updateContent((p) => ({
                ...p,
                method: { ...p.method, sectionSubtitle: v },
              }))
            }
            placeholder="Ej: Un proceso claro de inicio a fin"
          />
        </div>
      </div>

      {/* Pasos */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(200,168,137,0.22)" }}
      >
        {/* Header de la lista */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{
            background: "#F7F5F2",
            borderBottom: "1px solid rgba(200,168,137,0.22)",
          }}
        >
          <p style={{ ...sectionLabel, margin: 0 }}>Pasos del método</p>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "#EFE9E1",
              color: "#B09070",
              fontSize: "0.6rem",
            }}
          >
            {content.method.steps.length} pasos
          </span>
        </div>

        {/* Cada paso */}
        {content.method.steps.map((step, i) => (
          <div
            key={i}
            className="flex gap-4 p-5"
            style={{
              borderBottom:
                i < content.method.steps.length - 1
                  ? "1px solid rgba(200,168,137,0.15)"
                  : "none",
              background: "#FFFFFF",
            }}
          >
            {/* Número del paso */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{ background: "#EFE9E1", color: "#8A6B52" }}
              >
                {step.num}
              </div>
              {/* Línea conectora */}
              {i < content.method.steps.length - 1 && (
                <div
                  className="flex-1 w-px mt-1"
                  style={{
                    background: "rgba(200,168,137,0.25)",
                    minHeight: "24px",
                  }}
                />
              )}
            </div>

            {/* Campos */}
            <div className="flex-1 space-y-3 min-w-0">
              <InlineField
                label="Título del paso"
                value={step.title}
                onChange={(v) => updateStep(i, "title", v)}
                placeholder={`Ej: Paso ${step.num} — nombre`}
              />
              <InlineField
                label="Descripción"
                value={step.desc}
                onChange={(v) => updateStep(i, "desc", v)}
                multiline
                placeholder="Explica qué sucede en esta etapa..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}