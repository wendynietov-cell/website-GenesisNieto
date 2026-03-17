import { useContent, MethodStep } from "@/context/content-context";
import { Field, Card } from "@/components/admin/shared";

export default function MethodTab() {
  const { content, updateContent } = useContent();
  const updateStep = (idx: number, key: keyof MethodStep, val: string) =>
    updateContent((prev) => {
      const steps = prev.method.steps.map((s, i) =>
        i === idx ? { ...s, [key]: val } : s
      );
      return { ...prev, method: { ...prev.method, steps } };
    });

  return (
    <div>
      <Card title="Encabezado de sección">
        <Field
          label="Título"
          value={content.method.sectionTitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, method: { ...p.method, sectionTitle: v } }))
          }
        />
        <Field
          label="Subtítulo"
          value={content.method.sectionSubtitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, method: { ...p.method, sectionSubtitle: v } }))
          }
        />
      </Card>
      {content.method.steps.map((step, i) => (
        <Card key={i} title={`Paso ${step.num}`}>
          <Field
            label="Título del paso"
            value={step.title}
            onChange={(v) => updateStep(i, "title", v)}
          />
          <Field
            label="Descripción"
            value={step.desc}
            onChange={(v) => updateStep(i, "desc", v)}
            multiline
          />
        </Card>
      ))}
    </div>
  );
}
