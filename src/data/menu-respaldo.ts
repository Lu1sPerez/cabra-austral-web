// Menú de respaldo: solo se muestra si la web no puede conectarse a Supabase
// (por ejemplo, antes de cargar las variables de entorno). El menú real sale del POS.

export const CATEGORIAS_RESPALDO: { nombre: string; productos: string[] }[] = [
  {
    nombre: "Café",
    productos: [
      "Expreso",
      "Cortado",
      "Latte",
      "Flat white",
      "Capuccino italiano",
      "Capuccino saborizado",
      "Mocaccino",
      "Café con leche vegetal",
    ],
  },
  { nombre: "Té", productos: ["Té en hebras"] },
  {
    nombre: "Bebidas",
    productos: ["Frapuccino", "Milkshake de Nutella", "Milkshake de frutos rojos", "Licuados", "Batidos"],
  },
  {
    nombre: "Panadería",
    productos: ["Medialunas", "Chipá", "Croissants", "Tostados", "Scones de queso", "Roll del día"],
  },
  {
    nombre: "Pastelería",
    productos: [
      "Cheesecake",
      "Mini cakes",
      "Cookies de Nutella",
      "Cookies de pistacho",
      "Cookies red velvet",
      "Budín",
    ],
  },
  { nombre: "Alfajores", productos: ["Alfajores artesanales"] },
];

export const PROMOS_RESPALDO = [
  "2 medialunas con café o té",
  "2 tostadas con café o té",
  "Tostado campero con 2 cafés",
];
