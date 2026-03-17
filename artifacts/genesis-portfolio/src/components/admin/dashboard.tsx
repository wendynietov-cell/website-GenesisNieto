import { useState } from "react";
import {
  Eye, ExternalLink, Save, RotateCcw, ChevronRight, Check, X,
  Layout, LogOut, Menu,
} from "lucide-react";
import { useContent } from "@/context/content-context";
import {
  TabId, SidebarTab, CONTENT_TABS, TOOL_TABS, ALL_TABS,
} from "@/components/admin/shared";
import HeroTab from "@/components/admin/tabs/hero-tab";
import GalleryTab from "@/components/admin/tabs/gallery-tab";
import ServicesTab from "@/components/admin/tabs/services-tab";
import MethodTab from "@/components/admin/tabs/method-tab";
import TestimonialsTab from "@/components/admin/tabs/testimonials-tab";
import FavoritesTab from "@/components/admin/tabs/favorites-tab";
import CollabsTab from "@/components/admin/tabs/collabs-tab";
import ContactTab from "@/components/admin/tabs/contact-tab";
import BrandsTab from "@/components/admin/tabs/brands-tab";
import CvTab from "@/components/admin/tabs/cv-tab";
import ProposalTab from "@/components/admin/tabs/proposal-tab";
import InvoiceTab from "@/components/admin/tabs/invoice-tab";

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
  proposal: ProposalTab,
  invoice: InvoiceTab,
};

/* ─────────────────────────────────────────────
   ADMIN DASHBOARD
───────────────────────────────────────────── */
export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
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
