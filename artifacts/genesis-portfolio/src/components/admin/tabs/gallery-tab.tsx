import { useContent, GalleryVideo } from "@/context/content-context";
import { supabase } from "@/lib/supabase";
import { X, Plus } from "lucide-react";
import { Field, Card, inputBase } from "@/components/admin/shared";
import { useState } from "react";

export default function GalleryTab() {
  const { content, updateContent } = useContent();
  const [uploadingVideo, setUploadingVideo] = useState<{ [key: number]: boolean }>({});
  const [uploadingPhoto, setUploadingPhoto] = useState<{ [key: number]: boolean }>({});

  const handleVideoUpload = async (idx: number, file: File) => {
    setUploadingVideo(prev => ({ ...prev, [idx]: true }));
    
    try {
      // Crear nombre de archivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `gallery/videos/${fileName}`;

      // Subir a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery-media')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error subiendo video:', uploadError);
        // Fallback a base64 si falla la subida
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          updateVideo(idx, "src", base64String);
        };
        reader.readAsDataURL(file);
        return;
      }

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-media')
        .getPublicUrl(filePath);

      updateVideo(idx, "src", publicUrl);
    } catch (error) {
      console.error('Error en la subida:', error);
      // Fallback a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateVideo(idx, "src", base64String);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingVideo(prev => ({ ...prev, [idx]: false }));
    }
  };

  const handlePhotoUpload = async (idx: number, file: File) => {
    setUploadingPhoto(prev => ({ ...prev, [idx]: true }));
    
    try {
      // Crear nombre de archivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `gallery/photos/${fileName}`;

      // Subir a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery-media')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error subiendo foto:', uploadError);
        // Fallback a base64 si falla la subida
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          updatePhoto(idx, base64String);
        };
        reader.readAsDataURL(file);
        return;
      }

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-media')
        .getPublicUrl(filePath);

      updatePhoto(idx, publicUrl);
    } catch (error) {
      console.error('Error en la subida:', error);
      // Fallback a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updatePhoto(idx, base64String);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingPhoto(prev => ({ ...prev, [idx]: false }));
    }
  };

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
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="file"
                    accept={v.type === "video" ? "video/*,image/*" : "image/*"}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleVideoUpload(i, file);
                    }}
                    disabled={uploadingVideo[i]}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-2 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold disabled:opacity-50"
                    style={{
                      ...inputBase,
                      "--tw-ring-color": "#C8A889",
                      "file:bg": "#5C3C2C",
                      "file:text": "#FAF8F5"
                    } as React.CSSProperties}
                  />
                  {uploadingVideo[i] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs" style={{ color: "#5C3C2C" }}>Subiendo...</span>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => updateVideo(i, "src", "")}
                  className="px-3 py-2.5 rounded-xl text-xs font-medium transition-colors hover:bg-red-50 flex items-center gap-1"
                  style={{
                    color: "#B09070",
                    border: "1px solid rgba(200,168,137,0.25)"
                  }}
                >
                  <X size={12} />
                  Limpiar
                </button>
              </div>
              <Field
                label="O URL del archivo (opcional)"
                value={v.src && !v.src.startsWith('data:') && !v.src.startsWith('blob:') ? v.src : ""}
                onChange={(val) => updateVideo(i, "src", val)}
                placeholder="/genesis-video-1.mov o https://..."
              />
            </div>
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
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handlePhotoUpload(i, file);
                      }}
                      disabled={uploadingPhoto[i]}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold disabled:opacity-50"
                      style={{
                        ...inputBase,
                        "--tw-ring-color": "#C8A889",
                        "file:bg": "#5C3C2C",
                        "file:text": "#FAF8F5"
                      } as React.CSSProperties}
                    />
                    {uploadingPhoto[i] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs" style={{ color: "#5C3C2C" }}>Subiendo...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => updatePhoto(i, "")}
                    className="mt-1 px-3 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-red-50 flex items-center gap-1"
                    style={{
                      color: "#B09070",
                      border: "1px solid rgba(200,168,137,0.25)"
                    }}
                  >
                    <X size={12} />
                    Limpiar
                  </button>
                </div>
                <Field
                  label="O URL de la foto (opcional)"
                  value={p.src && !p.src.startsWith('data:') && !p.src.startsWith('blob:') ? p.src : ""}
                  onChange={(v) => updatePhoto(i, v)}
                  placeholder="/genesis-2.jpg o https://..."
                />
              </div>
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
