# Hamburguesería BÚCAROS 🍔

Proyecto académico: sitio web funcional de hamburguesería artesanal, preparado para **GitHub Pages**.

## Demostración

Sitio estático y responsivo con **HTML, CSS y JavaScript**:
- Catálogo de cuatro productos con fotografías, precios en COP y filtros.
- Carrito interactivo (agregar, aumentar y disminuir cantidades).
- Cálculo dinámico de total.
- Checkout con nombre, dirección, teléfono y pago en efectivo o transferencia.
- Confirmación simulada de pedido.

**No se procesan pagos ni se envían pedidos reales.** Los datos personales del formulario no se almacenan ni envían. Para demostrar el checkout, ingresa datos ficticios.

## Cómo publicar con GitHub Pages

1. En GitHub, crea un repositorio **público** llamado `bucaros-hamburgueseria`.
2. En el repositorio, elige **Add file → Upload files** y sube **el contenido** de este paquete a la raíz: `index.html`, `styles.css`, `app.js`, `assets/`, `.nojekyll`, etc. **No subas el ZIP como único archivo.**
3. Haz clic en **Commit changes**.
4. Ve a **Settings → Pages**. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main`, carpeta `/(root)` y presiona **Save**.
6. Abre el enlace que te muestre GitHub Pages, normalmente `https://USUARIO.github.io/bucaros-hamburgueseria/`, y verifica que la tienda funciona. No debes suponer el enlace sin ver la publicación completada.

GitHub Pages puede tardar unos minutos en actualizarse después del commit.

## Prueba funcional de cinco minutos

- Abre `index.html` o el sitio publicado.
- Agrega **1 unidad de cada producto**: total esperado **$58.900 COP**.
- Agrega **5 hamburguesas dobles**: total esperado **$144.500 COP**.
- Abre el carrito, usa **+ / −**, revisa el subtotal.
- Selecciona **Continuar al pedido**, completa datos ficticios y elige **Efectivo** o **Transferencia**.
- Confirma el pedido; debe mostrar comprobante **DEMO** sin cobros.
- Cambia el navegador a vista móvil para demostrar el diseño adaptable.

Para el discurso, revisa `GUION_DEMOSTRACION_5_MINUTOS.md`.

## Archivos
- `index.html` — Maqueta del sitio.
- `styles.css` — Diseño, componentes y responsividad.
- `app.js` — Catálogo, carrito, total y checkout.
- `assets/` — Logo e imágenes de referencia del proyecto.
- `.nojekyll` — Configuración para servir archivos estáticos en GitHub Pages.

## Sobre la Fase 5

Esta es la **versión HTML independiente** para la Fase 4. No replica automáticamente el pixel de Meta, GA4, Hotjar o la API de Claude instalados o preparados en Shopify; son entornos distintos y deben verificarse por separado.

## Derechos del material

Las imágenes y la identidad visual provienen de recursos aportados para la actividad académica. Confirma con el profesor que pueden hacerse públicas en el repositorio antes de subirlas; si no, utiliza imágenes autorizadas o un repositorio privado con otra forma de demostración.
