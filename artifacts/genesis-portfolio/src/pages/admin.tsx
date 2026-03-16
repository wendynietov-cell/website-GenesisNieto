import { useState } from "react";
import { useContent, SiteContent, MethodStep, Testimonial, Favorite } from "@/context/content-context";
import { Lock, Eye, Save, RotateCcw, ChevronRight, ExternalLink, Check, X } from "lucide-react";

const ADMIN_PASSWORD = "genesis2025";
const AUTH_KEY = "genesis_admin_auth";

function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FAF8F5 0%, #EFE3D7 50%, #D7B899 100%)" }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(200,168,137,0.4)", backdropFilter: "blur(20px)" }}>
            <Lock size={22} style={{ color: "#5C3C2C" }} />
          </div>
          <h1 className="text-3xl font-heading mb-2" style={{ color: "#5C3C2C" }}>Panel de Génesis</h1>
          <p className="text-sm" style={{ color: "#8A6B52" }}>Ingresa tu contraseña para editar el contenido</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="rounded-3xl p-8 shadow-xl" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(24px)", border: "1px solid rgba(200,168,137,0.35)" }}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: "#5C3C2C" }}>Contraseña</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••••"
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 ${error ? "ring-2 ring-red-400" : "focus:ring-2"}`}
                style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(200,168,137,0.4)", color: "#5C3C2C", "--tw-ring-color": "#C8A889" } as React.CSSProperties}
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2">Contraseña incorrecta. Inténtalo de nuevo.</p>}
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
          <a href="/" className="hover:underline">← Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}

type TabId = "hero" | "services" | "method" | "testimonials" | "favorites" | "collabs" | "contact" | "brands";

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: "hero", label: "Portada", emoji: "🏠" },
  { id: "services", label: "Servicios", emoji: "📦" },
  { id: "method", label: "El Proceso", emoji: "✦" },
  { id: "testimonials", label: "Testimonios", emoji: "💬" },
  { id: "favorites", label: "Favoritos", emoji: "⭐" },
  { id: "collabs", label: "Colaboraciones", emoji: "🤝" },
  { id: "contact", label: "Contacto", emoji: "📩" },
  { id: "brands", label: "Marcas", emoji: "🏷️" },
];

function Field({ label, value, onChange, multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8A6B52" }}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,137,0.35)", color: "#3a2519", "--tw-ring-color": "#C8A889" } as React.CSSProperties}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-2"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,137,0.35)", color: "#3a2519", "--tw-ring-color": "#C8A889" } as React.CSSProperties}
        />
      )}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(200,168,137,0.25)", backdropFilter: "blur(12px)" }}>
      <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "#C8A889" }}>{title}</h3>
      {children}
    </div>
  );
}

function HeroTab() {
  const { content, updateContent } = useContent();
  const u = (key: keyof SiteContent["hero"], val: string) =>
    updateContent((prev) => ({ ...prev, hero: { ...prev.hero, [key]: val } }));
  return (
    <div>
      <SectionCard title="Textos principales">
        <Field label="Tu nombre" value={content.hero.name} onChange={(v) => u("name", v)} />
        <Field label="Subtítulo / Rol" value={content.hero.subtitle} onChange={(v) => u("subtitle", v)} />
        <Field label="Biografía" value={content.hero.bio} onChange={(v) => u("bio", v)} multiline placeholder="Cuéntale a las marcas quién eres..." />
        <Field label="Frase de impacto (entre comillas)" value={content.hero.tagline} onChange={(v) => u("tagline", v)} multiline />
      </SectionCard>
      <SectionCard title="Botones">
        <Field label="Texto botón principal" value={content.hero.ctaPrimary} onChange={(v) => u("ctaPrimary", v)} />
        <Field label="Texto botón secundario" value={content.hero.ctaSecondary} onChange={(v) => u("ctaSecondary", v)} />
      </SectionCard>
    </div>
  );
}

function ServicesTab() {
  const { content, updateContent } = useContent();
  const update = (side: "onsite" | "remote", key: string, val: string) =>
    updateContent((prev) => ({
      ...prev,
      services: { ...prev.services, [side]: { ...prev.services[side], [key]: val } },
    }));
  const updateFeature = (side: "onsite" | "remote", idx: number, val: string) =>
    updateContent((prev) => {
      const features = [...prev.services[side].features];
      features[idx] = val;
      return { ...prev, services: { ...prev.services, [side]: { ...prev.services[side], features } } };
    });

  const renderService = (side: "onsite" | "remote", label: string) => {
    const s = content.services[side];
    return (
      <SectionCard title={label}>
        <Field label="Título" value={s.title} onChange={(v) => update(side, "title", v)} />
        <Field label="Subtítulo" value={s.subtitle} onChange={(v) => update(side, "subtitle", v)} />
        <Field label="Descripción" value={s.description} onChange={(v) => update(side, "description", v)} multiline />
        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8A6B52" }}>Características incluidas</label>
          {s.features.map((f, i) => (
            <input
              key={i}
              type="text"
              value={f}
              onChange={(e) => updateFeature(side, i, e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-2 transition-all focus:ring-2"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,137,0.3)", color: "#3a2519", "--tw-ring-color": "#C8A889" } as React.CSSProperties}
            />
          ))}
        </div>
        <Field label="Texto del botón" value={s.cta} onChange={(v) => update(side, "cta", v)} />
      </SectionCard>
    );
  };

  return (
    <div>
      <SectionCard title="Encabezado de sección">
        <Field label="Título de la sección" value={content.services.sectionTitle} onChange={(v) => updateContent((p) => ({ ...p, services: { ...p.services, sectionTitle: v } }))} />
        <Field label="Subtítulo" value={content.services.sectionSubtitle} onChange={(v) => updateContent((p) => ({ ...p, services: { ...p.services, sectionSubtitle: v } }))} />
      </SectionCard>
      {renderService("onsite", "Servicio On-Site")}
      {renderService("remote", "Servicio Remoto")}
    </div>
  );
}

function MethodTab() {
  const { content, updateContent } = useContent();
  const updateStep = (idx: number, key: keyof MethodStep, val: string) =>
    updateContent((prev) => {
      const steps = prev.method.steps.map((s, i) => i === idx ? { ...s, [key]: val } : s);
      return { ...prev, method: { ...prev.method, steps } };
    });

  return (
    <div>
      <SectionCard title="Encabezado de sección">
        <Field label="Título" value={content.method.sectionTitle} onChange={(v) => updateContent((p) => ({ ...p, method: { ...p.method, sectionTitle: v } }))} />
        <Field label="Subtítulo" value={content.method.sectionSubtitle} onChange={(v) => updateContent((p) => ({ ...p, method: { ...p.method, sectionSubtitle: v } }))} />
      </SectionCard>
      {content.method.steps.map((step, i) => (
        <SectionCard key={i} title={`Paso ${step.num}`}>
          <Field label="Título del paso" value={step.title} onChange={(v) => updateStep(i, "title", v)} />
          <Field label="Descripción" value={step.desc} onChange={(v) => updateStep(i, "desc", v)} multiline />
        </SectionCard>
      ))}
    </div>
  );
}

function TestimonialsTab() {
  const { content, updateContent } = useContent();
  const updateItem = (idx: number, key: keyof Testimonial, val: string) =>
    updateContent((prev) => {
      const items = prev.testimonials.items.map((t, i) => i === idx ? { ...t, [key]: val } : t);
      return { ...prev, testimonials: { ...prev.testimonials, items } };
    });
  const addItem = () =>
    updateContent((prev) => ({
      ...prev,
      testimonials: { ...prev.testimonials, items: [...prev.testimonials.items, { quote: "", author: "", brand: "" }] },
    }));
  const removeItem = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      testimonials: { ...prev.testimonials, items: prev.testimonials.items.filter((_, i) => i !== idx) },
    }));

  return (
    <div>
      <SectionCard title="Encabezado de sección">
        <Field label="Título" value={content.testimonials.sectionTitle} onChange={(v) => updateContent((p) => ({ ...p, testimonials: { ...p.testimonials, sectionTitle: v } }))} />
        <Field label="Subtítulo" value={content.testimonials.sectionSubtitle} onChange={(v) => updateContent((p) => ({ ...p, testimonials: { ...p.testimonials, sectionSubtitle: v } }))} />
      </SectionCard>
      {content.testimonials.items.map((t, i) => (
        <div key={i} className="relative">
          <button onClick={() => removeItem(i)} className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-red-100" style={{ color: "#B09070" }}>
            <X size={14} />
          </button>
          <SectionCard title={`Testimonio ${i + 1}`}>
            <Field label="Nombre de la marca" value={t.brand} onChange={(v) => updateItem(i, "brand", v)} />
            <Field label="Rol del contacto (ej: Brand Manager)" value={t.author} onChange={(v) => updateItem(i, "author", v)} />
            <Field label="Cita / Testimonio" value={t.quote} onChange={(v) => updateItem(i, "quote", v)} multiline placeholder="Lo que la marca dice de tu trabajo..." />
          </SectionCard>
        </div>
      ))}
      <button onClick={addItem} className="w-full py-3 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/30" style={{ borderColor: "#C8A889", color: "#8A6B52" }}>
        + Agregar testimonio
      </button>
    </div>
  );
}

function FavoritesTab() {
  const { content, updateContent } = useContent();
  const updateItem = (idx: number, key: keyof Favorite, val: string) =>
    updateContent((prev) => {
      const items = prev.favorites.items.map((f, i) => i === idx ? { ...f, [key]: val } : f);
      return { ...prev, favorites: { ...prev.favorites, items } };
    });
  const addItem = () =>
    updateContent((prev) => ({
      ...prev,
      favorites: { ...prev.favorites, items: [...prev.favorites.items, { category: "", img: "", productName: "" }] },
    }));
  const removeItem = (idx: number) =>
    updateContent((prev) => ({
      ...prev,
      favorites: { ...prev.favorites, items: prev.favorites.items.filter((_, i) => i !== idx) },
    }));

  return (
    <div>
      <SectionCard title="Encabezado de sección">
        <Field label="Título de la sección" value={content.favorites.sectionTitle} onChange={(v) => updateContent((p) => ({ ...p, favorites: { ...p.favorites, sectionTitle: v } }))} />
        <Field label="Subtítulo" value={content.favorites.sectionSubtitle} onChange={(v) => updateContent((p) => ({ ...p, favorites: { ...p.favorites, sectionSubtitle: v } }))} />
      </SectionCard>
      {content.favorites.items.map((f, i) => (
        <div key={i} className="relative">
          <button onClick={() => removeItem(i)} className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-red-100" style={{ color: "#B09070" }}>
            <X size={14} />
          </button>
          <SectionCard title={`Favorito ${i + 1}`}>
            {f.img && (
              <div className="mb-3 rounded-xl overflow-hidden h-32 w-full">
                <img src={f.img} alt={f.category} className="w-full h-full object-cover" />
              </div>
            )}
            <Field label="Categoría (ej: Skincare)" value={f.category} onChange={(v) => updateItem(i, "category", v)} />
            <Field label="Nombre del producto (opcional)" value={f.productName} onChange={(v) => updateItem(i, "productName", v)} placeholder="ej: Proteína Whey Isolate..." />
            <Field label="URL de la imagen (pega un link de imagen)" value={f.img} onChange={(v) => updateItem(i, "img", v)} placeholder="https://..." />
          </SectionCard>
        </div>
      ))}
      <button onClick={addItem} className="w-full py-3 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/30" style={{ borderColor: "#C8A889", color: "#8A6B52" }}>
        + Agregar favorito
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
      <SectionCard title="Encabezado">
        <Field label="Título de la sección" value={content.collabs.sectionTitle} onChange={(v) => u("sectionTitle", v)} />
        <Field label="Descripción" value={content.collabs.description} onChange={(v) => u("description", v)} multiline />
      </SectionCard>
      <SectionCard title="Tarjeta 1 — ¿Qué ofrezco?">
        <Field label="Título" value={content.collabs.card1Title} onChange={(v) => u("card1Title", v)} />
        <Field label="Texto" value={content.collabs.card1Text} onChange={(v) => u("card1Text", v)} multiline />
      </SectionCard>
      <SectionCard title="Tarjeta 2 — ¿Qué busco?">
        <Field label="Título" value={content.collabs.card2Title} onChange={(v) => u("card2Title", v)} />
        <Field label="Texto" value={content.collabs.card2Text} onChange={(v) => u("card2Text", v)} multiline />
      </SectionCard>
      <SectionCard title="Tarjeta 3 — ¿Cómo aplicar?">
        <Field label="Título" value={content.collabs.card3Title} onChange={(v) => u("card3Title", v)} />
        <Field label="Texto" value={content.collabs.card3Text} onChange={(v) => u("card3Text", v)} multiline />
      </SectionCard>
      <SectionCard title="Botón">
        <Field label="Texto del botón" value={content.collabs.cta} onChange={(v) => u("cta", v)} />
      </SectionCard>
    </div>
  );
}

function ContactTab() {
  const { content, updateContent } = useContent();
  const u = (key: keyof SiteContent["contact"], val: string) =>
    updateContent((prev) => ({ ...prev, contact: { ...prev.contact, [key]: val } }));
  return (
    <div>
      <SectionCard title="Textos">
        <Field label="Título" value={content.contact.title} onChange={(v) => u("title", v)} />
        <Field label="Subtítulo" value={content.contact.subtitle} onChange={(v) => u("subtitle", v)} multiline />
        <Field label="Texto del footer (copyright)" value={content.contact.copyright} onChange={(v) => u("copyright", v)} />
      </SectionCard>
      <SectionCard title="Email de contacto">
        <Field label="Correo electrónico" value={content.contact.email} onChange={(v) => u("email", v)} placeholder="hola@tudominio.com" />
      </SectionCard>
      <SectionCard title="Instagram">
        <Field label="Nombre de usuario (con @)" value={content.contact.instagramHandle} onChange={(v) => u("instagramHandle", v)} placeholder="@genesis_nieto" />
        <Field label="URL del perfil" value={content.contact.instagramUrl} onChange={(v) => u("instagramUrl", v)} placeholder="https://instagram.com/..." />
      </SectionCard>
      <SectionCard title="TikTok">
        <Field label="Nombre de usuario (con @)" value={content.contact.tiktokHandle} onChange={(v) => u("tiktokHandle", v)} placeholder="@genesis_nieto" />
        <Field label="URL del perfil" value={content.contact.tiktokUrl} onChange={(v) => u("tiktokUrl", v)} placeholder="https://tiktok.com/@..." />
      </SectionCard>
    </div>
  );
}

function BrandsTab() {
  const { content, updateContent } = useContent();
  const updateBrand = (idx: number, val: string) =>
    updateContent((prev) => {
      const items = prev.brands.items.map((b, i) => i === idx ? { name: val } : b);
      return { ...prev, brands: { ...prev.brands, items } };
    });
  const addBrand = () =>
    updateContent((prev) => ({ ...prev, brands: { ...prev.brands, items: [...prev.brands.items, { name: "" }] } }));
  const removeBrand = (idx: number) =>
    updateContent((prev) => ({ ...prev, brands: { ...prev.brands, items: prev.brands.items.filter((_, i) => i !== idx) } }));

  return (
    <div>
      <SectionCard title="Encabezado">
        <Field label="Título" value={content.brands.sectionTitle} onChange={(v) => updateContent((p) => ({ ...p, brands: { ...p.brands, sectionTitle: v } }))} />
        <Field label="Subtítulo" value={content.brands.sectionSubtitle} onChange={(v) => updateContent((p) => ({ ...p, brands: { ...p.brands, sectionSubtitle: v } }))} />
      </SectionCard>
      <SectionCard title="Lista de marcas">
        {content.brands.items.map((b, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={b.name}
              onChange={(e) => updateBrand(i, e.target.value)}
              placeholder={`Marca ${i + 1}`}
              className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-all focus:ring-2"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,137,0.3)", color: "#3a2519", "--tw-ring-color": "#C8A889" } as React.CSSProperties}
            />
            <button onClick={() => removeBrand(i)} className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: "#B09070" }}>
              <X size={14} />
            </button>
          </div>
        ))}
        <button onClick={addBrand} className="w-full mt-2 py-2.5 rounded-xl text-sm font-medium border-dashed border-2 transition-colors hover:bg-white/30" style={{ borderColor: "#C8A889", color: "#8A6B52" }}>
          + Agregar marca
        </button>
      </SectionCard>
    </div>
  );
}

const TAB_COMPONENTS: Record<TabId, React.FC> = {
  hero: HeroTab,
  services: ServicesTab,
  method: MethodTab,
  testimonials: TestimonialsTab,
  favorites: FavoritesTab,
  collabs: CollabsTab,
  contact: ContactTab,
  brands: BrandsTab,
};

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { resetContent } = useContent();
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("¿Restablecer todo el contenido al texto original? Esta acción no se puede deshacer.")) {
      resetContent();
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #FAF8F5 0%, #EFE3D7 60%, #D7CCC0 100%)", fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen`}
        style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(200,168,137,0.3)" }}
      >
        <div className="p-4 flex items-center gap-3 border-b" style={{ borderColor: "rgba(200,168,137,0.2)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#5C3C2C" }}>
            <Lock size={15} color="#FAF8F5" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#5C3C2C" }}>Admin Panel</p>
              <p className="text-xs" style={{ color: "#B09070" }}>Génesis Nieto</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto shrink-0 transition-colors hover:opacity-70" style={{ color: "#B09070" }}>
            <ChevronRight size={16} className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all duration-150 ${activeTab === tab.id ? "font-semibold" : "hover:bg-white/40"}`}
              style={{
                background: activeTab === tab.id ? "rgba(92,60,44,0.1)" : "transparent",
                color: activeTab === tab.id ? "#5C3C2C" : "#8A6B52",
              }}
            >
              <span className="text-base shrink-0">{tab.emoji}</span>
              {sidebarOpen && <span className="text-sm truncate">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t space-y-2" style={{ borderColor: "rgba(200,168,137,0.2)" }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/40"
            style={{ color: "#8A6B52" }}
          >
            <Eye size={14} />
            {sidebarOpen && <span>Ver sitio</span>}
            {sidebarOpen && <ExternalLink size={12} className="ml-auto" />}
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-red-50"
            style={{ color: "#B09070" }}
          >
            <Lock size={14} />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-heading font-medium" style={{ color: "#5C3C2C" }}>
                {TABS.find((t) => t.id === activeTab)?.emoji} {TABS.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-sm mt-1" style={{ color: "#B09070" }}>Los cambios se guardan automáticamente</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all hover:bg-white/50"
                style={{ color: "#B09070", border: "1px solid rgba(200,168,137,0.3)" }}
              >
                <RotateCcw size={13} />
                Restablecer
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: saved ? "#4CAF50" : "#5C3C2C", color: "#FAF8F5" }}
              >
                {saved ? <Check size={14} /> : <Save size={14} />}
                {saved ? "¡Guardado!" : "Guardar"}
              </button>
            </div>
          </div>

          {/* Auto-save notice */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-6 text-xs" style={{ background: "rgba(200,168,137,0.15)", color: "#8A6B52", border: "1px solid rgba(200,168,137,0.25)" }}>
            <Check size={13} />
            Los cambios que hagas aquí aparecen <strong>instantáneamente</strong> en el sitio web — no necesitas hacer nada más.
          </div>

          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
