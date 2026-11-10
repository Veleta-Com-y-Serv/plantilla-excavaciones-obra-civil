# Plantilla NoExpertise · Excavaciones y obra civil

Web de hormigón y naranja de obra para empresas de excavaciones: maquinaria con conductor, obras hechas y zonas.

- Sectores: excavaciones, obra-civil, derribos, alquiler-maquinaria, aridos. Estilo: formwork (tema Formwork de Hallmark). Plan mínimo: gratis.
- Secciones: hero, servicios, maquinaria, cifras, trabajos, para-quien, zonas, proceso, preguntas, contacto (+ `texto` genérico).
- Campos propios: `hero.pie_foto`, `hero.items[]` (titulo), `servicios.items[]` (titulo, texto, detalle), `maquinaria.maquinas[]` (nombre, categoria, capacidad, uso, precio, imagen, detalle), `maquinaria.nota`, `maquinaria.cta`, `trabajos.trabajos[]` (titulo, lugar, anio, categoria, texto, imagen), `zonas.items[]` (titulo, texto), `zonas.titulo_pagina`, `zonas.texto_pagina`, `contacto.opciones`.
- Diseño a ancho completo: portada «poster» con la foto a sangre y una placa de tinta, índice de servicios entre filetes, raíl de máquinas que sale hasta el borde, una cifra colada en placa, obras en fotos grandes (la primera a 21:9), banda de tinta «para quién», zonas con foto fija, pasos numerados y contacto con el teléfono enorme. Brief en `DISEÑO.md`.
- Páginas propias: cada servicio y cada máquina con `detalle` (`/servicios/<slug>/`, `/maquinaria/<slug>/`) y cada zona con `texto` (`/zonas/<slug>/`, «Excavaciones en Caspe»).
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio (`GeneralContractor`) y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas`. Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente (13 pasos) en `template.yaml`; reglas para el agente en `CLAUDE.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Tipografías Oswald, Archivo y Archivo Narrow (SIL Open Font License 1.1, `public/fuentes/LICENCIAS.md`). Fotos de ejemplo generadas con IA para esta plantilla; relleno (`public/placeholders/`) sin licencias de terceros.
