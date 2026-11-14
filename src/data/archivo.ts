// El archivo: mates, bombillas, accesorios y tazas.
// Para sumar una pieza, copiá un bloque { ... } y cambiale los datos (nombreEn y detalleEn son para la versión en inglés).
// Fotos: public/fotos/archivo/<id>-a.jpg (de frente) y <id>-b.jpg (detalle o en uso).
// Si la foto todavía no está, se muestra un recuadro con la indicación.
//
// ⚠ Estas piezas son de EJEMPLO, armadas con tu lista. Reemplazalas por las reales cuando las cargues.

export type TipoPieza = "mates" | "bombillas" | "accesorios" | "tazas";

export type Pieza = {
  id: string; // sin espacios ni tildes: se usa para el nombre de las fotos
  nombre: string;
  nombreEn: string; // el nombre en la versión en inglés
  tipo: TipoPieza;
  detalle?: string;
  detalleEn?: string;
};

export const TIPOS: { id: TipoPieza | "todo"; nombre: string; nombreEn: string }[] = [
  { id: "todo", nombre: "Todo", nombreEn: "All" },
  { id: "mates", nombre: "Mates", nombreEn: "Mates" },
  { id: "bombillas", nombre: "Bombillas", nombreEn: "Bombillas" },
  { id: "accesorios", nombre: "Accesorios", nombreEn: "Accessories" },
  { id: "tazas", nombre: "Tazas", nombreEn: "Cups & mugs" },
];

export const PIEZAS: Pieza[] = [
  { id: "mate-imperial", nombre: "Mate imperial", nombreEn: "Imperial mate", tipo: "mates", detalle: "calabaza, cuero y virola de alpaca", detalleEn: "gourd, leather and alpaca silver rim" },
  { id: "mate-torpedo", nombre: "Mate torpedo", nombreEn: "Torpedo mate", tipo: "mates", detalle: "calabaza de forma alargada", detalleEn: "elongated gourd" },
  { id: "mate-camionero", nombre: "Mate camionero", nombreEn: "Camionero mate", tipo: "mates", detalle: "calabaza de boca ancha", detalleEn: "wide-mouth gourd" },
  { id: "bombilla-alpaca", nombre: "Bombilla de alpaca", nombreEn: "Alpaca silver bombilla", tipo: "bombillas" },
  { id: "bombilla-bronce", nombre: "Bombilla de bronce", nombreEn: "Bronze bombilla", tipo: "bombillas" },
  { id: "yerbero", nombre: "Yerbero", nombreEn: "Yerba canister", tipo: "accesorios" },
  { id: "canasta-matera", nombre: "Canasta matera", nombreEn: "Mate basket", tipo: "accesorios" },
  { id: "taza-ceramica", nombre: "Taza de cerámica", nombreEn: "Ceramic cup", tipo: "tazas" },
  { id: "jarro", nombre: "Jarro", nombreEn: "Mug", tipo: "tazas" },
];
