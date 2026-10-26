# Portafolio híbrido: landing con anclas + rutas propias para piezas y documentos

La home es una sola página con secciones ancladas (`#portafolio`,
`#documentos`, `#bio`, `#contacto`), pero las piezas tienen URL propia
(`/portafolio/[slug]`) y los documentos otra (`/documentos`).

Un sitio puramente single-page habría sido más simple, pero las piezas no
habrían sido compartibles ni indexables de forma individual, y un catálogo de
obras sin URL por obra no sirve para prensa ni para que un coleccionista envíe
un enlace. La opción contraria —una ruta por sección— habría roto la lectura
continua que pide un portafolio de arte.

El coste asumido es tener dos superficies de contenido (la sección `#documentos`
de la home y la ruta `/documentos`), resueltas compartiendo el mismo componente
`DocumentoList`.
