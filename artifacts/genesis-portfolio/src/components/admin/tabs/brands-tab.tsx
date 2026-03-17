import React from "react";
import { useContent, Brand } from "@/context/content-context";
import { Plus, X } from "lucide-react";
import { Field, Card, inputBase } from "@/components/admin/shared";

const TAB_OPTIONS = [
  { value: "marcas", label: "Marcas" },
  { value: "empresas", label: "Empresas" },
  { value: "lugares", label: "Lugares" },
] as const;

function BrandAvatar({ name }: { name: string }) {
  const initial = name?.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold transition-all"
      style={{
        background: "#EFE9E1",
        color: "#8A6B52",
        letterSpacing: "-0.02em",
      }}
    >
      {initial}
    </div>
  );
}

function TabPills({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {TAB_OPTIONS.map((opt) => {
        const isActive = (value ?? "marcas") === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase transition-all"
            style={{
              background: isActive ? "#EFE9E1" : "transparent",
              border: `1px solid ${isActive ? "#C8A889" : "rgba(200,168,137,0.25)"}`,
              color: isActive ? "#8A6B52" : "#B09070",
              letterSpacing: "0.06em",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function BrandsTab() {
  const { content, updateContent } = useContent();

  const updateBrand = (idx: number, key: keyof Brand, val: string) =>
    updateContent((prev) => ({
      ...prev,
      brands: {
        ...prev.brands,
        items: prev.brands.items.map((b, i) =>
          i === idx ? { ...b, [key]: val } : b
        ),
      },
    }));

  const addBrand = () =>
    updateContent((prev) => ({
      ...prev,
      brands: {
        ...prev.brands,
        items: [
          ...prev.brands.items,
          { name: "", category: "", tab: "marcas" as const },
        ],
      },
    }));

  const removeBrand = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      brands: {
        ...prev.brands,
        items: prev.brands.items.filter((_, i) => i !== idx),
      },
    }));

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <Card title="Encabezado">
        <Field
          label="Título"
          value={content.brands.sectionTitle}
          onChange={(v) =>
            updateContent((p) => ({
              ...p,
              brands: { ...p.brands, sectionTitle: v },
            }))
          }
        />
        <Field
          label="Subtítulo"
          value={content.brands.sectionSubtitle}
          onChange={(v) =>
            updateContent((p) => ({
              ...p,
              brands: { ...p.brands, sectionSubtitle: v },
            }))
          }
        />
      </Card>

      {/* Lista de marcas */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-0.5">
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#B09070" }}
          >
            Lista de marcas
          </p>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "#EFE9E1", color: "#B09070" }}
          >
            {content.brands.items.length}
          </span>
        </div>

        <div className="space-y-3">
          {content.brands.items.map((b, i) => (
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
              {/* Fila superior: avatar + inputs + botón eliminar */}
              <div className="flex items-start gap-3">
                <BrandAvatar name={b.name} />

                <div className="flex-1 grid gap-2 min-w-0">
                  <input
                    type="text"
                    value={b.name}
                    onChange={(e) => updateBrand(i, "name", e.target.value)}
                    placeholder="Nombre de la marca"
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={
                      {
                        ...inputBase,
                        "--tw-ring-color": "#C8A889",
                      } as React.CSSProperties
                    }
                  />
                  <input
                    type="text"
                    value={b.category}
                    onChange={(e) => updateBrand(i, "category", e.target.value)}
                    placeholder="Categoría (ej: Skincare)"
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={
                      {
                        ...inputBase,
                        "--tw-ring-color": "#C8A889",
                      } as React.CSSProperties
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeBrand(i)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 mt-0.5"
                  style={{
                    color: "#B09070",
                    border: "1px solid rgba(200,168,137,0.22)",
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

              {/* Fila inferior: pills de tab */}
              <div
                className="mt-3 pt-3"
                style={{ borderTop: "1px solid rgba(200,168,137,0.15)" }}
              >
                <TabPills
                  value={b.tab ?? "marcas"}
                  onChange={(v) => updateBrand(i, "tab", v)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Botón agregar */}
        <button
          type="button"
          onClick={addBrand}
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
          Agregar marca
        </button>
      </div>
    </div>
  );
}