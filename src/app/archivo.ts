// El archivo: mates, bombillas, accesorios y tazas.
// Para sumar una pieza, copiá un bloque { ... } y cambiale los datos.
// Fotos: public/fotos/archivo/<id>-a.jpg (de frente) y <id>-b.jpg (detalle o en uso).
// Si la foto todavía no está, se muestra un recuadro con la indicación.
//
// ⚠ Estas piezas son de EJEMPLO, armadas con tu lista. Reemplazalas por las reales cuando las cargues.

export type TipoPieza = "mates" | "bombillas" | "accesorios" | "tazas";

export type Pieza = {
  id: string; // sin espacios ni tildes: se usa para el nombre de las fotos
  nombre: string;
  tipo: TipoPieza;
  detalle?: string;
};

export const TIPOS: { id: TipoPieza | "todo"; nombre: string }[] = [
  { id: "todo", nombre: "Todo" },
  { id: "mates", nombre: "Mates" },
  { id: "bombillas", nombre: "Bombillas" },
  { id: "accesorios", nombre: "Accesorios" },
  { id: "tazas", nombre: "Tazas" },
];

export const PIEZAS: Pieza[] = [
  { id: "mate-imperial", nombre: "Mate imperial", tipo: "mates", detalle: "calabaza, cuero y virola de alpaca" },
  { id: "mate-torpedo", nombre: "Mate torpedo", tipo: "mates", detalle: "calabaza de forma alargada" },
  { id: "mate-camionero", nombre: "Mate camionero", tipo: "mates", detalle: "calabaza de boca ancha" },
  { id: "bombilla-alpaca", nombre: "Bombilla de alpaca", tipo: "bombillas" },
  { id: "bombilla-bronce", nombre: "Bombilla de bronce", tipo: "bombillas" },
  { id: "yerbero", nombre: "Yerbero", tipo: "accesorios" },
  { id: "canasta-matera", nombre: "Canasta matera", tipo: "accesorios" },
  { id: "taza-ceramica", nombre: "Taza de cerámica", tipo: "tazas" },
  { id: "jarro", nombre: "Jarro", tipo: "tazas" },
];
