import { useContent, SiteContent } from "@/context/content-context";
import { Type, Zap, MousePointerClick } from "lucide-react";

const sectionLabel = {
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#B09070",
};

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "#EFE9E1", color: "#8A6B52" }}
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
  );
}

function EditCard({
  children,
  icon,
  title,
  description,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 mb-4"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(200,168,137,0.22)",
      }}
    >
      <SectionHeader icon={icon} title={title} description={description} />
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InlineField({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  hint?: string;
}) {
  const baseStyle: React.CSSProperties = {
    background: "#F7F5F2",
    border: "1px solid rgba(200,168,137,0.22)",
    borderRadius: "0.75rem",
    color: "#4A3728",
    fontSize: "0.875rem",
    width: "100%",
    padding: "0.5rem 0.75rem",
    outline: "none",
    resize: "vertical" as const,
    fontFamily: "inherit",
    transition: "border-color .15s, box-shadow .15s",
  };

  return (
    <div>
      <label style={sectionLabel} className="block mb-1.5">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={baseStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#C8A889";
            e.target.style.boxShadow = "0 0 0 3px rgba(200,168,137,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(200,168,137,0.22)";
            e.target.style.boxShadow = "none";
          }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#C8A889";
            e.target.style.boxShadow = "0 0 0 3px rgba(200,168,137,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(200,168,137,0.22)";
            e.target.style.boxShadow = "none";
          }}
        />
      )}
      {hint && (
        <p className="text-xs mt-1" style={{ color: "#B09070" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export default function HeroTab() {
  const { content, updateContent } = useContent();
  const u = (key: keyof SiteContent["hero"], val: string) =>
    updateContent((prev) => ({ ...prev, hero: { ...prev.hero, [key]: val } }));

  return (
    <div className="space-y-1">
      {/* Textos principales */}
      <EditCard
        icon={<Type size={16} />}
        title="Textos principales"
        description="Lo primero que verán las marcas al entrar"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InlineField
            label="Tu nombre"
            value={content.hero.name}
            onChange={(v) => u("name", v)}
            placeholder="Ej: María García"
          />
          <InlineField
            label="Subtítulo / Rol"
            value={content.hero.subtitle}
            onChange={(v) => u("subtitle", v)}
            placeholder="Ej: Influencer & Content Creator"
          />
        </div>
        <InlineField
          label="Biografía"
          value={content.hero.bio}
          onChange={(v) => u("bio", v)}
          multiline
          placeholder="Cuéntale a las marcas quién eres..."
          hint="Visible en la sección principal. Sé concisa y auténtica."
        />
      </EditCard>

      {/* Frase de impacto */}
      <EditCard
        icon={<Zap size={16} />}
        title="Frase de impacto"
        description="Tagline que resume tu propuesta de valor"
      >
        <InlineField
          label="Tagline"
          value={content.hero.tagline}
          onChange={(v) => u("tagline", v)}
          multiline
          placeholder="Ej: Conecto marcas con comunidades reales."
          hint="Aparece destacada. Usa máximo 2 líneas."
        />
      </EditCard>

      {/* Botones CTA */}
      <EditCard
        icon={<MousePointerClick size={16} />}
        title="Botones de acción"
        description="Texto de los CTAs del hero"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <InlineField
              label="Botón principal"
              value={content.hero.ctaPrimary}
              onChange={(v) => u("ctaPrimary", v)}
              placeholder="Ej: Ver mi trabajo"
            />
            <div className="mt-2 flex items-center gap-2">
              <div
                className="px-4 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: "#8A6B52", color: "#fff" }}
              >
                {content.hero.ctaPrimary || "Botón principal"}
              </div>
              <span className="text-xs" style={{ color: "#B09070" }}>
                preview
              </span>
            </div>
          </div>
          <div>
            <InlineField
              label="Botón secundario"
              value={content.hero.ctaSecondary}
              onChange={(v) => u("ctaSecondary", v)}
              placeholder="Ej: Contactar"
            />
            <div className="mt-2 flex items-center gap-2">
              <div
                className="px-4 py-1.5 rounded-xl text-xs font-semibold"
                style={{
                  border: "1px solid rgba(200,168,137,0.5)",
                  color: "#8A6B52",
                  background: "transparent",
                }}
              >
                {content.hero.ctaSecondary || "Botón secundario"}
              </div>
              <span className="text-xs" style={{ color: "#B09070" }}>
                preview
              </span>
            </div>
          </div>
        </div>
      </EditCard>
    </div>
  );
}