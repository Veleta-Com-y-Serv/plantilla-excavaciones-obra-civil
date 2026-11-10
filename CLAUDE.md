# Plantilla «Excavaciones y obra civil» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **formwork**
(tema Formwork de Hallmark: papel de hormigón gris cálido con grano, tinta casi negra, Oswald 700 en mayúsculas para
titulares, Archivo para leer y Archivo Narrow para cifras, esquinas vivas, sombras duras, fotos en blanco y negro duro y
una sola señal naranja de obra). Brief completo en `DISEÑO.md`. Todo en castellano de España, frases cortas, tuteo.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa (listas propias `maquinas` y `trabajos` normalizadas con `lista<T>()`; `largo()` da la palabra más larga de un titular). No pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (fondo = papel de hormigón, texto = tinta, acento = naranja del botón, una cifra y el foco, primario = banda de tinta de la cabecera, «para quién» y el pie). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los derivados (`--papel-2`, `--papel-3`, `--placa`, `--tinta-2`, `--apagado`, `--filete`, `--acento-hondo`, `--foco`, `--sobre-primario`, `--sobre-acento`) se calculan con `color-mix` y `oklch(from …)` en `src/styles/global.css`: el texto sobre el primario y sobre el acento se elige solo (claro u oscuro).
- **Tipografías**: alojadas en `public/fuentes/` (Oswald 700, Archivo 400 y 500, Archivo Narrow 500; licencias en `public/fuentes/LICENCIAS.md`). No añadas fuentes externas.
- **Aspecto general**: `src/styles/global.css` (bandas `.banda--papel`, `.banda--colada`, `.banda--tinta`; `.placa` con sombra dura; botones `.btn`/`.btn-acento` naranja levantado y `.btn-sec` gris hundido; `.foto` con tratamiento en blanco y negro y `.foto--marco`; titulares que se ajustan a su palabra más larga con `--l`).
- **Cabecera**: `src/components/Header.astro` (losa de tinta fija, teléfono y botón `boton_cabecera`). **Pie**: `src/components/Footer.astro` (nombre enorme, cuatro columnas y barra fija del móvil con «Llamar» y «Presupuesto»).
- **Imágenes**: fotos en `public/fotos/` (generadas desde `fotos.json`), respaldo `public/placeholders/foto.svg`. En `site.yaml` con ruta absoluta (`/fotos/giratoria.jpg`). Las fotos se ven en blanco y negro por CSS (también las del cliente): no las conviertas en el fichero.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = el nombre en Oswald.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (se oculta solo con `false`).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`. Todas son bandas a todo el ancho.
- `hero` → portada «poster»: foto a sangre y placa de tinta con titular, frase, dos botones y datos cortos (`items`, solo `titulo`); `pie_foto` es la etiqueta de la foto.
- `servicios` → índice de servicios entre filetes (`items` {titulo, texto, detalle}); con `detalle`, página propia.
- `maquinaria` → raíl de máquinas (firma): `maquinas` {nombre, categoria, capacidad, uso, precio, imagen, detalle}, `nota` y `cta`.
- `cifras` → la primera cifra en una placa enorme y el resto en filas (`items` {titulo = cifra, texto}). Sin cifras no se pinta. Nunca inventes cifras.
- `trabajos` → obras hechas en fotos grandes (`trabajos` {titulo, lugar, anio, categoria, texto, imagen}; la primera a todo el ancho).
- `para-quien` → banda de tinta con la frase grande y los tipos de cliente en columnas (`items` {titulo, texto}).
- `zonas` → foto de la comarca y pueblos en filas (`items` {titulo, texto}; con `texto`, página propia), `titulo_pagina` y `texto_pagina` con `{zona}` y `{negocio}`.
- `proceso` → pasos numerados de verdad (`<ol>`, `items` {titulo, texto}).
- `preguntas` → filas `details/summary` (sin preguntas no se pinta).
- `contacto` → teléfono enorme, datos en filas y formulario (mailto) en placa; `opciones` = desplegable «Me interesa» separado por «;».
- `texto` → apartado genérico para secciones nuevas (`tipo: texto`); con imagen, foto y texto lado a lado.

## Campos propios de esta plantilla (además del esquema común)
- `hero.pie_foto` (texto corto) y `hero.items[]` `{ titulo }` (la plataforma los trata como cifras: no se inventan).
- `maquinaria.maquinas[]`: todo cadenas. `precio` siempre **cadena** («desde 48 €/h»); vacío = no se muestra. `nota` (condiciones del alquiler) y `cta` (botón bajo el raíl; sin él, «Preguntar disponibilidad» a contacto).
- `trabajos.trabajos[]`: `anio` cadena; `lugar` sirve también para enlazar la obra con la página de su zona.
- `zonas.titulo_pagina`, `zonas.texto_pagina` y `zonas.items[].texto` (60-150 palabras = página propia).
- `contacto.opciones` y `contacto.cta.texto` (texto del botón de enviar; por defecto «Pedir presupuesto»).

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, horarios, fotos, máquinas u obras**: solo en `site.yaml`. Si un texto contiene comas o «: » dentro de `{ … }`, ponlo entre comillas.
4. **Listas planas**: ningún elemento de lista puede llevar otra lista dentro. Máximo 24 elementos por lista. Precios siempre entre comillas.
5. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor con `tipo:` (`tipo: texto`, `tipo: servicios`, `tipo: trabajos`…) y un id propio en `site.yaml`. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` copiando la estructura de una existente (`seccion(Astro.props.id)`, `Banda`, `Titular`). `src/pages/index.astro` la recoge sola.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/[...pagina].astro`, `tailwind.config.mjs`, `src/styles/comun.css`, `src/lib/*.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts` salvo orden explícita de diseño: son comunes a todas las plantillas o el SEO de base. Los ids `hero` y `contacto` no se cambian. `seo.url` y `seo.indexable` los pone la plataforma.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro`, sin JavaScript nuevo salvo necesidad real (solo hay uno mínimo: cierre del menú móvil), 16 px de margen lateral en móvil, sin scroll horizontal, titulares sin palabras partidas (usa `style="--l:…"` con `largo()` en titulares nuevos), una sola señal naranja por pantalla, esquinas vivas. `alt` de las fotos sacado del contenido; las decorativas, `alt=""`.
9. El formulario no tiene servidor: abre el correo (`mailto`). La plataforma lo conecta a su envío al publicar. No cambies su marcado.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento y zonas)
- Espejo de `fichas:`/`zonas:` de template.yaml en `src/data/fichas.ts`: `secciones.servicios.items` → `/servicios/<slug>/` (servicio) y `secciones.maquinaria.maquinas` → `/maquinaria/<slug>/` (máquina), con `src/pages/[coleccion]/[slug].astro`; cada zona con `texto` → `/zonas/<slug>/` con `src/pages/zonas/[slug].astro`.
- **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página. Opcionales: `slug` (no lo pongas sin motivo) e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
- Una orden «añade una página para X» = escribir su `detalle` (o el `texto` de la zona) en site.yaml. Nunca crees a mano páginas en `src/pages/servicios/`, `src/pages/maquinaria/` ni `src/pages/zonas/`.

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "servicios; zonas" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Reparto recomendado en `template.yaml → paginas` (Servicios, Maquinaria, Obras hechas, Contacto). Sin la clave, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
