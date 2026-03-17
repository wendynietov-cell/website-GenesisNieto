import { useContent, Testimonial } from "@/context/content-context";
import { X, Plus } from "lucide-react";
import { Field, Card } from "@/components/admin/shared";

export default function TestimonialsTab() {
  const { content, updateContent } = useContent();
  const updateItem = (idx: number, key: keyof Testimonial, val: string) =>
    updateContent((prev) => {
      const items = prev.testimonials.items.map((t, i) =>
        i === idx ? { ...t, [key]: val } : t
      );
      return { ...prev, testimonials: { ...prev.testimonials, items } };
    });
  const addItem = () =>
    updateContent((prev) => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: [...prev.testimonials.items, { quote: "", author: "", brand: "" }],
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
    <div>
      <Card title="Encabezado de sección">
        <Field
          label="Título"
          value={content.testimonials.sectionTitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, testimonials: { ...p.testimonials, sectionTitle: v } }))
          }
        />
        <Field
          label="Subtítulo"
          value={content.testimonials.sectionSubtitle}
          onChange={(v) =>
            updateContent((p) => ({
              ...p,
              testimonials: { ...p.testimonials, sectionSubtitle: v },
            }))
          }
        />
      </Card>
      {content.testimonials.items.map((t, i) => (
        <div key={i} className="relative">
          <button
            onClick={() => removeItem(i)}
            className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-red-100"
            style={{ color: "#B09070" }}
          >
            <X size={14} />
          </button>
          <Card title={`Testimonio ${i + 1}`}>
            <Field
              label="Nombre de la marca"
              value={t.brand}
              onChange={(v) => updateItem(i, "brand", v)}
            />
            <Field
              label="Rol del contacto (ej: Brand Manager)"
              value={t.author}
              onChange={(v) => updateItem(i, "author", v)}
            />
            <Field
              label="Cita / Testimonio"
              value={t.quote}
              onChange={(v) => updateItem(i, "quote", v)}
              multiline
              placeholder="Lo que la marca dice de tu trabajo..."
            />
          </Card>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
        style={{ borderColor: "#C8A889", color: "#8A6B52" }}
      >
        <Plus size={14} /> Agregar testimonio
      </button>
    </div>
  );
}
