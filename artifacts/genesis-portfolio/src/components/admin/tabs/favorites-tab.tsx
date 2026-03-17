import React, { useState } from "react";
import { useContent, Favorite } from "@/context/content-context";
import { supabase } from "@/lib/supabase";
import { X, Plus, Upload, Tag, Package, ChevronDown } from "lucide-react";
import { Field, Card } from "@/components/admin/shared";

// Categorías unificadas para consistencia
const CATEGORIES = ["Skincare", "Makeup", "Fitness", "Wellness", "Gastro"];

export default function FavoritesTab() {
  const { content, updateContent } = useContent();
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});

  const updateItem = (idx: number, key: keyof Favorite, val: string) =>
    updateContent((prev) => ({
      ...prev,
      favorites: {
        ...prev.favorites,
        items: prev.favorites.items.map((f, i) => (i === idx ? { ...f, [key]: val } : f)),
      },
    }));

  const addItem = () =>
    updateContent((prev) => ({
      ...prev,
      favorites: {
        ...prev.favorites,
        items: [...prev.favorites.items, { category: CATEGORIES[0], img: "", productName: "" }],
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
    setUploading((prev) => ({ ...prev, [idx]: true }));
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `favorites/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("favorites-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("favorites-images")
        .getPublicUrl(filePath);

      updateItem(idx, "img", publicUrl);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUploading((prev) => ({ ...prev, [idx]: false }));
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <Card title="Sección Favoritos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Título Principal"
            value={content.favorites.sectionTitle}
            onChange={(v) => updateContent(p => ({ ...p, favorites: { ...p.favorites, sectionTitle: v } }))}
          />
          <Field
            label="Subtítulo"
            value={content.favorites.sectionSubtitle}
            onChange={(v) => updateContent(p => ({ ...p, favorites: { ...p.favorites, sectionSubtitle: v } }))}
          />
        </div>
      </Card>

      {/* PRODUCT GRID */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#5C3C2C] flex items-center gap-2">
            <Package size={20} /> Mis Favoritos
          </h3>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white shadow-lg transition-transform active:scale-95 bg-[#5C3C2C] hover:bg-[#3D281D]"
          >
            <Plus size={18} /> Nuevo Producto
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {content.favorites.items.map((f, i) => (
            <div key={i} className="group bg-white rounded-[2.5rem] border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              
              {/* Image Container */}
              <div className="relative aspect-square bg-stone-100 overflow-hidden">
                {f.img ? (
                  <img src={f.img} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300">
                    <Tag size={48} strokeWidth={1} />
                  </div>
                )}
                
                {/* Botón Eliminar */}
                <button
                  onClick={() => removeItem(i)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <X size={14} />
                </button>

                {/* Subida rápida al hacer hover */}
                <label className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(i, e.target.files[0])}
                  />
                  <div className="bg-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 text-[#5C3C2C] shadow-xl">
                    <Upload size={14} /> {uploading[i] ? "Subiendo..." : "Cambiar Imagen"}
                  </div>
                </label>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-4">
                {/* SELECT CATEGORÍA */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A889]">Categoría</label>
                  <div className="relative">
                    <select
                      value={f.category}
                      onChange={(e) => updateItem(i, "category", e.target.value)}
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-sm font-medium text-[#5C3C2C] appearance-none focus:ring-2 focus:ring-[#C8A889] outline-none cursor-pointer"
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A889]">Producto</label>
                  <input
                    type="text"
                    value={f.productName}
                    onChange={(e) => updateItem(i, "productName", e.target.value)}
                    placeholder="Ej: Suero de Vitamina C"
                    className="w-full bg-transparent border-b border-stone-100 py-1 text-sm outline-none focus:border-[#C8A889] transition-colors font-medium text-[#5C3C2C]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}