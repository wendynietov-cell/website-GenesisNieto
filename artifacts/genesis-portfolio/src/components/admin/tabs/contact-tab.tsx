import { useContent, SiteContent } from "@/context/content-context";
import { Field, Card } from "@/components/admin/shared";

export default function ContactTab() {
  const { content, updateContent } = useContent();
  const u = (key: keyof SiteContent["contact"], val: string) =>
    updateContent((prev) => ({ ...prev, contact: { ...prev.contact, [key]: val } }));
  return (
    <div>
      <Card title="Textos">
        <Field label="Título" value={content.contact.title} onChange={(v) => u("title", v)} />
        <Field
          label="Subtítulo"
          value={content.contact.subtitle}
          onChange={(v) => u("subtitle", v)}
          multiline
        />
        <Field
          label="Texto del footer (copyright)"
          value={content.contact.copyright}
          onChange={(v) => u("copyright", v)}
        />
      </Card>
      <Card title="Email de contacto">
        <Field
          label="Correo electrónico"
          value={content.contact.email}
          onChange={(v) => u("email", v)}
          placeholder="hola@tudominio.com"
        />
      </Card>
      <Card title="Instagram">
        <Field
          label="Nombre de usuario (con @)"
          value={content.contact.instagramHandle}
          onChange={(v) => u("instagramHandle", v)}
          placeholder="@genesis_nieto"
        />
        <Field
          label="URL del perfil"
          value={content.contact.instagramUrl}
          onChange={(v) => u("instagramUrl", v)}
          placeholder="https://instagram.com/..."
        />
      </Card>
      <Card title="TikTok">
        <Field
          label="Nombre de usuario (con @)"
          value={content.contact.tiktokHandle}
          onChange={(v) => u("tiktokHandle", v)}
          placeholder="@genesis_nieto"
        />
        <Field
          label="URL del perfil"
          value={content.contact.tiktokUrl}
          onChange={(v) => u("tiktokUrl", v)}
          placeholder="https://tiktok.com/@..."
        />
      </Card>
    </div>
  );
}
