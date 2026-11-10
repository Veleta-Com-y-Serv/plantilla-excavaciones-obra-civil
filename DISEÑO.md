# Excavaciones y obra civil: brief de diseño

Plantilla `excavaciones-obra-civil` creada el 10/11/2026 a partir de `construccion-promotora` con `php artisan plantillas:nueva`
y rediseñada entera con el tema **Formwork** de la skill Hallmark (género editorial). De la base solo queda la estructura técnica.
Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: empresas de excavaciones, movimiento de tierras y obra civil (sectores `excavaciones`, `obra-civil`,
  `derribos`, `alquiler-maquinaria`, `aridos`): desmontes y explanaciones, zanjas y canalizaciones, derribos, urbanizaciones,
  caminos y pistas, muros de escollera, transporte de áridos y alquiler de maquinaria con conductor. Trabajan para
  constructoras, ayuntamientos, agricultores y particulares. Su cliente quiere ver el parque de maquinaria, obras hechas con
  fotos grandes, en qué zona trabajan y pedir presupuesto o disponibilidad por teléfono.
- **Qué tiene que conseguir la web**: que **llamen o pidan presupuesto**. Botón naranja «Pedir presupuesto» en la cabecera y
  en la portada, teléfono en la cabecera (pantallas anchas) y enorme en contacto; en móvil, botón de llamar en la cabecera y
  barra fija con «Llamar» y «Presupuesto».
- **Tono**: el de un encargado de obra: qué se hace, con qué máquina, dónde y para quién. Tuteo, frases cortas, cada cifra
  con su unidad. Sí: la pizarra de la caseta de obra, el hormigón visto, el naranja de seguridad. No: la página de franjas
  amarillas y negras de «peligro» ni el portafolio brillante de arquitectura; tampoco la piel azul acero de `construccion-promotora`.

## Tema Hallmark y cómo se ha traducido

Formwork (`references/themes/formwork.md`, vertido `cast`): papel de hormigón gris cálido con grano, tinta casi negra,
Oswald 700 en mayúsculas sobre Archivo, Archivo Narrow para cifras y medidas, esquinas vivas, sombras duras sin desenfoque,
fotos en blanco y negro duro y una sola señal naranja de obra por debajo del 5 % de la pantalla.

- **Cuatro colores** → `fondo` = papel de hormigón (`#adaaa5`, oklch 74 % 0,008 80), `texto` = tinta (`#111114`),
  `acento` = naranja de obra (`#f65311`: botón principal, la marca bajo la cifra grande, el foco), `primario` = banda de tinta
  (`#1d1d20`: cabecera, placa de la portada, «para quién», pie).
- **Derivados** (`src/styles/global.css`): `--papel-2` (la «colada» más oscura de maquinaria y contacto), `--papel-3`,
  `--placa` (papel claro de las placas, con `oklch(from …)` +0,08 de luz), `--tinta-2`, `--apagado` (≥ 4,5:1 sobre papel y
  papel-2), `--filete`, `--acento-hondo` (sombra del botón levantado), `--foco`, `--sobre-primario` y `--sobre-acento` (texto
  claro u oscuro según el color del cliente, con `oklch(from …)`; sin soporte, claro sobre primario y tinta sobre el acento).
  Probado con primario azul marino, acento amarillo y papel casi blanco: legible y con el mismo carácter.
- **Material**: grano de hormigón por SVG en línea (multiplicado sobre el papel, tamizado sobre la tinta), barras de tinta de
  3 px encima de cada lista o tabla y filetes finos entre filas, placas (papel claro, borde de 3 px y sombra dura de 6 px)
  solo para la cifra y el formulario, botón naranja levantado sobre su sombra que se hunde 3 px al pulsar y botón gris hundido,
  fotos con marco de tinta de 2 px y tratamiento `grayscale(1) contrast(1.35) brightness(1.08)` por CSS (también las del
  cliente). Movimiento: solo el pulsado de los botones y el subrayado del menú.
- **Firma**: el parque de maquinaria en fila, como en la campa: un raíl que sale del contenedor hasta el borde de la ventana,
  cada máquina con su foto, su tipo, su nombre en Oswald y sus datos (capacidad, para qué, precio por hora) entre filetes en
  Archivo Narrow.

## Tipografías y licencias

Oswald 700 (Vernon Adams y otros), Archivo 400 y 500 y Archivo Narrow 500 (Omnibus-Type), todas **OFL-1.1**, woff2 `latin` de
Fontsource en `public/fuentes/` (54 KB en total), `font-display: swap`, respaldo del sistema de la misma clase y `preload` solo
de Oswald. Archivo Narrow es la anchura estrecha de la misma superfamilia Archivo y el tema la declara para cifras.

