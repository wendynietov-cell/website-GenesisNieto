import { useState } from "react";
import { useContent, SiteContent, MethodStep, Testimonial, Favorite, GalleryVideo, GalleryPhoto, Brand } from "@/context/content-context";
import {
  Lock, Eye, EyeOff, Save, RotateCcw, ChevronRight, ExternalLink, Check, X,
  Home, Film, Package, Zap, MessageSquare, Star, Handshake, Mail, Tag, Layout,
  FileText, Plus, Download, LogOut, Menu
} from "lucide-react";

const ADMIN_PASSWORD = "genesis2025";
const AUTH_KEY = "genesis_admin_auth";

function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

/* ─────────────────────────────────────────────
   LOGIN SCREEN
───────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError(true);
      setPw("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #FAF8F5 0%, #EFE3D7 50%, #D7B899 100%)" }}
    >
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-10">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(200,168,137,0.4)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Lock size={22} style={{ color: "#5C3C2C" }} />
          </div>
          <h1 className="text-3xl font-heading mb-2" style={{ color: "#5C3C2C" }}>
            Panel de Génesis
          </h1>
          <p className="text-sm" style={{ color: "#8A6B52" }}>
            Ingresa tu contraseña para editar el contenido
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className="rounded-3xl p-8 shadow-xl"
            style={{
              background: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(200,168,137,0.35)",
            }}
          >
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: "#5C3C2C" }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="••••••••••"
                  className={`w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200 ${error ? "ring-2 ring-red-400" : "focus:ring-2"}`}
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(200,168,137,0.4)",
                    color: "#5C3C2C",
                    "--tw-ring-color": "#C8A889",
                  } as React.CSSProperties}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-opacity hover:opacity-70"
                  style={{ color: "#8A6B52" }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-2">
                  Contraseña incorrecta. Inténtalo de nuevo.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#5C3C2C", color: "#FAF8F5" }}
            >
              Ingresar al Panel
            </button>
          </div>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "#B09070" }}>
          <a href="/" className="hover:underline">
            ← Volver al sitio
          </a>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TYPES & TAB DEFINITIONS
───────────────────────────────────────────── */
type TabId =
  | "hero"
  | "gallery"
  | "services"
  | "method"
  | "testimonials"
  | "favorites"
  | "collabs"
  | "contact"
  | "brands"
  | "cv";

interface SidebarTab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const CONTENT_TABS: SidebarTab[] = [
  { id: "hero", label: "Portada", icon: <Home size={16} /> },
  { id: "gallery", label: "Galería", icon: <Film size={16} /> },
  { id: "services", label: "Servicios", icon: <Package size={16} /> },
  { id: "method", label: "El Proceso", icon: <Zap size={16} /> },
  { id: "testimonials", label: "Testimonios", icon: <MessageSquare size={16} /> },
  { id: "favorites", label: "Favoritos", icon: <Star size={16} /> },
  { id: "collabs", label: "Colaboraciones", icon: <Handshake size={16} /> },
  { id: "contact", label: "Contacto", icon: <Mail size={16} /> },
  { id: "brands", label: "Marcas", icon: <Tag size={16} /> },
];

const TOOL_TABS: SidebarTab[] = [
  { id: "cv", label: "Hoja de Vida", icon: <FileText size={16} /> },
];

const ALL_TABS: SidebarTab[] = [...CONTENT_TABS, ...TOOL_TABS];

/* ─────────────────────────────────────────────
   SHARED UI PRIMITIVES
───────────────────────────────────────────── */
const inputBase: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid rgba(200,168,137,0.35)",
  color: "#2C1A0A",
};

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
        style={{ color: "#8A6B52" }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
          style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-2"
          style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
        />
      )}
    </div>
  );
}

