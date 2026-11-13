'use strict';
/** Menú exacto entregado por el profesor. Las compras son exclusivamente simuladas. */
const PRODUCTS = [
  {id:'burger', name:'Combo Hamburguesa Doble', price:28900, category:'comida', tag:'MÁS PEDIDO', image:'assets/hamburguesa-doble.jpg', description:'Carne 100% de res (200g), queso cheddar doble, tocineta crujiente, lechuga, tomate y salsa de la casa. Incluye papas a la francesa y bebida.'},
  {id:'nachos', name:'Nachos Supreme', price:22500, category:'comida', tag:'PARA COMPARTIR', image:'assets/nachos-supreme.jpg', description:'Totopos de maíz crujientes cubiertos con queso fundido, carne molida sazonada, guacamole, suero costeño y pico de gallo.'},
  {id:'coke', name:'Coca-Cola en Lata', price:4500, category:'bebida', tag:'BEBIDA', image:'assets/coca-cola.jpg', description:'Bebida refrescante gaseosa en presentación individual de 350 ml (servida fría).'},
  {id:'water', name:'Botella de Agua', price:3000, category:'bebida', tag:'BEBIDA', image:'assets/agua.jpg', description:'Agua mineral natural sin gas en presentación de 500 ml.'}
];
const $ = (selector) => document.querySelector(selector);
const formatCOP = (value) => '$' + value.toLocaleString('es-CO');
let cart = {};
try {
  const saved = JSON.parse(sessionStorage.getItem('bucaros_demo_cart') || '{}');
  if (saved && typeof saved === 'object') {
    for (const product of PRODUCTS) {
      const amount = Number(saved[product.id]);
      if (Number.isInteger(amount) && amount > 0 && amount <= 99) cart[product.id] = amount;
    }
  }
} catch (_) { cart = {}; }
const count = () => PRODUCTS.reduce((n,p) => n + (cart[p.id] || 0),0);
const total = () => PRODUCTS.reduce((n,p) => n + p.price * (cart[p.id] || 0),0);
function renderProducts(filter='todos') {
  const grid = $('#product-grid');
  grid.replaceChildren();
  for (const product of PRODUCTS.filter(p=>filter === 'todos' || p.category === filter)) {
    const card=document.createElement('article'); card.className='product-card';
    card.innerHTML = `<div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="product-tag">${product.tag}</span></div><div class="product-content"><h3>${product.name}</h3><p>${product.description}</p><strong class="product-price">${formatCOP(product.price)} COP</strong><button class="product-button" type="button" data-add="${product.id}" aria-label="Agregar ${product.name} al carrito">+ AGREGAR AL CARRITO</button></div>`;
    grid.appendChild(card);
  }
}
function saveCart(){ try { sessionStorage.setItem('bucaros_demo_cart',JSON.stringify(cart)); }catch(_){} }
function renderCart(){
  $('#cart-count').textContent=count(); $('#drawer-count').textContent=count();
  $('#cart-total').textContent=formatCOP(total());
  const list=$('#cart-list'); list.replaceChildren();
  if(!count()) {const empty=document.createElement('p'); empty.className='empty';empty.textContent='Tu carrito está vacío. Añade algo delicioso del menú.';list.appendChild(empty);}
  for(const product of PRODUCTS.filter(p=>cart[p.id]>0)){
    const line=document.createElement('div');line.className='cart-line';
    line.innerHTML=`<img src="${product.image}" alt=""><div><h3>${product.name}</h3><p>${formatCOP(product.price)}</p><div class="qty-controls"><button type="button" data-quantity="${product.id}" data-step="-1" aria-label="Restar una unidad de ${product.name}">−</button><span>${cart[product.id]}</span><button type="button" data-quantity="${product.id}" data-step="1" aria-label="Sumar una unidad de ${product.name}">+</button></div></div><strong>${formatCOP(product.price*cart[product.id])}</strong>`;
    list.appendChild(line);
  }
  $('#continue-checkout').disabled=count()===0;
  saveCart();
}
let toastTimeout;
function notify(message){const toast=$('#toast');toast.textContent=message;toast.style.display='block';clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.style.display='none',2300);}
function stage(name){
  $('#cart-step').hidden=name!=='cart';
  $('#checkout-step').hidden=name!=='checkout';
  $('#confirmation-step').hidden=name!=='confirmation';
  $('#drawer-bottom').hidden=name!=='cart';
}
function openCart(){stage('cart');$('#overlay').hidden=false;$('#overlay').classList.add('active');$('#drawer').classList.add('active');$('#drawer').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('#close-cart').focus();}
function closeCart(){$('#overlay').classList.remove('active');$('#overlay').hidden=true;$('#drawer').classList.remove('active');$('#drawer').setAttribute('aria-hidden','true');document.body.style.overflow='';$('#open-cart').focus();}
$('#open-cart').addEventListener('click',openCart);
$('#close-cart').addEventListener('click',closeCart);
$('#overlay').addEventListener('click',closeCart);
document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&$('#drawer').classList.contains('active'))closeCart();});
$('#product-grid').addEventListener('click',(event)=>{
  const add=event.target.closest('[data-add]'); if(!add)return;
  const product=PRODUCTS.find(p=>p.id===add.dataset.add); if(!product)return;
  cart[product.id]=Math.min(99,(cart[product.id]||0)+1);
  renderCart();notify('✓ '+product.name+' agregado a tu pedido');
});
$('#cart-list').addEventListener('click',(event)=>{
  const button=event.target.closest('[data-quantity]');if(!button)return;
  const key=button.dataset.quantity;if(!PRODUCTS.some(p=>p.id===key))return;
  cart[key]=Math.max(0,Math.min(99,(cart[key]||0)+Number(button.dataset.step)));
  if(cart[key]===0)delete cart[key];renderCart();
});
for(const filter of document.querySelectorAll('[data-filter]')){
  filter.addEventListener('click',()=>{
    for(const b of document.querySelectorAll('[data-filter]')){const active=b===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
    renderProducts(filter.dataset.filter);
  });
}
$('#continue-checkout').addEventListener('click',()=>{if(!count()){notify('Agrega un producto antes de continuar');return;}stage('checkout');$('#customer-name').focus();});
$('#back-to-cart').addEventListener('click',()=>stage('cart'));
$('#checkout-form').addEventListener('submit',(event)=>{
  event.preventDefault();const form=event.currentTarget;if(!form.reportValidity()||!count())return;
  const payment=form.elements.payment.value;
  const sum=total();const lines=PRODUCTS.filter(p=>cart[p.id]>0).map(p=>`${cart[p.id]} × ${p.name}`).join(' · ');
  // No se envían, almacenan ni muestran los datos personales introducidos.
  const reference='DEMO-'+String(Date.now()).slice(-6);
  const confirmation=$('#confirmation-step');confirmation.replaceChildren();
  const title=document.createElement('h3');title.className='confirmation-title';title.textContent='✓ ¡Pedido simulado!';
  const summary=document.createElement('p');summary.className='confirmation-text';summary.textContent=`Número: ${reference}. Productos: ${lines}. Total: ${formatCOP(sum)} COP. Método de pago: ${payment}. No se realizó compra ni cobro.`;
  const message=document.createElement('p');message.className='disclaimer';message.textContent='No se ha enviado ninguna información a un restaurante ni se han almacenado los datos personales del formulario.';
  const button=document.createElement('button');button.type='button';button.className='cta cta-block';button.textContent='VOLVER AL MENÚ';button.addEventListener('click',()=>{closeCart();location.hash='menu';});
  confirmation.append(title,summary,message,button);
  cart={};renderCart();form.reset();stage('confirmation');
});
renderProducts();renderCart();stage('cart');
