# Contenido estático en TypeScript, sin CMS ni autenticación

Las piezas y los documentos se definen como arrays tipados en
`src/content/piezas.ts` y `src/content/documentos.ts`. No hay base de datos, ni
CMS headless, ni panel de administración, ni login.

Sorprendería a un lector futuro que una web de un artista no tenga forma de
editarla sin tocar código. Se decidió así porque el volumen de contenido es
pequeño y muy estable, y porque el type-safety de TypeScript cubre lo que un CMS
aportaría aquí (validación de estructura). La alternativa real —MDX o un CMS
headless— se descarta por el coste de infraestructura y de mantenimiento.

El modelo está aislado en `src/content/`: migrar a MDX o a un CMS consiste en
cambiar esos dos módulos sin tocar la UI. Es reversible.
