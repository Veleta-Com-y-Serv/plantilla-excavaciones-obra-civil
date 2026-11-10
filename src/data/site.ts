// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
/** Máquina de la sección `maquinaria` (lista `maquinas`). Todo escalar (cadenas); los datos vacíos no se pintan. */
export interface Maquina {
  nombre: string;
  categoria: string;   // «Giratoria», «Camión»… (texto libre)
  capacidad: string;   // «22 t, cazo de 1,2 m³»
  uso: string;         // «Desmontes, sótanos y escollera»
  precio: string;      // siempre cadena («desde 75 €/h»); vacío = no se muestra
  imagen: string;
  [campo: string]: unknown;
}
/** Obra hecha de la sección `trabajos`. */
export interface Trabajo { titulo: string; texto: string; lugar: string; anio: string; categoria: string; imagen: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  maquinas: Maquina[];
  trabajos: Trabajo[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios),
    galeria: lista<string>(s.galeria),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    maquinas: lista<Crudo>(s.maquinas).map((m) => ({
      ...m,
      nombre: texto(m.nombre),
      categoria: texto(m.categoria),
      capacidad: texto(m.capacidad),
      uso: texto(m.uso),
      precio: texto(m.precio),
      imagen: texto(m.imagen),
    })) as Maquina[],
    trabajos: lista<Crudo>(s.trabajos).map((t) => ({
      ...t,
      titulo: texto(t.titulo),
      texto: texto(t.texto),
      lugar: texto(t.lugar),
      anio: texto(t.anio),
      categoria: texto(t.categoria),
      imagen: texto(t.imagen),
    })) as Trabajo[],
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#1d1d20', acento: '#f65311', fondo: '#adaaa5', texto: '#111114', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'GeneralContractor',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);

/** Primera sección activa con ese id o con `tipo:` igual (para el pie: zonas, servicios…). Devuelve su id y sus datos. */
export function buscarSeccion(diseno: string): { id: string; s: Seccion } | null {
  const id = Object.keys(site.secciones).find((k) => site.secciones[k].activa && (k === diseno || site.secciones[k].tipo === diseno));
  return id ? { id, s: site.secciones[id] } : null;
}

/** Número de orden de una sección entre las activas, sin contar la portada («01», «02»…). '' si no está. */
export function numeroSeccion(id: string): string {
  const n = seccionesActivas().filter((k) => k !== 'hero').indexOf(id);
  return n < 0 ? '' : String(n + 1).padStart(2, '0');
}

/** ¿Enlace a otra web (se abre en pestaña nueva)? */
export const externo = (url?: string) => /^https?:\/\//.test(url ?? '');

/** Letras de la palabra más larga de un texto (mínimo 6). Los titulares en Oswald mayúscula se ajustan a ella
 * (variable `--l` en src/styles/global.css) para que ninguna palabra se parta, ni «Impermeabilizaciones» a 375 px. */
export const largo = (t?: unknown): number =>
  Math.max(6, ...String(t ?? '').split(/[\s/]+/).map((p) => p.replace(/[^\p{L}\p{N}]/gu, '').length));

/** Clave sin tildes ni espacios para clases y filtros («En construcción» → «en-construccion»). */
export const clave = (t = '') =>
  t.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
