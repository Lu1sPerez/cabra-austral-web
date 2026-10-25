# Fotos para la web de Cabra Austral

Mientras no subas una foto, la web muestra un recuadro con la indicación de qué va ahí.
Cuando subas el archivo **con el nombre exacto** a la carpeta indicada, aparece solo en la próxima publicación.
No hace falta tocar el código.

## Antes de sacar

- **Luz:** natural, de ventana, de costado. Sin flash. Mejor a media mañana.
- **Celular:** cámara normal (1x), no la gran angular, salvo la fachada.
- **Proporción:** configurá la cámara en la proporción indicada o recortá después. Siempre derechas, con el horizonte recto.
- **Exportar:** JPG, lado largo de 2400 px, calidad 80 (cada foto debería pesar menos de 1 MB). La web las optimiza igual.
- **Nombres:** en minúscula, sin espacios ni tildes, tal cual figuran abajo. Sirven .jpg, .png o .webp.

## Lista (29 fotos)

### Carpeta `public/fotos/`

| Archivo | Proporción | Qué sacar |
|---|---|---|
| `portada-vertical.jpg` | 4:5 vertical | La barra con la máquina, luz de mañana. Es la primera imagen que ve el 80% de la gente (celular). Dejá lo importante en la **mitad de arriba**: abajo va el titular. |
| `portada-horizontal.jpg` | 3:2 horizontal | La barra completa vista de costado, para computadoras. Lo importante en la **mitad derecha y arriba**. |
| `pasteleria.jpg` | 3:2 horizontal | La vitrina de pastelería a la altura de los ojos: tortas, cookies, alfajores. Que se vean bien las texturas. |
| `cafe-servido.jpg` | 4:5 vertical | Un café con latte art y dos medialunas, desde arriba en diagonal (45°), sobre la mesa. |
| `fachada.jpg` | 3:2 horizontal | El frente del local con el cartel, de día, desde la vereda de enfrente. Sin autos tapando si se puede. |
| `momento-1.jpg` | 4:5 vertical | La barra recién abierta (pie de foto: "barra, 8:00 am"). |
| `momento-2.jpg` | 4:5 vertical | Bandeja de medialunas saliendo del horno ("la primera hornada"). |
| `momento-3.jpg` | 4:5 vertical | Una mesa servida junto a la ventana ("mesa junto a la ventana"). |
| `momento-4.jpg` | 4:5 vertical | Manos armando alfajores o estirando masa ("manos en la masa"). |
| `momento-5.jpg` | 4:5 vertical | Mate, yerbero y algo dulce sobre la mesa ("tarde de mate"). |
| `momento-6.jpg` | 4:5 vertical | La calle o la vereda del local ("perito moreno, primavera"). |

Los pies de foto de los momentos se cambian en `src/data/momentos.ts`.

### Carpeta `public/fotos/archivo/` (mates, bombillas, accesorios, tazas)

Dos fotos por pieza, **4:5 vertical**, todas con el mismo fondo liso claro (una cartulina o pared marfil), la misma luz y a la misma distancia, para que la galería se vea pareja.

- `<pieza>-a.jpg`: la pieza **de frente**, centrada, ocupando dos tercios del cuadro.
- `<pieza>-b.jpg`: **detalle o en uso**: con yerba y bombilla, en la mano, un primer plano de la virola, etc.

| Pieza | Foto 1 | Foto 2 |
|---|---|---|
| Mate imperial | `mate-imperial-a.jpg` | `mate-imperial-b.jpg` |
| Mate torpedo | `mate-torpedo-a.jpg` | `mate-torpedo-b.jpg` |
| Mate camionero | `mate-camionero-a.jpg` | `mate-camionero-b.jpg` |
| Bombilla de alpaca | `bombilla-alpaca-a.jpg` | `bombilla-alpaca-b.jpg` |
| Bombilla de bronce | `bombilla-bronce-a.jpg` | `bombilla-bronce-b.jpg` |
| Yerbero | `yerbero-a.jpg` | `yerbero-b.jpg` |
| Canasta matera | `canasta-matera-a.jpg` | `canasta-matera-b.jpg` |
| Taza de cerámica | `taza-ceramica-a.jpg` | `taza-ceramica-b.jpg` |
| Jarro | `jarro-a.jpg` | `jarro-b.jpg` |

Si sumás o cambiás piezas en `src/data/archivo.ts`, las fotos se llaman igual que el `id` de la pieza más `-a` o `-b`.
