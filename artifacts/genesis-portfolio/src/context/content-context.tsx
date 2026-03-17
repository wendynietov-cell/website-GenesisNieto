import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
}

export interface MethodStep {
  num: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  brand: string;
}

export interface Favorite {
  category: string;
  img: string;
  productName: string;
}

export interface Proposal {
  id: string;
  numero: string;
  fecha: string;
  validez: string;
  creadoraNombre: string;
  creadoraRol: string;
  creadoraInstagram: string;
  creadoraWebsite: string;
  clienteNombre: string;
  clienteEmpresa: string;
  clienteEmail: string;
  titulo: string;
  descripcion: string;
  entregables: { id: number; texto: string }[];
  precio: string;
  formaPago: string;
  tiempoEntrega: string;
  revisiones: string;
  notas: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  numero: string;
  fecha: string;
  vencimiento: string;
  prestadorNombre: string;
  prestadorIdentificacion: string;
  prestadorTelefono: string;
  prestadorEmail: string;
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  clienteNombre: string;
  clienteIdentificacion: string;
  clienteEmpresa: string;
  clienteDireccion: string;
  servicios: { id: number; descripcion: string; valor: string }[];
  notas: string;
  createdAt: string;
}

export interface Brand {
  name: string;
  category: string;
  tab: "marcas" | "empresas" | "lugares";
}

export interface GalleryVideo {
  type: "video" | "photo";
  src: string;
  poster?: string;
  category?: string;
}

export interface GalleryPhoto {
  src: string;
}

