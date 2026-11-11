-- Pega este archivo en el SQL Editor de Supabase y ejecútalo una vez.
-- Las tres fotos del hero viven en public.hero_panels.
-- La escritura la hace el servidor con la clave secret (pasa por encima de RLS).
-- La lectura pública permite que el sitio muestre las imágenes.

create table if not exists public.hero_panels (
  slot text primary key check (slot in ('left', 'center', 'right')),
  content_type text not null,
  image bytea not null,
  updated_at timestamptz not null default now()
);

create or replace function public.hero_panels_touch()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists hero_panels_touch on public.hero_panels;

create trigger hero_panels_touch
before update on public.hero_panels
for each row
execute function public.hero_panels_touch();

alter table public.hero_panels enable row level security;

drop policy if exists "lectura publica del hero" on public.hero_panels;

create policy "lectura publica del hero"
on public.hero_panels
for select
to anon, authenticated
using (true);

grant select on public.hero_panels to anon, authenticated;

-- Configuración de la portada (animación, líneas, velo, trama, partículas).
-- Ejecutá este bloque si la tabla todavía no existe.

create table if not exists public.hero_config (
  id int primary key default 1 check (id = 1),
  hero_animation int not null default 3,
  divider_width int not null default 10,
  particles boolean not null default true,
  veil boolean not null default true,
  halftone boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.hero_config enable row level security;

drop policy if exists "lectura publica de la portada" on public.hero_config;

create policy "lectura publica de la portada"
on public.hero_config
for select
to anon, authenticated
using (true);

grant select on public.hero_config to anon, authenticated;

alter table public.hero_config
  add column if not exists banner_mode text not null default 'pattern',
  add column if not exists banner_pattern text not null default 'dots',
  add column if not exists banner_color text not null default 'surface',
  add column if not exists banner_base text not null default '110,110,115',
  add column if not exists banner_positions text not null default 'center,center,center',
  add column if not exists banner_links text not null default '["","",""]',
  add column if not exists banner_motion boolean not null default false,
  add column if not exists banner_direction text not null default 'off',
  add column if not exists banner_shade int not null default 0,
  add column if not exists banner_tile int not null default 48,
  add column if not exists banner_gap int not null default 0,
  add column if not exists banner_speed int not null default 16,
  add column if not exists banner_frame text not null default 'classic',
  add column if not exists banner_shadow text not null default 'hard',
  add column if not exists banner_frame_color text not null default '255,255,255',
  add column if not exists banner_hover text not null default 'shake',
  add column if not exists banda1_speed int not null default 16,
  add column if not exists banda1_size int not null default 100,
  add column if not exists banda1_top int not null default 45,
  add column if not exists banda1_tilt int not null default -28,
  add column if not exists banda1_opacity int not null default 92,
  add column if not exists banda1_bright int not null default 100,
  add column if not exists banda2_speed int not null default 16,
  add column if not exists banda2_size int not null default 100,
  add column if not exists banda2_top int not null default 110,
  add column if not exists banda2_tilt int not null default -28,
  add column if not exists banda2_opacity int not null default 92,
  add column if not exists banda2_bright int not null default 100,
  add column if not exists libros_lead text not null default 'Conseguí la edición completa o elegí los temas que más te interesen.',
  add column if not exists libros_stories text not null default '[]',
  add column if not exists libros_heading text not null default '{}',
  add column if not exists logo_animation int not null default 3,
  add column if not exists cover_option int not null default 1,
  add column if not exists cover2_logo text not null default 'cruce',
  add column if not exists cover2_stack boolean not null default false,
  add column if not exists cover2_menu text not null default '[]',
  add column if not exists cover2_slides int not null default 1,
  add column if not exists cover2_slide_motion text not null default 'fundido',
  add column if not exists cover2_slide_every int not null default 0;

create table if not exists public.hero_banners (
  slot text primary key check (slot in ('1', '2', '3', 'bg', 'tile', 'banda1', 'banda2', 'tema1', 'tema2', 'tema3', 'tema4', 'tema5', 'cubo1', 'cubo2', 'cubo3', 'cubo4', 'cubo5', 'profesor', 'librosbg', 'librostile', 'logo', 'portada2', 'portada22', 'portada23', 'portada24', 'portada25', 'portada26', 'logotop')),
  content_type text not null,
  image bytea not null,
  updated_at timestamptz not null default now()
);

alter table public.hero_banners enable row level security;

drop policy if exists "lectura publica de banners" on public.hero_banners;

create policy "lectura publica de banners"
on public.hero_banners
for select
to anon, authenticated
using (true);

grant select on public.hero_banners to anon, authenticated;

alter table public.hero_banners drop constraint if exists hero_banners_slot_check;

alter table public.hero_banners
  add constraint hero_banners_slot_check
  check (slot in ('1', '2', '3', 'bg', 'tile', 'banda1', 'banda2', 'tema1', 'tema2', 'tema3', 'tema4', 'tema5', 'cubo1', 'cubo2', 'cubo3', 'cubo4', 'cubo5', 'profesor', 'librosbg', 'librostile', 'logo', 'portada2', 'portada22', 'portada23', 'portada24', 'portada25', 'portada26', 'logotop'));
