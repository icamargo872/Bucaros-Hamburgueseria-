/* BÚCAROS | Fase 5: analítica y publicidad con consentimiento explícito.
 * GA4: G-T13R4WM7RE
 * Meta Pixel: 1141804721551321
 * No se recopilan datos introducidos en el formulario de pedido.
 * Los pedidos son exclusivamente simulaciones académicas.
 */
'use strict';
(function () {
  const GA_ID = 'G-T13R4WM7RE';
  const META_ID = '1141804721551321';
  const STORAGE_KEY = 'bucaros_consent_v1';
  const ORDER_STORAGE = 'bucaros_demo_cart';
  const items = [
    {item_id: 'burger', item_name: 'Combo Hamburguesa Doble', price: 28900},
    {item_id: 'nachos', item_name: 'Nachos Supreme', price: 22500},
    {item_id: 'coke', item_name: 'Coca-Cola en Lata', price: 4500},
    {item_id: 'water', item_name: 'Botella de Agua', price: 3000}
  ];
  const css = `
    #bu-consent{position:fixed;bottom:22px;left:22px;z-index:1200;max-width:min(450px,calc(100vw - 44px));padding:20px 21px;border-radius:12px;background:#fff9ed;color:#391011;box-shadow:0 10px 55px #0006;border:1px solid #e7cc9c;font-family:Arial,sans-serif}
    #bu-consent[hidden],#bu-privacy[hidden]{display:none!important}
    #bu-consent h2{font-size:17px;line-height:1.3;margin:0 0 8px;color:#391011}
    #bu-consent p{font-size:12px;line-height:1.55;color:#574d43;margin:0 0 12px}
    #bu-consent .bu-buttons{display:flex;flex-wrap:wrap;gap:8px}
    #bu-consent button{border-radius:6px;border:1px solid #d3b793;padding:10px 12px;background:white;color:#391011;font-size:12px;font-weight:700;cursor:pointer}
    #bu-consent button[data-bu-mode=all]{background:#e8a80e;border-color:#e8a80e}
    #bu-privacy{position:fixed;bottom:12px;left:12px;z-index:1199;border:1px solid #dfc39c;border-radius:40px;padding:7px 10px;background:#fffaf1;color:#391011;font:600 11px Arial,sans-serif;cursor:pointer}
    @media(max-width:720px){#bu-consent{left:10px;bottom:10px;max-width:calc(100vw - 20px);padding:16px}#bu-consent .bu-buttons button{flex:1}}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const consent = document.createElement('section');
  consent.id = 'bu-consent';
  consent.hidden = true;
  consent.setAttribute('role', 'dialog');
  consent.setAttribute('aria-label', 'Preferencias de privacidad');
  consent.innerHTML = `<h2>Privacidad y medición</h2>
    <p>Esta tienda es una demostración. Con tu permiso usaremos Google Analytics para medir visitas y Meta Pixel para analítica publicitaria. Puedes elegir por separado; no enviamos los datos del formulario de pedido.</p>
    <div class="bu-buttons">
      <button type="button" data-bu-mode="none">Solo necesarias</button>
      <button type="button" data-bu-mode="analytics">Solo analítica</button>
      <button type="button" data-bu-mode="all">Permitir ambas</button>
    </div>`;
  document.body.appendChild(consent);
  const privacy = document.createElement('button');
  privacy.type = 'button';
  privacy.id = 'bu-privacy';
  privacy.textContent = '⚙ Privacidad';
  privacy.hidden = true;
  document.body.appendChild(privacy);

  let mode = null;
  let gaLoaded = false;
  let metaLoaded = false;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (['none', 'analytics', 'all'].includes(saved)) mode = saved;
  } catch (_) { /* Privacy choices can still be made for this visit. */ }

  function injectScript(url) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = url;
    document.head.appendChild(tag);
  }
  function catalogItems() {
    return items.map(item => ({...item, quantity: 1}));
  }
  function cartItems() {
    let selected = {};
    try { selected = JSON.parse(sessionStorage.getItem(ORDER_STORAGE) || '{}') || {}; }
    catch (_) { selected = {}; }
    return items.flatMap(item => {
      const quantity = Number(selected[item.item_id]);
      return (Number.isInteger(quantity) && quantity > 0 && quantity <= 99)
        ? [{...item, quantity}] : [];
    });
  }
  function cartTotal(lines) {
    return lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function gaEvent(name, detail) {
    if ((mode !== 'analytics' && mode !== 'all') || !gaLoaded) return;
    window.gtag('event', name, detail);
  }
  function metaEvent(name, detail, custom=false) {
    if (mode !== 'all' || !metaLoaded) return;
    window.fbq(custom ? 'trackCustom' : 'track', name, detail);
  }
  function enableGoogle() {
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('config', GA_ID); // Incluye page_view inicial.
    injectScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID));
    gaEvent('view_item_list', {item_list_name: 'Menú BÚCAROS', items: catalogItems()});
  }
  function enableMeta() {
    if (metaLoaded) return;
    metaLoaded = true;
    const f = window.fbq = function () {
      return f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments);
    };
    f.queue = [];
    f.loaded = true;
    f.version = '2.0';
    window._fbq = f;
    f('init', META_ID);
    f('track', 'PageView');
    f('track', 'ViewContent', {content_name: 'Menú BÚCAROS', content_type: 'product_group'});
    injectScript('https://connect.facebook.net/en_US/fbevents.js');
  }
  function applyMode(next) {
    // Para revocar permisos, recargar la página evita que continúe ejecutándose
    // cualquier etiqueta externa cargada en esta pestaña.
    const previous = mode;
    mode = next;
    try {localStorage.setItem(STORAGE_KEY, mode);} catch (_) {}
    consent.hidden = true;
    privacy.hidden = false;
    if ((previous === 'all' && next !== 'all') ||
        ((previous === 'analytics' || previous === 'all') && next === 'none')) {
      location.reload();
      return;
    }
    if (mode === 'analytics' || mode === 'all') enableGoogle();
    if (mode === 'all') enableMeta();
  }

  consent.addEventListener('click', e => {
    const btn = e.target.closest('button[data-bu-mode]');
    if (btn) applyMode(btn.dataset.buMode);
  });
  privacy.addEventListener('click', () => {consent.hidden = false;});
  if (mode === null) {
    consent.hidden = false;
  } else {
    privacy.hidden = false;
    // La sesión actual solo registra eventos para las categorías autorizadas.
    if (mode === 'analytics' || mode === 'all') enableGoogle();
    if (mode === 'all') enableMeta();
  }

  // Eventos de la tienda, sin nombre, dirección, teléfono ni datos del formulario.
  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    if (add) {
      const item = items.find(x => x.item_id === add.dataset.add);
      if (!item) return;
      gaEvent('add_to_cart', {currency: 'COP', value: item.price, items: [{...item, quantity: 1}]});
      metaEvent('AddToCart', {currency: 'COP', value: item.price, content_ids: [item.item_id], content_type: 'product'});
    }
    const checkout = event.target.closest('#continue-checkout');
    if (checkout) {
      const lines = cartItems();
      if (!lines.length) return;
      const value = cartTotal(lines);
      gaEvent('begin_checkout', {currency: 'COP', value, items: lines});
      metaEvent('InitiateCheckout', {currency: 'COP', value, num_items: lines.reduce((n, x) => n + x.quantity, 0)});
    }
  });

  // Usar un evento personalizado, no "purchase", para no inventar ventas reales.
  // La captura se ejecuta antes de que app.js limpie el carrito simulado.
  document.addEventListener('submit', event => {
    if (event.target.id !== 'checkout-form') return;
    const lines = cartItems();
    if (!lines.length) return;
    const detail = {currency: 'COP', value: cartTotal(lines), items: lines, demo_mode: true};
    gaEvent('demo_order_complete', detail);
    metaEvent('DemoOrderComplete', {currency: 'COP', value: detail.value}, true);
  }, true);
})();