export interface SiteContent {
  hero: {
    name: string;
    subtitle: string;
    bio: string;
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    onsite: ServiceItem;
    remote: ServiceItem;
  };
  method: {
    sectionTitle: string;
    sectionSubtitle: string;
    steps: MethodStep[];
  };
  testimonials: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Testimonial[];
  };
  favorites: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Favorite[];
  };
  collabs: {
    sectionTitle: string;
    description: string;
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
    card3Title: string;
    card3Text: string;
    cta: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    tiktokHandle: string;
    tiktokUrl: string;
    copyright: string;
  };
  brands: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Brand[];
  };
  gallery: {
    sectionTitle: string;
    videos: GalleryVideo[];
    photos: GalleryPhoto[];
  };
  proposals: {
    items: Proposal[];
  };
  invoices: {
    items: Invoice[];
  };
}

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    name: "Génesis Nieto",
    subtitle: "UGC Creator · Fitness Coach · Lifestyle",
    bio: "Entrenadora y creadora de contenido apasionada por el bienestar. Fusiono la estética del estilo de vida con la disciplina del fitness y el placer de las recetas saludables.",
    tagline: "No solo grabo contenido; capturo la experiencia real de tu marca para conectar con personas reales.",
    ctaPrimary: "Ver Servicios",
    ctaSecondary: "Contactar",
  },
  services: {
    sectionTitle: "Modalidades de Servicio",
    sectionSubtitle: "Elige la opción que mejor se adapte a tu marca",
    onsite: {
      title: "Servicio On-Site",
      subtitle: "Grabación presencial en locación",
      description: "Voy al lugar, grabo cada ángulo necesario y te entrego una pieza final lista para impactar en redes. Ideal para restaurantes, gimnasios, hoteles y experiencias.",
      features: ["Grabación en locación", "Tomas B-roll incluidas", "Video editado y listo", "Formatos adaptados para redes"],
      cta: "Solicitar Cotización",
    },
    remote: {
      title: "Servicio Remoto",
      subtitle: "Recibe el producto, crea el contenido",
      description: "Recepción de productos por envío, pauta de estilo acordada y entrega de video o entregable final. Perfecto para e-commerce, suplementos, ropa y skincare.",
      features: ["Recepción de envío del producto", "Pauta de estilo acordada", "Entrega digital en alta calidad", "Revisiones incluidas"],
      cta: "Solicitar Cotización",
    },
  },
  method: {
    sectionTitle: "El Proceso",
    sectionSubtitle: "De la idea a la pantalla, paso a paso",
    steps: [
      { num: "1", title: "Briefing & Estilo", desc: "Entendemos tu marca, valores y el estilo de contenido que necesitas." },
      { num: "2", title: "Grabación / Envío", desc: "Visito tu locación o recibo tu producto. Planificamos cada toma al detalle." },
      { num: "3", title: "Edición Premium", desc: "Postproducción cuidadosa: color, sonido, texto y ritmo visual perfectos." },
      { num: "4", title: "Entrega Final", desc: "Video listo para publicar en 5-7 días hábiles, con formatos para cada red." },
    ],
  },
  testimonials: {
    sectionTitle: "Lo que dicen las marcas",
    sectionSubtitle: "Experiencias reales con contenido que convierte",
    items: [
      { quote: "El contenido que creó para nuestra marca superó todas las expectativas. Las tomas son puras, el ritmo del video perfecto y el engagement fue el más alto del mes.", author: "Brand Manager", brand: "Aesthetic Active" },
      { quote: "Génesis entiende la esencia de cada producto. Cuando recibimos los entregables, parecían salir de una producción profesional. ¡Lo recomendamos al 100%!", author: "Directora de Marketing", brand: "Glow Skincare" },
      { quote: "El proceso fue sencillo, claro y el resultado impecable. El video generó más conversiones que nuestra publicidad pagada. Definitivamente repetiremos.", author: "Fundadora", brand: "Pure Matcha" },
    ],
  },
  favorites: {
    sectionTitle: "Mis Favoritos del Mes",
    sectionSubtitle: "Los productos que forman parte de mi rutina este mes — mis marcas favoritas del momento.",
    items: [
      { category: "Suplementación", img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=600&h=750&fit=crop", productName: "" },
      { category: "Activewear", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=750&fit=crop", productName: "" },
      { category: "Recetas & Cocina", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=750&fit=crop", productName: "" },
      { category: "Skincare", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=750&fit=crop", productName: "" },
      { category: "Bienestar", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=750&fit=crop", productName: "" },
    ],
  },
  collabs: {
    sectionTitle: "Colaboraciones No Pagas",
    description: "Estoy abierta a propuestas de gifting e intercambio para marcas que se alineen con mi estilo de vida: bienestar, fitness, alimentación saludable y lifestyle auténtico.",
    card1Title: "¿Qué ofrezco?",
    card1Text: "Creación de contenido orgánico, reseñas honestas en mis canales y exposición a una audiencia comprometida con el bienestar.",
    card2Title: "¿Qué busco?",
    card2Text: "Productos funcionales, estéticos y de calidad que genuinamente usaría en mi día a día: activewear, suplementos, skincare.",
    card3Title: "¿Cómo aplicar?",
    card3Text: "Envíame un correo con la información de tu marca, el producto propuesto y expectativas. Si hay match, avanzamos.",
    cta: "Proponer Colaboración",
  },
  contact: {
    title: "Conectemos",
    subtitle: "¿Lista para crear contenido que impacte y conecte genuinamente con tu audiencia?",
    email: "hola@genesisnieto.com",
    instagramHandle: "@genesis_nieto",
    instagramUrl: "https://instagram.com/genesis_nieto",
    tiktokHandle: "@genesis_nieto",
    tiktokUrl: "https://tiktok.com/@genesis_nieto",
    copyright: "© 2025 Génesis Nieto · Todos los derechos reservados",
  },
  brands: {
    sectionTitle: "Marcas & Colaboraciones",
    sectionSubtitle: "Con quienes colaboro o aspiro colaborar",
    items: [
      { name: "Miss Beauty",    category: "Maquillaje", tab: "marcas"   },
      { name: "Atenea",         category: "Maquillaje", tab: "marcas"   },
      { name: "Miis Cosmetics", category: "Maquillaje", tab: "marcas"   },
      { name: "Vive Beauty",    category: "Skincare",   tab: "marcas"   },
    ] as Brand[],
  },
  gallery: {
    sectionTitle: "Galería de Contenido",
    videos: [
      { type: "video", src: "/genesis-video-1.mov", poster: "/genesis-1.jpg", category: "Fitness" },
      { type: "video", src: "/genesis-video-2.mov", poster: "/genesis-4.jpg", category: "Lifestyle" },
      { type: "video", src: "/genesis-video-3.mov", poster: "/genesis-6.jpg", category: "Beauty" },
      { type: "video", src: "/genesis-video-4.mov", poster: "/genesis-8.jpg", category: "Gastro" },
    ],
    photos: [
      { src: "/genesis-1.jpg" },
      { src: "/genesis-2.jpg" },
      { src: "/genesis-3.jpg" },
      { src: "/genesis-5.jpg" },
      { src: "/genesis-7.jpg" },
      { src: "/genesis-9.jpg" },
    ],
  },
  proposals: {
    items: [],
  },
  invoices: {
    items: [],
  },
};

const STORAGE_KEY = "genesis_site_content";

function loadFromLocalStorage(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_CONTENT, ...JSON.parse(stored) };
  } catch {
    // ignore
  }
  return DEFAULT_CONTENT;
}

interface ContentContextValue {
  content: SiteContent;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  resetContent: () => void;
  defaultContent: SiteContent;
  saveToSupabase: () => Promise<{ error: string | null }>;
  isSaving: boolean;
  isLoading: boolean;
  lastSaved: Date | null;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadFromLocalStorage);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Cargar desde Supabase al iniciar
  useEffect(() => {
    supabase
      .from("site_content")
      .select("content")
      .eq("id", 1)
      .single()
      .then(({ data, error }) => {
        if (!error && data?.content) {
          const merged = { ...DEFAULT_CONTENT, ...(data.content as SiteContent) };
          setContent(merged);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch {
            // ignore
          }
        }
        setIsLoading(false);
      });
  }, []);

  const updateContent = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const saveToSupabase = useCallback(async (): Promise<{ error: string | null }> => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("site_content")
        .update({ content })
        .eq("id", 1);
      if (error) return { error: error.message };
      setLastSaved(new Date());
      return { error: null };
    } catch (e) {
      return { error: "Error de conexión con Supabase" };
    } finally {
      setIsSaving(false);
    }
  }, [content]);

  const resetContent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(DEFAULT_CONTENT);
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, defaultContent: DEFAULT_CONTENT, saveToSupabase, isSaving, isLoading, lastSaved }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}
