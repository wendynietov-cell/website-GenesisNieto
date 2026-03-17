import { useContent, GalleryVideo } from "@/context/content-context";
import { X, Plus } from "lucide-react";
import { Field, Card } from "@/components/admin/shared";

export default function GalleryTab() {
  const { content, updateContent } = useContent();

  const updateVideo = (idx: number, key: keyof GalleryVideo, val: string) =>
    updateContent((prev) => {
      const videos = prev.gallery.videos.map((v, i) =>
        i === idx ? { ...v, [key]: val } : v
      );
      return { ...prev, gallery: { ...prev.gallery, videos } };
    });

  const toggleVideoType = (idx: number) =>
    updateContent((prev) => {
      const videos = prev.gallery.videos.map((v, i) =>
        i === idx
          ? { ...v, type: v.type === "video" ? ("photo" as const) : ("video" as const) }
          : v
      );
      return { ...prev, gallery: { ...prev.gallery, videos } };
    });

  const addVideo = () =>
    updateContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        videos: [...prev.gallery.videos, { type: "photo" as const, src: "" }],
      },
    }));

  const removeVideo = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        videos: prev.gallery.videos.filter((_, i) => i !== idx),
      },
    }));

  const updatePhoto = (idx: number, val: string) =>
    updateContent((prev) => {
      const photos = prev.gallery.photos.map((p, i) => (i === idx ? { src: val } : p));
      return { ...prev, gallery: { ...prev.gallery, photos } };
    });

  const addPhoto = () =>
    updateContent((prev) => ({
      ...prev,
      gallery: { ...prev.gallery, photos: [...prev.gallery.photos, { src: "" }] },
    }));

  const removePhoto = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        photos: prev.gallery.photos.filter((_, i) => i !== idx),
      },
    }));

  return (
    <div>
      <Card title="Título de la sección">
        <Field
          label="Título"
          value={content.gallery.sectionTitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, gallery: { ...p.gallery, sectionTitle: v } }))
          }
        />
      </Card>

      <Card title="Tab Videos">
        <p className="text-xs mb-4" style={{ color: "#B09070" }}>
          Pega la URL del archivo. Si está en la carpeta <code>public/</code> usa{" "}
          <code>/nombre-archivo.mov</code>
        </p>
        {content.gallery.videos.map((v, i) => (
          <div
            key={i}
            className="mb-4 p-4 rounded-xl"
            style={{ background: "#F7F5F2", border: "1px solid rgba(200,168,137,0.2)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleVideoType(i)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    background:
                      v.type === "video" ? "#5C3C2C" : "rgba(200,168,137,0.3)",
                    color: v.type === "video" ? "#FAF8F5" : "#8A6B52",
                  }}
                >
                  {v.type === "video" ? "Video" : "Foto"}
                </button>
                <span className="text-xs" style={{ color: "#B09070" }}>
                  Slot {i + 1}
                </span>
              </div>
              <button
                onClick={() => removeVideo(i)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-50"
                style={{ color: "#B09070" }}
              >
                <X size={13} />
              </button>
            </div>
            {v.src && (
              <div className="mb-2 h-20 rounded-lg overflow-hidden">
                {v.type === "video" ? (
                  <video src={v.src} className="w-full h-full object-cover" />
                ) : (
                  <img src={v.src} className="w-full h-full object-cover" alt="" />
                )}
              </div>
            )}
            <Field
              label="URL del archivo (video o imagen)"
              value={v.src}
              onChange={(val) => updateVideo(i, "src", val)}
              placeholder="/genesis-video-1.mov o https://..."
            />
            {v.type === "video" && (
              <Field
                label="URL imagen de portada (poster)"
                value={v.poster ?? ""}
                onChange={(val) => updateVideo(i, "poster", val)}
                placeholder="/genesis-1.jpg"
              />
            )}
            <Field
              label="Categoría (Fitness / Beauty / Gastro / Lifestyle)"
              value={v.category ?? ""}
              onChange={(val) => updateVideo(i, "category", val)}
              placeholder="Fitness"
            />
          </div>
        ))}
        <button
          onClick={addVideo}
          className="w-full py-3 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
          style={{ borderColor: "#C8A889", color: "#8A6B52" }}
        >
          <Plus size={14} /> Agregar slot de video
        </button>
      </Card>

      <Card title="Tab Fotografías">
        <p className="text-xs mb-4" style={{ color: "#B09070" }}>
          Pega la URL de cada foto. Archivos locales: <code>/genesis-1.jpg</code>
        </p>
        {content.gallery.photos.map((p, i) => (
          <div key={i} className="flex gap-2 mb-3 items-start">
            <div className="flex-1">
              {p.src && (
                <div className="mb-1.5 h-16 rounded-lg overflow-hidden">
                  <img src={p.src} className="w-full h-full object-cover" alt="" />
                </div>
              )}
              <input
                type="text"
                value={p.src}
                onChange={(e) => updatePhoto(i, e.target.value)}
                placeholder="/genesis-2.jpg o https://..."
                className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ background: "#FFFFFF", border: "1px solid rgba(200,168,137,0.35)", color: "#2C1A0A", "--tw-ring-color": "#C8A889" } as React.CSSProperties}
              />
            </div>
            <button
              onClick={() => removePhoto(i)}
              className="mt-1 w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-50 shrink-0"
              style={{ color: "#B09070", border: "1px solid rgba(200,168,137,0.25)" }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={addPhoto}
          className="w-full mt-2 py-3 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
          style={{ borderColor: "#C8A889", color: "#8A6B52" }}
        >
          <Plus size={14} /> Agregar foto
        </button>
      </Card>
    </div>
  );
}
