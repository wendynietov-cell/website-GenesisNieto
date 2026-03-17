import React, { useState } from "react";
import { useContent, Favorite } from "@/context/content-context";
import { supabase } from "@/lib/supabase";
import { X, Plus } from "lucide-react";
import { Field, Card, inputBase } from "@/components/admin/shared";

export default function FavoritesTab() {
  const { content, updateContent } = useContent();
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});

  const updateItem = (idx: number, key: keyof Favorite, val: string) =>
    updateContent((prev) => {
      const items = prev.favorites.items.map((f, i) =>
        i === idx ? { ...f, [key]: val } : f
      );
      return { ...prev, favorites: { ...prev.favorites, items } };
    });
  const addItem = () =>
    updateContent((prev) => ({
      ...prev,
      favorites: {
        ...prev.favorites,
        items: [...prev.favorites.items, { category: "", img: "", productName: "" }],
      },
    }));
  const removeItem = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      favorites: {
        ...prev.favorites,
        items: prev.favorites.items.filter((_, i) => i !== idx),
      },
    }));

  const handleImageUpload = async (idx: number, file: File) => {
    setUploading(prev => ({ ...prev, [idx]: true }));

    try {
      // Crear nombre de archivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `favorites/${fileName}`;

      // Subir a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('favorites-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error subiendo imagen:', uploadError);
        // Fallback a base64 si falla la subida
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          updateItem(idx, "img", base64String);
        };
        reader.readAsDataURL(file);
        return;
      }

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('favorites-images')
        .getPublicUrl(filePath);

      updateItem(idx, "img", publicUrl);
    } catch (error) {
      console.error('Error en la subida:', error);
      // Fallback a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateItem(idx, "img", base64String);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(prev => ({ ...prev, [idx]: false }));
    }
  };

  return (
    <div>
      <Card title="Encabezado de sección">
        <Field
          label="Título de la sección"
          value={content.favorites.sectionTitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, favorites: { ...p.favorites, sectionTitle: v } }))
          }
        />
        <Field
          label="Subtítulo"
          value={content.favorites.sectionSubtitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, favorites: { ...p.favorites, sectionSubtitle: v } }))
          }
        />
      </Card>
      {content.favorites.items.map((f, i) => (
        <div key={i} className="relative">
          <button
            onClick={() => removeItem(i)}
            className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-red-100"
            style={{ color: "#B09070" }}
          >
            <X size={14} />
          </button>
          <Card title={`Favorito ${i + 1}`}>
            {f.img && (
              <div className="mb-3 rounded-xl overflow-hidden h-32 w-full">
                <img src={f.img} alt={f.category} className="w-full h-full object-cover" />
              </div>
            )}
            <Field
              label="Categoría (ej: Skincare)"
              value={f.category}
              onChange={(v) => updateItem(i, "category", v)}
            />
            <Field
              label="Nombre del producto (opcional)"
              value={f.productName}
              onChange={(v) => updateItem(i, "productName", v)}
              placeholder="ej: Proteína Whey Isolate..."
            />
            <div className="mb-4">
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "#8A6B52" }}
              >
                Imagen del producto
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(i, file);
                      }}
                      disabled={uploading[i]}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-2 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold disabled:opacity-50"
                      style={{
                        ...inputBase,
                        "--tw-ring-color": "#C8A889",
                        "file:bg": "#5C3C2C",
                        "file:text": "#FAF8F5"
                      } as React.CSSProperties}
                    />
                    {uploading[i] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs" style={{ color: "#5C3C2C" }}>Subiendo...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => updateItem(i, "img", "")}
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
                  label="O URL de imagen (opcional)"
                  value={f.img && !f.img.startsWith('data:') && !f.img.startsWith('blob:') ? f.img : ""}
                  onChange={(v) => updateItem(i, "img", v)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </Card>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
        style={{ borderColor: "#C8A889", color: "#8A6B52" }}
      >
        <Plus size={14} /> Agregar favorito
      </button>
    </div>
  );
}
