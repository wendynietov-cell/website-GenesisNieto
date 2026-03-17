import React from "react";
import { useContent } from "@/context/content-context";
import { Layers, MapPin, Wifi, CheckCircle2 } from "lucide-react";

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

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
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
          style={textareaStyle}
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
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
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
          style={{ background: accent ?? "#EFE9E1", color: "#8A6B52" }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#4A3728" }}>
            {title}
          </p>
          {description && (
            <p className="text-xs mt-0.5" style={{ color: "#B09070" }}>
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ServiceCard({
  side,
  label,
  icon,
  description,
}: {
  side: "onsite" | "remote";
  label: string;
  icon: React.ReactNode;
  description: string;
}) {
  const { content, updateContent } = useContent();
  const s = content.services[side];

  const update = (key: string, val: string) =>
    updateContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [side]: { ...prev.services[side], [key]: val },
      },
    }));

  const updateFeature = (idx: number, val: string) =>
    updateContent((prev) => {
      const features = [...prev.services[side].features];
      features[idx] = val;
      return {
        ...prev,
        services: {
          ...prev.services,
          [side]: { ...prev.services[side], features },
        },
      };
    });

  return (
    <EditCard icon={icon} title={label} description={description}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InlineField
          label="Título"
          value={s.title}
          onChange={(v) => update("title", v)}
          placeholder="Nombre del servicio"
        />
        <InlineField
          label="Subtítulo"
          value={s.subtitle}
          onChange={(v) => update("subtitle", v)}
          placeholder="Breve descripción"
        />
      </div>

      <InlineField
        label="Descripción completa"
        value={s.description}
        onChange={(v) => update("description", v)}
        multiline
        placeholder="Detalla qué incluye este servicio..."
      />

      {/* Features */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label style={sectionLabel}>Características incluidas</label>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "#EFE9E1", color: "#B09070", fontSize: "0.6rem" }}
          >
            {s.features.length}
          </span>
        </div>
        <div className="space-y-2">
          {s.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2
                size={14}
                style={{ color: "#C8A889", flexShrink: 0 }}
              />
              <input
                type="text"
                value={f}
                onChange={(e) => updateFeature(i, e.target.value)}
                placeholder={`Característica ${i + 1}`}
                style={inputStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA preview */}
      <div>
        <InlineField
          label="Texto del botón"
          value={s.cta}
          onChange={(v) => update("cta", v)}
          placeholder="Ej: Solicitar cotización"
        />
        <div className="mt-2 flex items-center gap-2">
          <div
            className="px-4 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "#8A6B52", color: "#fff" }}
          >
            {s.cta || "Texto del botón"}
          </div>
          <span className="text-xs" style={{ color: "#B09070" }}>
            preview
          </span>
        </div>
      </div>
    </EditCard>
  );
}

export default function ServicesTab() {
  const { content, updateContent } = useContent();

  return (
    <div className="space-y-1">
      {/* Encabezado de sección */}
      <EditCard
        icon={<Layers size={16} />}
        title="Encabezado de sección"
        description="Título y subtítulo que aparecen sobre los servicios"
      >
        <InlineField
          label="Título de la sección"
          value={content.services.sectionTitle}
          onChange={(v) =>
            updateContent((p) => ({
              ...p,
              services: { ...p.services, sectionTitle: v },
            }))
          }
          placeholder="Ej: Mis servicios"
        />
        <InlineField
          label="Subtítulo"
          value={content.services.sectionSubtitle}
          onChange={(v) =>
            updateContent((p) => ({
              ...p,
              services: { ...p.services, sectionSubtitle: v },
            }))
          }
          placeholder="Ej: Colaboraciones que generan resultados reales"
        />
      </EditCard>

      {/* Servicio On-Site */}
      <ServiceCard
        side="onsite"
        label="Servicio On-Site"
        icon={<MapPin size={16} />}
        description="Colaboraciones presenciales con la marca"
      />

      {/* Servicio Remoto */}
      <ServiceCard
        side="remote"
        label="Servicio Remoto"
        icon={<Wifi size={16} />}
        description="Contenido y activaciones en formato digital"
      />
    </div>
  );
}