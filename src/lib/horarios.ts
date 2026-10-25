import { NEGOCIO } from "./negocio";

// Horarios de atención. Minutos desde la medianoche: 8:00 = 480.
type Turno = [abre: number, cierra: number];

const SEMANA: Turno[] = [
  [8 * 60, 12 * 60 + 30],
  [16 * 60, 21 * 60 + 30],
];
const FINDE: Turno[] = [
  [9 * 60 + 30, 12 * 60 + 30],
  [16 * 60, 21 * 60 + 30],
];

/** 0 = domingo … 6 = sábado */
export function turnosDelDia(dia: number): Turno[] {
  return dia === 0 || dia === 6 ? FINDE : SEMANA;
}

export const HORARIOS_TEXTO = [
  { dias: "Lunes a viernes", horas: "8:00 – 12:30 · 16:00 – 21:30" },
  { dias: "Sábados y domingos", horas: "9:30 – 12:30 · 16:00 – 21:30" },
];

// Para los datos estructurados de Google (schema.org)
export const HORARIOS_SCHEMA = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "12:30" },
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "16:00", closes: "21:30" },
  { dayOfWeek: ["Saturday", "Sunday"], opens: "09:30", closes: "12:30" },
  { dayOfWeek: ["Saturday", "Sunday"], opens: "16:00", closes: "21:30" },
];

const DIAS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const NOMBRE_DIA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

const hora = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

/** Día y minutos actuales en la hora de Perito Moreno, sin importar dónde esté quien visita. */
function ahoraLocal(fecha: Date) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: NEGOCIO.zonaHoraria,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(fecha);
  const val = (t: string) => partes.find((p) => p.type === t)?.value ?? "0";
  return { dia: DIAS.indexOf(val("weekday")), minutos: Number(val("hour")) * 60 + Number(val("minute")) };
}

export function estadoAhora(fecha = new Date()): { abierto: boolean; texto: string } {
  const { dia, minutos } = ahoraLocal(fecha);
  const hoy = turnosDelDia(dia);

  const actual = hoy.find(([a, c]) => minutos >= a && minutos < c);
  if (actual) return { abierto: true, texto: `Abierto ahora · cierra a las ${hora(actual[1])}` };

  const proximoHoy = hoy.find(([a]) => minutos < a);
  if (proximoHoy) return { abierto: false, texto: `Cerrado · abre a las ${hora(proximoHoy[0])}` };

  const manana = (dia + 1) % 7;
  return {
    abierto: false,
    texto: `Cerrado · abre el ${NOMBRE_DIA[manana]} a las ${hora(turnosDelDia(manana)[0][0])}`,
  };
}
