# PAGE_TOPOLOGY — meech213.com/photo

Orden visual (z-index ascendente):

| Capa | Elemento | Comportamiento |
| --- | --- | --- |
| 0 | WebGL canvas | Scroll/drag horizontal, click → proyecto |
| 1 | Ghost nav (PHOTO, ABOUT, BOOK, HOME) | Estático, decorativo |
| 2 | Header (Back, logo, social) | Fijo en viewport |
| 50 | Footer + clock menu | Fijo; subnav filtra categorías |

Interacción principal: **scroll-driven gallery** (no tabs de página; el menú reloj es navegación global + filtro en Photo).
