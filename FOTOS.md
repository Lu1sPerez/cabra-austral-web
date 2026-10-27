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

## Lista

### Carpeta `public/fotos/`

| Archivo | Proporción | Qué sacar | Estado |
|---|---|---|---|
| `portada-vertical.jpg` | vertical | El salón con la barra (celular). | ✅ |
| `portada-horizontal.jpg` | 3:2 horizontal | El salón, con el celular acostado (computadora). | ✅ provisoria: conviene una toma horizontal real |
| `cafe-servido.jpg` | 4:5 vertical | Promos: algo servido con café. | ✅ |
| `fachada.jpg` | 3:2 horizontal | El frente del local con el cartel, de día, desde la vereda de enfrente. | falta |
| `menu-1.jpg` … `menu-6.jpg` | 4:5 vertical | Cinta de fotos del menú: comida. | ✅ |
| `menu-7.jpg` | 4:5 vertical | Alfajores cortados al medio, que se vea el relleno. | falta |
| `menu-8.jpg` | 4:5 vertical | Un licuado o frapuccino en vaso, con luz de ventana. | falta |
| `local-1.jpg` | 4:5 vertical | Momentos: la barra con alguien preparando un café. | falta |
| `local-2.jpg` | 4:5 vertical | Momentos: manos armando medialunas o alfajores. | falta |
| `local-3.jpg` | 4:5 vertical | Momentos: gente conversando en una mesa (de espaldas o de costado). | falta |
| `local-4.jpg` | 4:5 vertical | Momentos: el estante de mates bajo el arco de ladrillo. | falta |
| `local-5.jpg` | 4:5 vertical | Momentos: leche sirviéndose en la taza, de cerca. | falta |
| `local-6.jpg` | 4:5 vertical | Momentos: la vereda o la calle frente al local. | falta |

Los pies de foto se cambian en `src/data/menu-fotos.ts` (cinta del menú) y `src/data/momentos.ts` (Momentos).
La sección Momentos aparece sola en cuanto subas al menos una foto `local-…`.

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
