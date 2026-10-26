# Stack: Next 16 + React 19 + Tailwind v4 + shadcn/ui + pnpm

El sitio se construye con Next.js 16 (App Router, `cacheComponents`), React 19,
Tailwind v4 y shadcn/ui sobre pnpm, desplegado en Vercel. Es la combinación con
mejor soporte actual y con la que trabaja el ecosistema de agentes del proyecto.

Es difícil de revertir porque los tokens de Tailwind v4 (`@theme` CSS-first, sin
`tailwind.config.js`) y el theming por variables CSS de shadcn condicionan toda
la UI. Se eligió porque el registro editorial que buscamos necesita control
tipográfico fino y un design system propio; shadcn deja los componentes abiertos
a sobre-escribirlos, cosa que un kit cerrado no permite.

Ver `DESIGN.md`: los tokens del sistema de diseño son la fuente de verdad y
shadcn se alinea a ellos, no al revés.
