import { useContent, SiteContent } from "@/context/content-context";
import { Field, Card } from "@/components/admin/shared";

export default function CollabsTab() {
  const { content, updateContent } = useContent();
  const u = (key: keyof SiteContent["collabs"], val: string) =>
    updateContent((prev) => ({ ...prev, collabs: { ...prev.collabs, [key]: val } }));
  return (
    <div>
      <Card title="Encabezado">
        <Field
          label="Título de la sección"
          value={content.collabs.sectionTitle}
          onChange={(v) => u("sectionTitle", v)}
        />
        <Field
          label="Descripción"
          value={content.collabs.description}
          onChange={(v) => u("description", v)}
          multiline
        />
      </Card>
      <Card title="Tarjeta 1 — ¿Qué ofrezco?">
        <Field label="Título" value={content.collabs.card1Title} onChange={(v) => u("card1Title", v)} />
        <Field label="Texto" value={content.collabs.card1Text} onChange={(v) => u("card1Text", v)} multiline />
      </Card>
      <Card title="Tarjeta 2 — ¿Qué busco?">
        <Field label="Título" value={content.collabs.card2Title} onChange={(v) => u("card2Title", v)} />
        <Field label="Texto" value={content.collabs.card2Text} onChange={(v) => u("card2Text", v)} multiline />
      </Card>
      <Card title="Tarjeta 3 — ¿Cómo aplicar?">
        <Field label="Título" value={content.collabs.card3Title} onChange={(v) => u("card3Title", v)} />
        <Field label="Texto" value={content.collabs.card3Text} onChange={(v) => u("card3Text", v)} multiline />
      </Card>
      <Card title="Botón">
        <Field label="Texto del botón" value={content.collabs.cta} onChange={(v) => u("cta", v)} />
      </Card>
    </div>
  );
}
