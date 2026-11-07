# BEHAVIORS — meech213.com/photo

## Canvas / galería

- Arrastre horizontal con puntero (grab/grabbing).
- Rueda del mouse desplaza la tira (eje vertical mapeado a scroll horizontal).
- Click en tarjeta si no hubo drag significativo → navega al slug del proyecto.

## Clock menu

- Photo es estado activo en `/photo`.
- Botones ALL / Beauty / … filtran tarjetas visibles (implementado en clon).
- Enlaces About, Video, Home, Book apuntan a rutas del sitio de referencia (en clon Gray: placeholders o `#` según contexto).

## Header

- **Back**: history back (referencia).
- Logo: enlace al home de Meech213.

## Responsive

- Dial del menú escala con `min(80vw, 800px)`; subnav pasa a columna en `<768px` (CSS clon).

## No observado en clon

- Smooth scroll Lenis en documento (referencia usa `html.lenis`).
- Hover states complejos en tarjetas WebGL (referencia puede usar shaders).
