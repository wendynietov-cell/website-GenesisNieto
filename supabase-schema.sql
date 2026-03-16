create table if not exists site_content (
  id          int primary key default 1,
  content     jsonb not null default '{}',
  updated_at  timestamptz default now(),
  constraint single_row check (id = 1)
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger site_content_updated_at
  before update on site_content
  for each row execute function update_updated_at();

create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  brand      text,
  message    text not null,
  type       text default 'contact',
  read       boolean default false,
  created_at timestamptz default now()
);

alter table site_content enable row level security;
alter table contact_messages enable row level security;

create policy "Public read content"
  on site_content for select
  using (true);

create policy "Admin edit content"
  on site_content for all
  using (auth.role() = 'service_role');

create policy "Anyone can send message"
  on contact_messages for insert
  with check (true);

create policy "Admin read messages"
  on contact_messages for select
  using (auth.role() = 'service_role');

insert into site_content (id, content) values (1, '{
  "hero": {
    "name": "Génesis Nieto",
    "subtitle": "UGC Creator · Fitness Coach · Lifestyle",
    "bio": "Entrenadora y creadora de contenido apasionada por el bienestar. Fusiono la estética del estilo de vida con la disciplina del fitness y el placer de las recetas saludables.",
    "tagline": "No solo grabo contenido; capturo la experiencia real de tu marca para conectar con personas reales.",
    "ctaPrimary": "Ver Servicios",
    "ctaSecondary": "Contactar"
  },
  "services": {
    "sectionTitle": "Modalidades de Servicio",
    "sectionSubtitle": "Elige la opción que mejor se adapte a tu marca",
    "onsite": {
      "title": "Servicio On-Site",
      "subtitle": "Grabación presencial en locación",
      "description": "Voy al lugar, grabo cada ángulo necesario y te entrego una pieza final lista para impactar en redes.",
      "features": ["Grabación en locación", "Tomas B-roll incluidas", "Video editado y listo", "Formatos adaptados para redes"],
      "cta": "Solicitar Cotización"
    },
    "remote": {
      "title": "Servicio Remoto",
      "subtitle": "Recibe el producto, crea el contenido",
      "description": "Recepción de productos por envío, pauta de estilo acordada y entrega de video o entregable final.",
      "features": ["Recepción de envío del producto", "Pauta de estilo acordada", "Entrega digital en alta calidad", "Revisiones incluidas"],
      "cta": "Solicitar Cotización"
    }
  },
  "method": {
    "sectionTitle": "El Proceso",
    "sectionSubtitle": "De la idea a la pantalla, paso a paso",
    "steps": [
      { "num": "1", "title": "Briefing & Estilo", "desc": "Entendemos tu marca, valores y el estilo de contenido que necesitas." },
      { "num": "2", "title": "Grabación / Envío", "desc": "Visito tu locación o recibo tu producto. Planificamos cada toma al detalle." },
      { "num": "3", "title": "Edición Premium", "desc": "Postproducción cuidadosa: color, sonido, texto y ritmo visual perfectos." },
      { "num": "4", "title": "Entrega Final", "desc": "Video listo para publicar en 5-7 días hábiles, con formatos para cada red." }
    ]
  },
  "testimonials": {
    "sectionTitle": "Lo que dicen las marcas",
    "sectionSubtitle": "Experiencias reales con contenido que convierte",
    "items": [
      { "quote": "El contenido que creó para nuestra marca superó todas las expectativas.", "author": "Brand Manager", "brand": "Aesthetic Active" },
      { "quote": "Génesis entiende la esencia de cada producto. Lo recomendamos al 100%.", "author": "Directora de Marketing", "brand": "Glow Skincare" },
      { "quote": "El proceso fue sencillo, claro y el resultado impecable.", "author": "Fundadora", "brand": "Pure Matcha" }
    ]
  },
  "favorites": {
    "sectionTitle": "Mis Favoritos del Mes",
    "sectionSubtitle": "Los productos que forman parte de mi rutina este mes.",
    "items": [
      { "category": "Suplementación", "img": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=600&h=750&fit=crop", "productName": "" },
      { "category": "Activewear", "img": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=750&fit=crop", "productName": "" },
      { "category": "Recetas & Cocina", "img": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=750&fit=crop", "productName": "" },
      { "category": "Skincare", "img": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=750&fit=crop", "productName": "" },
      { "category": "Bienestar", "img": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=750&fit=crop", "productName": "" }
    ]
  },
  "collabs": {
    "sectionTitle": "Colaboraciones No Pagas",
    "description": "Estoy abierta a propuestas de gifting e intercambio para marcas que se alineen con mi estilo de vida.",
    "card1Title": "¿Qué ofrezco?",
    "card1Text": "Creación de contenido orgánico, reseñas honestas y exposición a una audiencia comprometida.",
    "card2Title": "¿Qué busco?",
    "card2Text": "Productos funcionales, estéticos y de calidad que genuinamente usaría en mi día a día.",
    "card3Title": "¿Cómo aplicar?",
    "card3Text": "Envíame un correo con la información de tu marca y el producto propuesto.",
    "cta": "Proponer Colaboración"
  },
  "contact": {
    "title": "Conectemos",
    "subtitle": "¿Lista para crear contenido que impacte?",
    "email": "hola@genesisnieto.com",
    "instagramHandle": "@genesis_nieto",
    "instagramUrl": "https://instagram.com/genesis_nieto",
    "tiktokHandle": "@genesis_nieto",
    "tiktokUrl": "https://tiktok.com/@genesis_nieto",
    "copyright": "© 2025 Génesis Nieto · Todos los derechos reservados"
  },
  "brands": {
    "sectionTitle": "Marcas & Colaboraciones",
    "sectionSubtitle": "Con quienes colaboro o aspiro colaborar",
    "items": [
      { "name": "Aesthetic Active" },
      { "name": "Pure Matcha" },
      { "name": "Glow Skincare" },
      { "name": "Aura Supplements" },
      { "name": "Zen Wear" },
      { "name": "Nourish Foods" },
      { "name": "Lumina Beauty" },
      { "name": "Hydra Labs" }
    ]
  }
}')
on conflict (id) do nothing;