function Card({ title, children, cols2 = false }: { title?: string; children: React.ReactNode; cols2?: boolean }) {
  return (
    <div
      className="rounded-2xl p-5 md:p-7 mb-5 shadow-sm"
      style={{ background: "#FFFFFF", border: "1px solid rgba(200,168,137,0.25)" }}
    >
      {title && (
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-5"
          style={{ color: "#C3A27A" }}
        >
          {title}
        </h3>
      )}
      {cols2 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">{children}</div>
      ) : children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   EXISTING TAB COMPONENTS
───────────────────────────────────────────── */
function HeroTab() {
  const { content, updateContent } = useContent();
  const u = (key: keyof SiteContent["hero"], val: string) =>
    updateContent((prev) => ({ ...prev, hero: { ...prev.hero, [key]: val } }));
  return (
    <div>
      <Card title="Textos principales" cols2>
        <Field label="Tu nombre" value={content.hero.name} onChange={(v) => u("name", v)} />
        <Field label="Subtítulo / Rol" value={content.hero.subtitle} onChange={(v) => u("subtitle", v)} />
        <div className="md:col-span-2">
          <Field label="Biografía" value={content.hero.bio} onChange={(v) => u("bio", v)} multiline placeholder="Cuéntale a las marcas quién eres..." />
        </div>
        <div className="md:col-span-2">
          <Field label="Frase de impacto (tagline)" value={content.hero.tagline} onChange={(v) => u("tagline", v)} multiline />
        </div>
      </Card>
      <Card title="Botones">
        <Field
          label="Texto botón principal"
          value={content.hero.ctaPrimary}
          onChange={(v) => u("ctaPrimary", v)}
        />
        <Field
          label="Texto botón secundario"
          value={content.hero.ctaSecondary}
          onChange={(v) => u("ctaSecondary", v)}
        />
      </Card>
    </div>
  );
}

function ServicesTab() {
  const { content, updateContent } = useContent();
  const update = (side: "onsite" | "remote", key: string, val: string) =>
    updateContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [side]: { ...prev.services[side], [key]: val },
      },
    }));
  const updateFeature = (side: "onsite" | "remote", idx: number, val: string) =>
    updateContent((prev) => {
      const features = [...prev.services[side].features];
      features[idx] = val;
      return {
        ...prev,
        services: { ...prev.services, [side]: { ...prev.services[side], features } },
      };
    });

  const renderService = (side: "onsite" | "remote", label: string) => {
    const s = content.services[side];
    return (
      <Card title={label}>
        <Field label="Título" value={s.title} onChange={(v) => update(side, "title", v)} />
        <Field label="Subtítulo" value={s.subtitle} onChange={(v) => update(side, "subtitle", v)} />
        <Field
          label="Descripción"
          value={s.description}
          onChange={(v) => update(side, "description", v)}
          multiline
        />
        <div className="mb-4">
          <label
            className="block text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "#8A6B52" }}
          >
            Características incluidas
          </label>
          {s.features.map((f, i) => (
            <input
              key={i}
              type="text"
              value={f}
              onChange={(e) => updateFeature(side, i, e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-2 transition-all focus:ring-2"
              style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
            />
          ))}
        </div>
        <Field
          label="Texto del botón"
          value={s.cta}
          onChange={(v) => update(side, "cta", v)}
        />
      </Card>
    );
  };

  return (
    <div>
      <Card title="Encabezado de sección">
        <Field
          label="Título de la sección"
          value={content.services.sectionTitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, services: { ...p.services, sectionTitle: v } }))
          }
        />
        <Field
          label="Subtítulo"
          value={content.services.sectionSubtitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, services: { ...p.services, sectionSubtitle: v } }))
          }
        />
      </Card>
      {renderService("onsite", "Servicio On-Site")}
      {renderService("remote", "Servicio Remoto")}
    </div>
  );
}

function MethodTab() {
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

function TestimonialsTab() {
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

function FavoritesTab() {
  const { content, updateContent } = useContent();
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
    // Crear una URL temporal para previsualización
    const tempUrl = URL.createObjectURL(file);
    updateItem(idx, "img", tempUrl);

    // Aquí podrías implementar la subida a un servicio como Supabase Storage
    // Por ahora, convertimos a base64 para almacenamiento local
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      updateItem(idx, "img", base64String);
    };
    reader.readAsDataURL(file);
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(i, file);
                    }}
                    className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-2 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold"
                    style={{ 
                      ...inputBase, 
                      "--tw-ring-color": "#C8A889",
                      "file:bg": "#5C3C2C",
                      "file:text": "#FAF8F5"
                    } as React.CSSProperties}
                  />
                  <button
                    onClick={() => updateItem(i, "img", "")}
                    className="px-3 py-2.5 rounded-xl text-xs font-medium transition-colors hover:bg-red-50"
                    style={{ 
                      color: "#B09070", 
                      border: "1px solid rgba(200,168,137,0.25)" 
                    }}
                  >
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