**Titulares sin palabras partidas**: Oswald 700 en mayúsculas mide 12,9 em para «IMPERMEABILIZACIONES». Cada titular lleva
`--l` = letras de su palabra más larga (`largo()` en `src/data/site.ts`) y su tamaño es
`min(máximo, 100cqi / (--l × 0,68))` sobre su propio contenedor: los titulares de palabras cortas salen grandes y uno con una
palabra de 20 letras baja lo justo para caber en su columna, a 375 px y en escritorio. `overflow-wrap: normal`,
`hyphens: manual`. Interlineado 1,16-1,18 (el tema pide 1,0-1,05, pero las tildes de las mayúsculas de Oswald, Á, Ó, Ñ, chocan
con la línea de arriba por debajo de 1,15).

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | foto | Poster: foto a sangre bajo la cabecera, placa de tinta abajo a la izquierda (en móvil, foto arriba y placa debajo) |
| 2 | `servicios` | papel | índice: cabeza partida y una fila por servicio con nombre en Oswald, línea y enlace a su página |
| 3 | `maquinaria` | colada | raíl de máquinas (firma), nota de condiciones y botón «Preguntar disponibilidad» |
| 4 | `cifras` | papel | la primera cifra en placa a 14 rem con marca naranja; las demás en filas |
| 5 | `trabajos` | papel | obras en fotos grandes: la primera a 21:9, luego parejas 7/5 y 5/7 |
| 6 | `para-quien` | tinta | la frase grande y los tipos de cliente en columnas con filetes verticales |
| 7 | `zonas` | papel | foto de la comarca fija y pueblos en filas, enlazados a su página |
| 8 | `proceso` | papel | pasos de vertido: `<ol>` con números en Oswald bajo una barra de tinta |
| 9 | `preguntas` | papel | titular fijo a la izquierda y filas `details` con signo cuadrado |
| 10 | `contacto` | colada | teléfono enorme, datos en filas y formulario en placa |
| — | pie | tinta | nombre como mástil, cuatro columnas, barra fija del móvil |

Se alternan bandas guiadas por foto (portada, maquinaria, obras, zonas) con bandas que solo hace el material (índice, placa,
banda de tinta, pasos, filas); nunca dos de foto seguidas.

## Listas propias y páginas

- `maquinaria.maquinas` {nombre, categoria, capacidad, uso, precio, imagen, detalle}, `trabajos.trabajos` {titulo, lugar,
  anio, categoria, texto, imagen}, `servicios.items` {titulo, texto, detalle}, `para-quien.items`, `zonas.items`,
  `proceso.items`, `cifras.items`.
- Fichas: cada servicio con `detalle` en `/servicios/<slug>/` y cada máquina con `detalle` en `/maquinaria/<slug>/`
  (`Service`); cada zona con `texto` en `/zonas/<slug>/` («Excavaciones en {zona}»), con las obras cuyo `lugar` la nombra.
- Varias páginas recomendadas: Servicios (servicios, zonas), Maquinaria, Obras hechas, Contacto (proceso, preguntas, contacto);
  Inicio se queda con la portada, las cifras y «para quién».
- Guion del asistente: 13 pasos propios (empresa, contacto, servicios, máquinas, cómo alquiláis, obras, para quién, zonas,
  cómo trabajáis, preguntas, fotos, colores y logo, repaso) más los dos pasos de fichas que añade la plataforma.

## Fotos

12 fotos generadas con IA a partir de `fotos.json` (giratoria en un desmonte para la portada, retro mixta, giratoria
cargando un camión, miniexcavadora en un patio de piedra, camión bañera, rodillo, explanación para nave, zanja en calle del
Matarraña, escollera junto al río, camino rural, derribo de un almacén y paisaje del Bajo Aragón). Sin texto, sin logotipos,
sin caras: tres se repitieron porque salían emblemas o letras en las máquinas. La herramienta da 1024×1024: la portada sale a
1536 px (×1,5 como mucho) y el resto a 1200×900; el blanco y negro duro disimula la blandura, pero conviene que el cliente
ponga las suyas.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como letra menuda en caja normal (Hallmark prohíbe el antetítulo).
- `cifras` lleva cifras de un negocio ficticio en el ejemplo (Hallmark prohíbe inventarlas); la plataforma deja la sección
  desmarcada y vacía al crear una web.
- Los `items` de la portada la plataforma los trata como cifras: no van en el guion.
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera al ir en línea) y `comun.css`
  (común a todas las plantillas) trae un color literal y etiquetas del pie en mayúsculas que aquí se anulan; sloplint lo marca.
- Interlineado de titulares por encima del del tema, por las tildes (arriba).
- Más de 450 palabras en la
  portada: es contenido que el cliente necesita.
- Las fotos van siempre en blanco y negro (material del tema), también las del cliente; si un cliente quiere color, es un
  cambio de diseño en `.foto > img`.

## Ajuste del coordinador (10/11/2026)

Las fotos de «Obras hechas» (sección y páginas de zona) y las galerías de las fichas van en su color (`.foto--color`): el cliente enseña la obra tal cual. El blanco y negro duro del tema se queda en la portada, la maquinaria y las cabeceras de ficha.
