/** Reglas de uso del design system (documentación /desing-system). */

export const dsDesignPrinciples = [
  "Este design system es obligatorio en todo el sitio: tokens, reglas y componentes documentados en /desing-system (ADR 0004).",
  "Los botones primarios se reservan para la acción principal de la pantalla (una por vista).",
  "Las cards comparten el mismo padding, radio y sombra; no mezclar variantes ad hoc.",
  "Las secciones respetan la escala vertical (64px / 96px entre bloques en desktop).",
  "Los colores semánticos (éxito, error, info) no se usan como decoración.",
  "Las animaciones acompañan el cambio de estado; no distraen ni bloquean la navegación.",
  "Los componentes se reutilizan; evitar copias casi idénticas con clases distintas.",
  "El contraste de texto cumple AA sobre el fondo donde se aplique.",
  "Siempre definir foco visible en controles interactivos.",
] as const;

export const dsSectionGuidelines = {
  color: {
    title: "Qué define esta sección",
    items: [
      "Primarios: coral (--ds-coral) para CTA, enlaces activos y énfasis de marca.",
      "Secundarios: tonos de pintura (azul, rojo, naranja, amarillo) para acentos puntuales, no para cuerpo de texto.",
      "Neutros: fondos (--ds-bg, --ds-surface), texto (--ds-ink, --ds-muted) y líneas (--ds-line).",
      "Semánticos: verde éxito, rojo error, cielo info — solo en feedback y validación.",
      "Fondos: canvas claro por defecto; superficie blanca para tarjetas y paneles elevados.",
    ],
  },
  tipo: {
    title: "Qué define esta sección",
    items: [
      "Familias: Barlow Condensed (display y UI en mayúsculas), Inter (cuerpo y formularios).",
      "Pesos: 600–700 en display; 400–600 en cuerpo según jerarquía.",
      "Escala: display → h1 → h2 → h3 → lead → body → small → micro.",
      "Line-height: titulares 1.05–1.2; cuerpo 1.6; metadata compacta 1.35.",
      "Letter-spacing: titulares -0.02em a -0.01em; eyebrows y botones +0.04em a +0.14em.",
      "Jerarquía: una sola vía de lectura por bloque (título → lead → cuerpo).",
    ],
  },
  espaciado: {
    title: "Qué define esta sección",
    items: [
      "Escala base 4px: solo usar los tokens --ds-space-* documentados.",
      "Padding interno de componentes: 16–24px (chips) hasta 32–48px (paneles).",
      "Gap en filas y grillas: 16px móvil, 24–32px desktop.",
      "Ritmo de sección: más espacio arriba del título que debajo del bloque anterior.",
      "No mezclar valores arbitrarios (p. ej. 18px) fuera de la escala.",
    ],
  },
  forma: {
    title: "Qué define esta sección",
    items: [
      "Botones e inputs de la UI base: radios sm–lg (6–10px).",
      "Modo sticker: --ds-radius-sticker (12px) y borde 2px.",
      "Tarjetas de la UI base: radio lg–xl (10–12px).",
      "Pills y barras de progreso: radius pill.",
      "Misma familia de radio por tipo de componente en toda la UI.",
    ],
  },
  sombras: {
    title: "Qué define esta sección",
    items: [
      "xs–sm: controles en reposo o hover ligero.",
      "md: cards y paneles por defecto.",
      "lg–float: modales, menús flotantes o elementos que se superponen al contenido.",
      "Un nivel de elevación por capa; no acumular sombras fuertes en elementos anidados.",
      "Preferir borde hairline si el fondo ya separa suficientemente el bloque.",
    ],
  },
  bordes: {
    title: "Qué define esta sección",
    items: [
      "Hairline 1px --ds-line: separadores, inputs en reposo, contornos de tarjetas.",
      "Strong 2px --ds-line-strong: énfasis editorial puntual, no en cada card.",
      "Contorno claro sobre fondos oscuros (hero): 1px blanco o surface.",
      "Separadores de sección: línea horizontal full-width, nunca doble borde + sombra.",
    ],
  },
  movimiento: {
    title: "Qué define esta sección",
    items: [
      "150ms (--ds-duration-fast): hover, color, borde.",
      "200ms (--ds-duration-base): imágenes, paneles, tabs.",
      "600ms (--ds-duration-slow): revelados y entradas puntuales.",
      "Easing: --ds-ease-out en todas las transiciones UI.",
      "Los keyframes y demos viven en la sección Animaciones.",
    ],
  },
  animaciones: {
    title: "Qué define esta sección",
    items: [
      "Texto: escalonado, máscara, highlight, tracking, shake de error y cifras con pop.",
      "Imagen: opacidad, zoom, blur, crossfade, slide, Ken Burns, wipe y marco pulsante.",
      "UI: skeleton, progreso, spinner, live dot, acordeón, foco y toast.",
      "Sin bounce ni parallax en producción; el pan horizontal es solo referencia en esta página.",
      "Respetar prefers-reduced-motion: estados finales visibles sin depender del movimiento.",
    ],
  },
  formularios: {
    title: "Qué define esta sección",
    items: [
      "Cada campo lleva label visible asociado (for / aria-labelledby).",
      "Placeholder no sustituye al label.",
      "Errores bajo el campo, con aria-invalid y mensaje en role=\"alert\".",
      "Foco visible igual que en botones (anillo coral).",
      "Ayuda opcional en texto secundario (--ds-muted), no en el label.",
    ],
  },
  feedback: {
    title: "Qué define esta sección",
    items: [
      "Info: contexto o recordatorio sin bloquear la tarea.",
      "Éxito: confirmación breve tras una acción (copiar, guardar).",
      "Error: qué falló y cómo recuperarse; tono directo, sin culpar al usuario.",
      "Vacío: explicar por qué no hay datos y ofrecer un siguiente paso.",
      "Toast (futuro): mensajes breves, auto-dismiss, no para errores críticos.",
      "Carga: skeleton o indicador; no sustituir todo el layout por un spinner.",
    ],
  },
  componentes: {
    title: "Qué define esta sección",
    items: [
      "API propia en `components/desing-system/ui` (DsButton, DsCard, DsField…).",
      "Implementación: Radix + piezas de shadcn en `components/ui`, estilos en desing-system-ui.css.",
      "Interacción primaria con `--ds-accent`; coral y pintura solo en marca y paleta.",
      "Estados: hover sutil, foco con anillo azul, disabled con opacidad reducida.",
      "Todo el sitio consume este DS; no duplicar patrones en el portafolio con estilos ajenos.",
    ],
  },
  inspiracion: {
    title: "Qué define esta sección",
    items: [
      "Capa opcional: `.ds-play-scope` y tokens `--ds-play-*` (alias de la paleta).",
      "Sticker: bordes 2px, radio 12px, sin sombras — superficies planas.",
      "Coral = CTA relleno; azul pintura = secundario; gris = cuerpo.",
      "Display Nunito solo en bloques de este modo, no en el portafolio editorial.",
      "No mezclar modo sticker y UI base en la misma tarjeta sin intención clara.",
    ],
  },
} as const;