function CollabsTab() {
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

function ContactTab() {
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

function BrandsTab() {
  const { content, updateContent } = useContent();

  const updateBrand = (idx: number, key: keyof Brand, val: string) =>
    updateContent((prev) => {
      const items = prev.brands.items.map((b, i) =>
        i === idx ? { ...b, [key]: val } : b
      );
      return { ...prev, brands: { ...prev.brands, items } };
    });

  const addBrand = () =>
    updateContent((prev) => ({
      ...prev,
      brands: {
        ...prev.brands,
        items: [...prev.brands.items, { name: "", category: "", tab: "marcas" as const }],
      },
    }));

  const removeBrand = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      brands: { ...prev.brands, items: prev.brands.items.filter((_, i) => i !== idx) },
    }));

  const selectStyle: React.CSSProperties = {
    ...inputBase,
    cursor: "pointer",
    "--tw-ring-color": "#C8A889",
  } as React.CSSProperties;

  return (
    <div>
      <Card title="Encabezado">
        <Field
          label="Título"
          value={content.brands.sectionTitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, brands: { ...p.brands, sectionTitle: v } }))
          }
        />
        <Field
          label="Subtítulo"
          value={content.brands.sectionSubtitle}
          onChange={(v) =>
            updateContent((p) => ({ ...p, brands: { ...p.brands, sectionSubtitle: v } }))
          }
        />
      </Card>

      <Card title="Lista de marcas">
        <p className="text-xs mb-4" style={{ color: "#B09070" }}>
          Cada marca aparece en el tab correspondiente. La categoría se muestra debajo del nombre.
        </p>
        {content.brands.items.map((b, i) => (
          <div
            key={i}
            className="mb-4 p-3 rounded-xl"
            style={{ background: "#F7F5F2", border: "1px solid rgba(200,168,137,0.2)" }}
          >
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={b.name}
                onChange={(e) => updateBrand(i, "name", e.target.value)}
                placeholder="Nombre de la marca"
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
              />
              <button
                onClick={() => removeBrand(i)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-red-50 shrink-0"
                style={{ color: "#B09070", border: "1px solid rgba(200,168,137,0.25)" }}
              >
                <X size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={b.category}
                onChange={(e) => updateBrand(i, "category", e.target.value)}
                placeholder="Categoría (ej: Skincare)"
                className="px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
              />
              <select
                value={b.tab ?? "marcas"}
                onChange={(e) => updateBrand(i, "tab", e.target.value)}
                className="px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={selectStyle}
              >
                <option value="marcas">Marcas</option>
                <option value="empresas">Empresas</option>
                <option value="lugares">Lugares</option>
              </select>
            </div>
          </div>
        ))}
        <button
          onClick={addBrand}
          className="w-full mt-1 py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
          style={{ borderColor: "#C8A889", color: "#8A6B52" }}
        >
          <Plus size={14} /> Agregar marca
        </button>
      </Card>
    </div>
  );
}

