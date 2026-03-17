import React from "react";
import {
  Home, Film, Package, Zap, MessageSquare, Star, Handshake, Mail, Tag, FileText,
} from "lucide-react";

export const ADMIN_PASSWORD = "genesis2025";
export const AUTH_KEY = "genesis_admin_auth";

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

/* ─────────────────────────────────────────────
   TYPES & TAB DEFINITIONS
───────────────────────────────────────────── */
export type TabId =
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

export interface SidebarTab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

export const CONTENT_TABS: SidebarTab[] = [
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

export const TOOL_TABS: SidebarTab[] = [
  { id: "cv", label: "Hoja de Vida", icon: <FileText size={16} /> },
];

export const ALL_TABS: SidebarTab[] = [...CONTENT_TABS, ...TOOL_TABS];

/* ─────────────────────────────────────────────
   SHARED UI PRIMITIVES
───────────────────────────────────────────── */
export const inputBase: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid rgba(200,168,137,0.35)",
  color: "#2C1A0A",
};

export function Field({
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

export function Card({ title, children, cols2 = false }: { title?: string; children: React.ReactNode; cols2?: boolean }) {
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
