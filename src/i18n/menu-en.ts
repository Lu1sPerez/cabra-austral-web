// Traducciones al inglés del menú que llega del POS.
// A la izquierda, el nombre tal como está en el POS (no importan las tildes ni las mayúsculas).
// A la derecha, cómo se ve en la versión en inglés de la web.
//
// Si cargás un producto nuevo en el POS y no lo agregás acá, en inglés se ve con su nombre en castellano.
// Para saber cuáles faltan, abrí /estado-menu: al final aparece la lista "sin traducción al inglés".
// Para sumar uno, copiá una línea y cambiale los dos textos. Las promos de la semana se traducen igual.

export const CATEGORIAS_EN: Record<string, string> = {
  "Calientes": "Hot drinks",
  "Café": "Coffee",
  "Té en hebras": "Loose-leaf tea",
  "Té": "Tea",
  "Bebidas frías": "Cold drinks",
  "Bebidas": "Drinks",
  "Panadería": "Bakery",
  "Pastelería": "Pastries",
  "Alfajores": "Alfajores",
  "Otros": "Other",
};

export const PRODUCTOS_EN: Record<string, string> = {
  // Calientes
  "Chocolatada caliente": "Hot chocolate",
  "Matcha": "Matcha",
  "Matcha latte": "Matcha latte",
  "Servicio de mate": "Yerba mate service",

  // Café
  "Espresso": "Espresso",
  "Expreso": "Espresso",
  "Doble espresso": "Double espresso",
  "Machiato": "Macchiato",
  "Cortado": "Cortado",
  "Americano": "Americano",
  "Americano taza": "Large Americano",
  "Capuccino": "Cappuccino",
  "Latte": "Latte",
  "Latte saborizado": "Flavored latte",
  "Flat white": "Flat white",
  "Lágrima": "Lágrima (milk with a dash of coffee)",
  "Capuccino italiano": "Italian cappuccino",
  "Capuccino saborizado": "Flavored cappuccino",
  "Mocaccino": "Mochaccino",
  "Cafe leche vegetal": "Coffee with plant-based milk",
  "Café con leche vegetal": "Coffee with plant-based milk",

  // Té
  "Té en hebras": "Loose-leaf tea",

  // Bebidas frías
  "Cold brew": "Cold brew",
  "Ice latte": "Iced latte",
  "Ice latte saborizado": "Flavored iced latte",
  "Iced caramel machiato": "Iced caramel macchiato",
  "Frapuccino": "Frappuccino",
  "Chocolatada": "Chocolate milk",
  "Milkshake de Oreo": "Oreo milkshake",
  "Milkshake de frutos rojos": "Red berry milkshake",
  "Milkshake de estación": "Seasonal milkshake",
  "Milkshake de Nutella": "Nutella milkshake",
  "Licuados al agua": "Fruit smoothies, blended with water",
  "Licuados": "Fruit smoothies",
  "Batidos": "Shakes",
  "Limonada tradicional": "Classic lemonade",
  "Limonada especial": "Special lemonade",
  "Limonada de la casa": "House lemonade with coffee syrup",
  "Pomelada": "Grapefruit ade with hibiscus",
  "Agua sin gas": "Still water",
  "Agua con gas": "Sparkling water",
  "Gaseosas": "Soft drinks",

  // Panadería
  "Roll del día": "Roll of the day",
  "Chipá 3U": "Chipá, cheese bread (3)",
  "Chipá": "Chipá, cheese bread",
  "Medialuna de manteca": "Butter medialuna",
  "Medialuna": "Medialuna",
  "Medialunas": "Medialunas",
  "Medialuna rellena": "Filled medialuna",
  "Croissant original": "Plain croissant",
  "Croissant relleno": "Filled croissant",
  "Croissants": "Croissants",
  "Tostadas": "Toast with homemade jam and cream cheese",
  "Tostado de J&Q": "Ham & cheese toastie",
  "Tostado campero": "Country toastie, to share",
  "Tostado salado de la casa": "House savory toastie",
  "Tostados": "Toasties",
  "Scones": "Scones",
  "Scones rellenos": "Filled scones",
  "Scones rellenos especiales": "Special filled scones",
  "Scones de queso": "Cheese scones",

  // Pastelería
  "Mini cakes y delicias de la casa": "Mini cakes and house treats",
  "Mini cakes": "Mini cakes",
  "Variedades de budín": "Loaf cakes",
  "Budín": "Loaf cake",
  "Cheesecakes especiales": "Special cheesecakes",
  "Cheesecakes tradicionales": "Classic cheesecakes",
  "Cheesecake": "Cheesecake",
  "Cookies tradicionales": "Classic cookies",
  "Cookies especiales": "Special cookies",
  "Cookies de Nutella": "Nutella cookies",
  "Cookies de pistacho": "Pistachio cookies",
  "Cookies red velvet": "Red velvet cookies",
  "Alfajores artesanales": "Handmade alfajores",
  "Alfajor de dulce de leche": "Dulce de leche alfajor",

  // Promos (las de la semana: sumalas acá cuando las cargues en el POS)
  "2 medialunas con café o té": "2 medialunas with coffee or tea",
  "2 tostadas con café o té": "2 toasts with coffee or tea",
  "2 tostadas c/cafe o te": "2 toasts with coffee or tea",
  "Tostado campero con 2 cafés": "Country toastie with 2 coffees",
};

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const armarIndice = (tabla: Record<string, string>) =>
  new Map(Object.entries(tabla).map(([es, en]) => [normalizar(es), en]));

const CATEGORIAS = armarIndice(CATEGORIAS_EN);
const PRODUCTOS = armarIndice(PRODUCTOS_EN);

/** Nombre en inglés, o null si todavía no tiene traducción */
export const categoriaEnIngles = (nombre: string) => CATEGORIAS.get(normalizar(nombre)) ?? null;
export const productoEnIngles = (nombre: string) => PRODUCTOS.get(normalizar(nombre)) ?? null;