function GalleryTab() {
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
                style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
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

/* ─────────────────────────────────────────────
   CV TAB — HOJA DE VIDA
───────────────────────────────────────────── */
interface CvExperience {
  empresa: string;
  rol: string;
  periodo: string;
  descripcion: string;
}

interface CvEducacion {
  institucion: string;
  titulo: string;
  anio: string;
}

interface CvServicio {
  nombre: string;
  precio: string;
}

interface CvData {
  nombre: string;
  titulo: string;
  email: string;
  telefono: string;
  ciudad: string;
  instagram: string;
  website: string;
  perfil: string;
  experiencia: CvExperience[];
  educacion: CvEducacion[];
  habilidades: string;
  servicios: CvServicio[];
}

const defaultCv: CvData = {
  nombre: "Génesis Nieto",
  titulo: "Content Creator & UGC Specialist",
  email: "hola@genesisnieto.com",
  telefono: "+57 300 000 0000",
  ciudad: "Bogotá, Colombia",
  instagram: "@genesis_nieto",
  website: "genesisnieto.com",
  perfil:
    "Creadora de contenido especializada en UGC (User Generated Content) con experiencia en las verticales de fitness, beauty, gastronomía y lifestyle. Trabajo con marcas para crear contenido auténtico que conecta, convierte y construye comunidad.",
  experiencia: [
    {
      empresa: "Freelance — UGC Creator",
      rol: "Content Creator",
      periodo: "2022 – Presente",
      descripcion:
        "Creación de contenido UGC para marcas nacionales e internacionales en Instagram, TikTok y plataformas de e-commerce.",
    },
  ],
  educacion: [
    {
      institucion: "Universidad Nacional",
      titulo: "Comunicación Social",
      anio: "2021",
    },
  ],
  habilidades: "UGC, Fotografía, Video, Edición, Copywriting, Lifestyle, Fitness, Beauty",
  servicios: [
    { nombre: "Pack UGC On-Site (1 día)", precio: "USD 350 – 500" },
    { nombre: "Contenido Remoto (3 videos)", precio: "USD 150 – 250" },
  ],
};

function CvPreview({ cv }: { cv: CvData }) {
  const tags = cv.habilidades
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <>
      {/* Print styles — injected inline so they travel with the component */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #cv-preview-print, #cv-preview-print * { visibility: visible !important; }
          #cv-preview-print { position: fixed; top: 0; left: 0; width: 100%; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <div
        id="cv-preview-print"
        style={{
          width: "595px",
          minHeight: "842px",
          background: "#FFFFFF",
          fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
          fontSize: "11px",
          color: "#2C1A0A",
          boxSizing: "border-box",
          padding: "48px 44px",
          lineHeight: 1.5,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "30px",
              fontWeight: 600,
              color: "#2C1A0A",
              margin: "0 0 4px",
              letterSpacing: "-0.5px",
            }}
          >
            {cv.nombre || "Tu Nombre"}
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "14px",
              color: "#8A6B52",
              margin: "0 0 16px",
              fontStyle: "italic",
            }}
          >
            {cv.titulo}
          </p>

          {/* Contact row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 20px",
              fontSize: "10px",
              color: "#8A6B52",
            }}
          >
            {cv.email && <span>{cv.email}</span>}
            {cv.telefono && <span>{cv.telefono}</span>}
            {cv.ciudad && <span>{cv.ciudad}</span>}
            {cv.instagram && <span>{cv.instagram}</span>}
            {cv.website && <span>{cv.website}</span>}
          </div>
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, #C8A889 0%, #C3A27A 60%, transparent 100%)",
            marginBottom: "24px",
            borderRadius: "2px",
          }}
        />

        {/* Perfil */}
        {cv.perfil && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 8px",
              }}
            >
              Perfil Profesional
            </h2>
            <p style={{ color: "#3a2519", lineHeight: 1.7 }}>{cv.perfil}</p>
          </div>
        )}

        {/* Experiencia */}
        {cv.experiencia.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px",
                borderBottom: "1px solid rgba(200,168,137,0.35)",
                paddingBottom: "4px",
              }}
            >
              Experiencia
            </h2>
            {cv.experiencia.map((e, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ color: "#2C1A0A", fontSize: "11px" }}>
                    {e.empresa}
                  </strong>
                  <span style={{ color: "#B09070", fontSize: "10px", flexShrink: 0, marginLeft: "8px" }}>
                    {e.periodo}
                  </span>
                </div>
                {e.rol && (
                  <p style={{ color: "#8A6B52", fontSize: "10px", margin: "1px 0 4px", fontStyle: "italic" }}>
                    {e.rol}
                  </p>
                )}
                {e.descripcion && (
                  <p style={{ color: "#3a2519", lineHeight: 1.6, margin: 0 }}>
                    {e.descripcion}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Educacion */}
        {cv.educacion.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px",
                borderBottom: "1px solid rgba(200,168,137,0.35)",
                paddingBottom: "4px",
              }}
            >
              Educación
            </h2>
            {cv.educacion.map((ed, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ color: "#2C1A0A", fontSize: "11px" }}>
                    {ed.institucion}
                  </strong>
                  <span style={{ color: "#B09070", fontSize: "10px", flexShrink: 0, marginLeft: "8px" }}>
                    {ed.anio}
                  </span>
                </div>
                {ed.titulo && (
                  <p style={{ color: "#8A6B52", fontSize: "10px", margin: "1px 0 0", fontStyle: "italic" }}>
                    {ed.titulo}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Habilidades */}
        {tags.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px",
                borderBottom: "1px solid rgba(200,168,137,0.35)",
                paddingBottom: "4px",
              }}
            >
              Habilidades
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "20px",
                    background: "rgba(200,168,137,0.15)",
                    border: "1px solid rgba(200,168,137,0.4)",
                    color: "#5C3C2C",
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Servicios */}
        {cv.servicios.length > 0 && (
          <div style={{ marginBottom: "8px" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "#5C3C2C",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px",
                borderBottom: "1px solid rgba(200,168,137,0.35)",
                paddingBottom: "4px",
              }}
            >
              Servicios y Tarifas
            </h2>
            {cv.servicios.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 0",
                  borderBottom: i < cv.servicios.length - 1 ? "1px solid rgba(200,168,137,0.2)" : "none",
                }}
              >
                <span style={{ color: "#2C1A0A", fontWeight: 500 }}>{s.nombre}</span>
                <span
                  style={{
                    color: "#5C3C2C",
                    fontWeight: 600,
                    fontSize: "11px",
                    background: "rgba(200,168,137,0.12)",
                    padding: "2px 8px",
                    borderRadius: "8px",
                    flexShrink: 0,
                    marginLeft: "12px",
                  }}
                >
                  {s.precio}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function CvTab() {
  const [cv, setCv] = useState<CvData>(defaultCv);

  const u = (key: keyof CvData, val: string) =>
    setCv((prev) => ({ ...prev, [key]: val }));

  /* Experience helpers */
  const updateExp = (idx: number, key: keyof CvExperience, val: string) =>
    setCv((prev) => {
      const experiencia = prev.experiencia.map((e, i) =>
        i === idx ? { ...e, [key]: val } : e
      );
      return { ...prev, experiencia };
    });
  const addExp = () =>
    setCv((prev) => ({
      ...prev,
      experiencia: [
        ...prev.experiencia,
        { empresa: "", rol: "", periodo: "", descripcion: "" },
      ],
    }));
  const removeExp = (idx: number) =>
    setCv((prev) => ({
      ...prev,
      experiencia: prev.experiencia.filter((_, i) => i !== idx),
    }));

  /* Education helpers */
  const updateEdu = (idx: number, key: keyof CvEducacion, val: string) =>
    setCv((prev) => {
      const educacion = prev.educacion.map((e, i) =>
        i === idx ? { ...e, [key]: val } : e
      );
      return { ...prev, educacion };
    });
  const addEdu = () =>
    setCv((prev) => ({
      ...prev,
      educacion: [...prev.educacion, { institucion: "", titulo: "", anio: "" }],
    }));
  const removeEdu = (idx: number) =>
    setCv((prev) => ({
      ...prev,
      educacion: prev.educacion.filter((_, i) => i !== idx),
    }));

  /* Services helpers */
  const updateSvc = (idx: number, key: keyof CvServicio, val: string) =>
    setCv((prev) => {
      const servicios = prev.servicios.map((s, i) =>
        i === idx ? { ...s, [key]: val } : s
      );
      return { ...prev, servicios };
    });
  const addSvc = () =>
    setCv((prev) => ({
      ...prev,
      servicios: [...prev.servicios, { nombre: "", precio: "" }],
    }));
  const removeSvc = (idx: number) =>
    setCv((prev) => ({
      ...prev,
      servicios: prev.servicios.filter((_, i) => i !== idx),
    }));

  const handlePrint = () => window.print();

  const subFieldStyle: React.CSSProperties = {
    ...inputBase,
    fontSize: "13px",
    padding: "8px 12px",
    borderRadius: "10px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div className="flex gap-6" style={{ alignItems: "flex-start" }}>
      {/* ── LEFT: FORM ── */}
      <div style={{ width: "45%", flexShrink: 0 }}>
        {/* Download button */}
        <button
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold mb-5 transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: "#5C3C2C", color: "#FAF8F5" }}
        >
          <Download size={15} />
          Descargar PDF (Imprimir)
        </button>

        {/* Información Personal */}
        <Card title="Información Personal">
          <Field label="Nombre completo" value={cv.nombre} onChange={(v) => u("nombre", v)} />
          <Field
            label="Título profesional"
            value={cv.titulo}
            onChange={(v) => u("titulo", v)}
            placeholder="ej: Content Creator & UGC Specialist"
          />
          <Field label="Email" value={cv.email} onChange={(v) => u("email", v)} placeholder="hola@tudominio.com" />
          <Field label="Teléfono" value={cv.telefono} onChange={(v) => u("telefono", v)} placeholder="+57 300..." />
          <Field label="Ciudad" value={cv.ciudad} onChange={(v) => u("ciudad", v)} placeholder="Bogotá, Colombia" />
          <Field label="Instagram" value={cv.instagram} onChange={(v) => u("instagram", v)} placeholder="@genesis_nieto" />
          <Field label="Website" value={cv.website} onChange={(v) => u("website", v)} placeholder="genesisnieto.com" />
        </Card>

        {/* Perfil Profesional */}
        <Card title="Perfil Profesional">
          <Field
            label="Bio / Resumen"
            value={cv.perfil}
            onChange={(v) => u("perfil", v)}
            multiline
            rows={5}
            placeholder="Cuéntale a las marcas quién eres, qué haces y qué te diferencia..."
          />
        </Card>

        {/* Experiencia */}
        <Card title="Experiencia">
          {cv.experiencia.map((e, i) => (
            <div
              key={i}
              className="mb-4 p-3 rounded-xl relative"
              style={{ background: "#F7F5F2", border: "1px solid rgba(200,168,137,0.2)" }}
            >
              <button
                onClick={() => removeExp(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50"
                style={{ color: "#B09070" }}
              >
                <X size={12} />
              </button>
              <div className="mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Empresa</label>
                <input style={subFieldStyle} value={e.empresa} onChange={(ev) => updateExp(i, "empresa", ev.target.value)} placeholder="Freelance / Marca / Agencia" />
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Rol</label>
                  <input style={subFieldStyle} value={e.rol} onChange={(ev) => updateExp(i, "rol", ev.target.value)} placeholder="Content Creator" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Período</label>
                  <input style={subFieldStyle} value={e.periodo} onChange={(ev) => updateExp(i, "periodo", ev.target.value)} placeholder="2022 – Presente" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Descripción</label>
                <textarea
                  style={{ ...subFieldStyle, resize: "none" }}
                  rows={3}
                  value={e.descripcion}
                  onChange={(ev) => updateExp(i, "descripcion", ev.target.value)}
                  placeholder="Describe tus logros y responsabilidades..."
                />
              </div>
            </div>
          ))}
          <button
            onClick={addExp}
            className="w-full py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
            style={{ borderColor: "#C8A889", color: "#8A6B52" }}
          >
            <Plus size={13} /> Agregar experiencia
          </button>
        </Card>

        {/* Educación */}
        <Card title="Educación">
          {cv.educacion.map((ed, i) => (
            <div
              key={i}
              className="mb-4 p-3 rounded-xl relative"
              style={{ background: "#F7F5F2", border: "1px solid rgba(200,168,137,0.2)" }}
            >
              <button
                onClick={() => removeEdu(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50"
                style={{ color: "#B09070" }}
              >
                <X size={12} />
              </button>
              <div className="mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Institución</label>
                <input style={subFieldStyle} value={ed.institucion} onChange={(ev) => updateEdu(i, "institucion", ev.target.value)} placeholder="Universidad / Academia / Plataforma" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Título / Certificación</label>
                  <input style={subFieldStyle} value={ed.titulo} onChange={(ev) => updateEdu(i, "titulo", ev.target.value)} placeholder="Comunicación Social" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Año</label>
                  <input style={subFieldStyle} value={ed.anio} onChange={(ev) => updateEdu(i, "anio", ev.target.value)} placeholder="2021" />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addEdu}
            className="w-full py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
            style={{ borderColor: "#C8A889", color: "#8A6B52" }}
          >
            <Plus size={13} /> Agregar educación
          </button>
        </Card>

        {/* Habilidades */}
        <Card title="Habilidades">
          <p className="text-xs mb-3" style={{ color: "#B09070" }}>
            Escribe las habilidades separadas por comas.
          </p>
          <textarea
            value={cv.habilidades}
            onChange={(e) => u("habilidades", e.target.value)}
            rows={3}
            placeholder="UGC, Fotografía, Video, Edición, Fitness, Beauty..."
            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
            style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
          />
          {/* Tag preview */}
          {cv.habilidades && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {cv.habilidades
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(200,168,137,0.15)",
                      border: "1px solid rgba(200,168,137,0.4)",
                      color: "#5C3C2C",
                    }}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </Card>

        {/* Servicios */}
        <Card title="Servicios y Tarifas">
          {cv.servicios.map((s, i) => (
            <div
              key={i}
              className="mb-3 p-3 rounded-xl relative"
              style={{ background: "#F7F5F2", border: "1px solid rgba(200,168,137,0.2)" }}
            >
              <button
                onClick={() => removeSvc(i)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50"
                style={{ color: "#B09070" }}
              >
                <X size={12} />
              </button>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Servicio</label>
                  <input style={subFieldStyle} value={s.nombre} onChange={(ev) => updateSvc(i, "nombre", ev.target.value)} placeholder="Pack UGC On-Site" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A6B52" }}>Precio / Rango</label>
                  <input style={subFieldStyle} value={s.precio} onChange={(ev) => updateSvc(i, "precio", ev.target.value)} placeholder="USD 350 – 500" />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addSvc}
            className="w-full py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/60 flex items-center justify-center gap-2"
            style={{ borderColor: "#C8A889", color: "#8A6B52" }}
          >
            <Plus size={13} /> Agregar servicio
          </button>
        </Card>
      </div>

      {/* ── RIGHT: LIVE PREVIEW ── */}
      <div style={{ flex: 1, position: "sticky", top: "80px" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#C3A27A" }}>
            Vista previa A4
          </span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: "#5C3C2C", color: "#FAF8F5" }}
          >
            <Download size={12} />
            PDF
          </button>
        </div>
        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "calc(100vh - 160px)",
            borderRadius: "16px",
            boxShadow: "0 4px 32px rgba(92,60,44,0.10)",
            border: "1px solid rgba(200,168,137,0.25)",
          }}
        >
          <div style={{ transformOrigin: "top left", transform: "scale(0.88)", width: "595px" }}>
            <CvPreview cv={cv} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAB COMPONENT MAP
───────────────────────────────────────────── */
const TAB_COMPONENTS: Record<TabId, React.FC> = {
  hero: HeroTab,
  gallery: GalleryTab,
  services: ServicesTab,
  method: MethodTab,
  testimonials: TestimonialsTab,
  favorites: FavoritesTab,
  collabs: CollabsTab,
  contact: ContactTab,
  brands: BrandsTab,
  cv: CvTab,
};

/* ─────────────────────────────────────────────
   ADMIN DASHBOARD
───────────────────────────────────────────── */
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { resetContent, saveToSupabase, isSaving, lastSaved, isLoading } = useContent();
  const ActiveComponent = TAB_COMPONENTS[activeTab];
  const isCvTab = activeTab === "cv";

  const goToTab = (id: TabId) => {
    setActiveTab(id);
    setMobileSidebarOpen(false);
  };

  const currentTabMeta =
    ALL_TABS.find((t) => t.id === activeTab) ?? ALL_TABS[0];

  const handleSave = async () => {
    setSaveStatus("saving");
    setSaveError(null);
    const { error } = await saveToSupabase();
    if (error) {
      setSaveStatus("error");
      setSaveError(error);
      setTimeout(() => setSaveStatus("idle"), 4000);
    } else {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "¿Restablecer todo el contenido al texto original? Esta acción no se puede deshacer."
      )
    ) {
      resetContent();
    }
  };

  /* ── Sidebar nav item ── */
  const NavItem = ({ tab }: { tab: SidebarTab }) => {
    const active = activeTab === tab.id;
    return (
      <button
        onClick={() => goToTab(tab.id)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all duration-150"
        style={{
          background: active ? "rgba(92,60,44,0.08)" : "transparent",
          color: active ? "#5C3C2C" : "#8A6B52",
          fontWeight: active ? 600 : 400,
        }}
      >
        <span className="shrink-0" style={{ color: active ? "#C3A27A" : "#B09070" }}>
          {tab.icon}
        </span>
        <span className="text-sm truncate">{tab.label}</span>
        {active && (
          <span className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "#C3A27A" }} />
        )}
      </button>
    );
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#F7F5F2", fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(44,26,10,0.45)", backdropFilter: "blur(2px)" }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`shrink-0 flex flex-col h-screen overflow-y-auto fixed md:sticky top-0 z-50 md:z-auto transition-transform duration-300 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{
          width: "220px",
          background: "#FFFFFF",
          borderRight: "1px solid rgba(200,168,137,0.2)",
          boxShadow: "2px 0 12px rgba(92,60,44,0.04)",
        }}
      >
        {/* Logo / Brand */}
        <div
          className="px-5 py-5 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(200,168,137,0.15)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#5C3C2C" }}
          >
            <Layout size={14} color="#FAF8F5" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#5C3C2C" }}>
              Admin
            </p>
            <p className="text-xs" style={{ color: "#B09070" }}>
              Génesis Nieto
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {/* Group: Contenido del sitio */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2 px-3"
            style={{ color: "#C3A27A" }}
          >
            Contenido del sitio
          </p>
          {CONTENT_TABS.map((tab) => (
            <NavItem key={tab.id} tab={tab} />
          ))}

          <div
            className="my-4"
            style={{ height: "1px", background: "rgba(200,168,137,0.2)" }}
          />

          {/* Group: Herramientas */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2 px-3"
            style={{ color: "#C3A27A" }}
          >
            Herramientas
          </p>
          {TOOL_TABS.map((tab) => (
            <NavItem key={tab.id} tab={tab} />
          ))}
        </nav>

        {/* Bottom actions */}
        <div
          className="px-3 py-4 space-y-1"
          style={{ borderTop: "1px solid rgba(200,168,137,0.15)" }}
        >
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-gray-50"
            style={{ color: "#8A6B52" }}
          >
            <Eye size={15} style={{ color: "#B09070" }} />
            <span>Ver sitio</span>
            <ExternalLink size={11} className="ml-auto" style={{ color: "#C3A27A" }} />
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-red-50"
            style={{ color: "#B09070" }}
          >
            <LogOut size={15} style={{ color: "#B09070" }} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden md:ml-0">
        {/* Top header bar — always visible */}
        <header
          className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-3 md:py-4"
          style={{
            background: "#FFFFFF",
            borderBottom: "1px solid rgba(200,168,137,0.2)",
            boxShadow: "0 1px 8px rgba(92,60,44,0.04)",
          }}
        >
          {/* Hamburger (mobile only) + Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-colors hover:bg-gray-50"
              style={{ border: "1px solid rgba(200,168,137,0.3)", color: "#5C3C2C" }}
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs hidden sm:block" style={{ color: "#B09070" }}>
                Admin
              </span>
              <ChevronRight size={13} className="hidden sm:block" style={{ color: "#C3A27A" }} />
              <span
                className="flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "#5C3C2C" }}
              >
                <span style={{ color: "#C3A27A" }}>{currentTabMeta.icon}</span>
                {currentTabMeta.label}
              </span>
            </div>
          </div>

          {/* Save / Reset — hidden for CV tab (it's a standalone tool) */}
          {!isCvTab && (
            <div className="flex items-center gap-3">
              <span className="text-xs hidden sm:block" style={{ color: "#B09070" }}>
                {lastSaved
                  ? `Guardado ${lastSaved.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`
                  : "Sin guardar"}
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all hover:bg-gray-50"
                style={{ color: "#B09070", border: "1px solid rgba(200,168,137,0.3)" }}
              >
                <RotateCcw size={13} />
                Restablecer
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || saveStatus === "saving"}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                style={{
                  background:
                    saveStatus === "saved"
                      ? "#4CAF50"
                      : saveStatus === "error"
                      ? "#EF4444"
                      : "#5C3C2C",
                  color: "#FAF8F5",
                }}
              >
                {saveStatus === "saving" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Guardando...
                  </>
                ) : saveStatus === "saved" ? (
                  <>
                    <Check size={14} />
                    ¡Guardado!
                  </>
                ) : saveStatus === "error" ? (
                  <>
                    <X size={14} />
                    Error
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Guardar
                  </>
                )}
              </button>
            </div>
          )}
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-5 md:py-7">
          {/* Status notices — not shown in CV tab */}
          {!isCvTab && (
            <>
              {saveStatus === "error" && saveError && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-xs"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    color: "#EF4444",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <X size={13} />
                  {saveError}
                </div>
              )}
              {isLoading && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-xs"
                  style={{
                    background: "rgba(200,168,137,0.12)",
                    color: "#8A6B52",
                    border: "1px solid rgba(200,168,137,0.25)",
                  }}
                >
                  <span className="w-3 h-3 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
                  Cargando contenido desde Supabase...
                </div>
              )}
              {!isLoading && saveStatus === "idle" && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-xs"
                  style={{
                    background: "rgba(200,168,137,0.12)",
                    color: "#8A6B52",
                    border: "1px solid rgba(200,168,137,0.25)",
                  }}
                >
                  <Check size={13} />
                  Los cambios se guardan en{" "}
                  <strong style={{ marginLeft: "3px" }}>Supabase</strong>
                  &nbsp;al presionar Guardar. Se ven en el sitio de inmediato.
                </div>
              )}
            </>
          )}

          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
