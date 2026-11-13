# Guion de sustentación — BÚCAROS (5 minutos)

**Objetivo:** mostrar el recorrido de un cliente desde la página de inicio hasta la confirmación simulada del pedido. Presenta el sitio abierto en Chrome y el enlace público del servidor de prueba. Puedes compartir pantalla o proyectar el computador.

## 0:00–0:40 · Presentación e identidad

**Mostrar:** página de inicio y el encabezado con logo.

**Decir:** «Buenos días. Nuestro proyecto se llama *Hamburguesería BÚCAROS*. Es una tienda virtual orientada a la venta de hamburguesas artesanales y acompañamientos. Su identidad visual utiliza los colores y el logotipo entregados para el proyecto. El sitio se diseñó para que el usuario pueda conocer los productos, agregarlos al carrito y simular una compra desde el navegador».

## 0:40–1:35 · Menú y catálogo

**Mostrar:** pulsar **Ver nuestro menú**, señalar las cuatro tarjetas y probar los filtros **Comidas / Bebidas**.

**Decir:** «El catálogo incluye cuatro productos. El combo de hamburguesa doble cuesta $28.900; los nachos supreme, $22.500; la Coca-Cola en lata, $4.500; y la botella de agua, $3.000. Cada tarjeta presenta fotografía, nombre, descripción y precio en pesos colombianos. Los filtros ayudan a recorrer el menú».

## 1:35–2:35 · Carrito y total dinámico

**Mostrar:** agregar **una unidad de cada producto** y abrir **Mi pedido**. El total debe ser **$58.900 COP**. Presionar **+** en la hamburguesa y después **−** para enseñar que el total cambia.

**Decir:** «El carrito funciona con JavaScript. Cada vez que añadimos, sumamos o restamos productos, recalcula las cantidades y el total de manera inmediata. Esto permite al cliente revisar y modificar su compra antes de continuar».

## 2:35–3:50 · Checkout y pago de ejemplo

**Mostrar:** pulsar **Continuar al pedido**. Introducir nombre ficticio **Cliente Demo**, dirección ficticia **Calle 10 # 20-30** y teléfono ficticio **3001234567**. Seleccionar **Transferencia** y confirmar.

**Decir:** «En el checkout solicitamos los campos exigidos: nombre, dirección, teléfono y medio de pago, que puede ser efectivo o transferencia. Para la actividad utilizamos datos ficticios porque no se realizan ventas ni cobros reales. Al confirmar, el sistema presenta un número de pedido de prueba, el resumen de productos y el total».

## 3:50–4:30 · Diseño responsivo

**Mostrar:** cambiar a la vista móvil de Chrome (`F12` → icono de teléfono), o abrir el sitio desde el celular.

**Decir:** «La página es responsiva: la portada, el menú y el carrito se adaptan a distintas resoluciones. Así el usuario puede realizar el mismo proceso desde un computador o un teléfono».

## 4:30–5:00 · Código, publicación y cierre

**Mostrar:** la URL pública de Netlify o de GitHub Pages (la que realmente hayas creado); si piden código, abrir la carpeta con `index.html`, `styles.css` y `app.js`.

**Decir:** «Para la construcción usamos HTML para la estructura, CSS para los estilos y JavaScript para la interacción del catálogo, el cálculo del pedido y el formulario. El código está publicado en un servidor de prueba accesible mediante este enlace. Con esto demostramos el flujo completo de comercio electrónico solicitado por el profesor, sin procesar pagos reales. Muchas gracias».

---

## Lista rápida antes de exponer

- [ ] Confirmar que abre la **URL pública** en una pestaña de incógnito.
- [ ] Confirmar que cargan las **cuatro fotografías**.
- [ ] Revisar que el carrito esté vacío al empezar; si no, restar cantidades con **−**.
- [ ] Verificar que **1 de cada producto = $58.900**.
- [ ] Tener a mano los datos ficticios de entrega.
- [ ] No realizar ni solicitar pagos reales.
- [ ] Guardar capturas de: inicio, catálogo, carrito, checkout y confirmación.

**Nota:** No confundas este proyecto HTML de prueba con el tema BÚCAROS de Shopify que usamos en otras fases. La Fase 5 (píxel, analítica, IA) tiene configuraciones separadas y se sustenta con sus propias evidencias.
