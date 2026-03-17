import { useContent, GalleryVideo } from "@/context/content-context";
import { supabase } from "@/lib/supabase";
import { X, Plus, Upload, Link, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { Field, Card, inputBase } from "@/components/admin/shared";
import { useState } from "react";

export default function GalleryTab() {
  const { content, updateContent } = useContent();
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  const handleFileUpload = async (idx: number, file: File, type: 'video' | 'photo') => {
    const uploadKey = `${type}-${idx}`;
    setUploading(prev => ({ ...prev, [uploadKey]: true }));
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `gallery/${type === 'video' ? 'videos' : 'photos'}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-media')
        .getPublicUrl(filePath);

      if (type === 'video') updateVideo(idx, "src", publicUrl);
      else updatePhoto(idx, publicUrl);
      
    } catch (error) {
      console.error('Error:', error);
      // Opcional: Añadir aquí una notificación de error para el usuario
    } finally {
      setUploading(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  // --- Funciones de estado (se mantienen igual que tu lógica original) ---
  const updateVideo = (idx: number, key: keyof GalleryVideo, val: string) =>
    updateContent((prev) => ({
      ...prev,
      gallery: { 
        ...prev.gallery, 
        videos: prev.gallery.videos.map((v, i) => i === idx ? { ...v, [key]: val } : v) 
      }
    }));

  const toggleVideoType = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      gallery: { 
        ...prev.gallery, 
        videos: prev.gallery.videos.map((v, i) => i === idx ? { ...v, type: v.type === "video" ? "photo" : "video" } : v) 
      }
    }));

  const updatePhoto = (idx: number, val: string) =>
    updateContent((prev) => ({
      ...prev,
      gallery: { ...prev.gallery, photos: prev.gallery.photos.map((p, i) => i === idx ? { src: val } : p) }
    }));

  const addItem = (type: 'video' | 'photo') => 
    updateContent(prev => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        [type === 'video' ? 'videos' : 'photos']: [
          ...prev.gallery[type === 'video' ? 'videos' : 'photos'],
          type === 'video' ? { type: "video", src: "" } : { src: "" }
        ]
      }
    }));

  const removeItem = (type: 'video' | 'photo', idx: number) =>
    updateContent(prev => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        [type === 'video' ? 'videos' : 'photos']: prev.gallery[type === 'video' ? 'videos' : 'photos'].filter((_, i) => i !== idx)
      }
    }));

  return (
    <div className="space-y-8">
      {/* SECCIÓN TÍTULO */}
      <Card title="Configuración General">
        <Field
          label="Título de la Sección"
          value={content.gallery.sectionTitle}
          onChange={(v) => updateContent(p => ({ ...p, gallery: { ...p.gallery, sectionTitle: v } }))}
        />
      </Card>

      {/* SECCIÓN VIDEOS/MIXTA */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: "#5C3C2C" }}>Galería Principal (Videos/Fotos)</h3>
          <button 
            onClick={() => addItem('video')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-[#5C3C2C] text-white hover:opacity-90 transition-all"
          >
            <Plus size={16} /> Agregar Media
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.gallery.videos.map((v, i) => (
            <div key={i} className="group relative bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
              {/* Preview Area */}
              <div className="relative aspect-video bg-stone-100 overflow-hidden">
                {v.src ? (
                  v.type === "video" ? (
                    <video src={v.src} className="w-full h-full object-cover" />
                  ) : (
                    <img src={v.src} className="w-full h-full object-cover" alt="" />
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 gap-2">
                    {v.type === "video" ? <VideoIcon size={32} /> : <ImageIcon size={32} />}
                    <span className="text-xs font-medium">Sin contenido</span>
                  </div>
                )}
                
                {/* Floating Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  <button 
                    onClick={() => toggleVideoType(i)}
                    className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur shadow-sm text-[#5C3C2C]"
                  >
                    {v.type}
                  </button>
                </div>

                <button 
                  onClick={() => removeItem('video', i)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Form Area */}
              <div className="p-4 space-y-3 flex-1">
                <div className="relative">
                  <input
                    type="file"
                    id={`file-v-${i}`}
                    className="hidden"
                    accept={v.type === "video" ? "video/*" : "image/*"}
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(i, e.target.files[0], 'video')}
                  />
                  <label 
                    htmlFor={`file-v-${i}`}
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border-2 border-dashed border-stone-200 text-stone-500 text-xs font-medium cursor-pointer hover:border-[#C8A889] hover:text-[#8A6B52] transition-all"
                  >
                    {uploading[`video-${i}`] ? "Subiendo..." : <><Upload size={14}/> Subir Archivo</>}
                  </label>
                </div>

                <div className="space-y-2">
                   <Field 
                    label="URL o Ruta" 
                    value={v.src} 
                    onChange={(val) => updateVideo(i, "src", val)}
                    placeholder="/video.mp4"
                   />
                   <Field 
                    label="Categoría" 
                    value={v.category ?? ""} 
                    onChange={(val) => updateVideo(i, "category", val)}
                    placeholder="Ej: Fitness"
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN FOTOGRAFÍAS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: "#5C3C2C" }}>Tab Fotografías</h3>
          <button 
            onClick={() => addItem('photo')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#C8A889] text-[#8A6B52] hover:bg-stone-50"
          >
            <Plus size={16} /> Añadir Foto
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {content.gallery.photos.map((p, i) => (
            <div key={i} className="group relative bg-white p-2 rounded-xl border border-stone-200">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-stone-100 mb-2">
                {p.src ? (
                  <img src={p.src} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300">
                    <ImageIcon size={24} />
                  </div>
                )}
                <button 
                  onClick={() => removeItem('photo', i)}
                  className="absolute top-1 right-1 p-1 rounded-md bg-white/90 text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
              
              <input
                type="file"
                id={`file-p-${i}`}
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(i, e.target.files[0], 'photo')}
              />
              <div className="flex gap-1">
                <label 
                  htmlFor={`file-p-${i}`}
                  className="flex-1 flex items-center justify-center p-1.5 rounded bg-stone-100 text-stone-600 hover:bg-[#C8A889] hover:text-white transition-colors cursor-pointer"
                >
                  <Upload size={14} />
                </label>
                <button 
                  onClick={() => {
                    const url = prompt("Pega la URL de la imagen:", p.src);
                    if (url !== null) updatePhoto(i, url);
                  }}
                  className="flex-1 flex items-center justify-center p-1.5 rounded bg-stone-100 text-stone-600 hover:bg-stone-200"
                >
                  <Link size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}