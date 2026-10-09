function scrollToSection(id){
    const el = document.getElementById(id);
    if(el){ el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }

  const products = {
    d500: { name: 'MASS & BOWL — 500g (Découverte)', price: 1000, qty: 1 },
    m1kg: { name: 'MASS & BOWL — 1kg (Maxi Masse)', price: 1500, qty: 1 }
  };
  let cart = [];

  function changeQty(id, delta){
    let el = document.getElementById('qty-' + id);
    let val = Math.max(1, parseInt(el.textContent) + delta);
    el.textContent = val;
    products[id].qty = val;
  }

  function addToCart(id, name, price){
    const qty = products[id].qty;
    const existing = cart.find(i => i.id === id);
    if(existing){ existing.qty += qty; }
    else{ cart.push({ id, name, price, qty }); }
    renderCart();
    toggleCart(true);
  }

  function removeFromCart(id){
    cart = cart.filter(i => i.id !== id);
    renderCart();
  }

  function renderCart(){
    const body = document.getElementById('drawerBody');
    const count = cart.reduce((s,i)=>s+i.qty,0);
    document.getElementById('cartCount').textContent = count;

    if(cart.length === 0){
      body.innerHTML = '<div class="empty-cart">Ton panier est vide pour l\'instant.</div>';
    } else {
      body.innerHTML = cart.map(i => `
        <div class="cart-item">
          <div>
            <div class="ci-name">${i.name}</div>
            <div class="ci-meta">${i.qty} × ${i.price} FCFA</div>
          </div>
          <div class="ci-right">
            <div style="font-weight:700; margin-bottom:6px;">${i.qty * i.price} FCFA</div>
            <button class="close-btn" style="font-size:0.9rem;" onclick="removeFromCart('${i.id}')">Retirer</button>
          </div>
        </div>
      `).join('');
    }
    const total = cart.reduce((s,i)=>s + i.qty*i.price, 0);
    document.getElementById('cartTotal').textContent = total + ' FCFA';
  }

  function toggleCart(open){
    document.getElementById('overlay').classList.toggle('open', open);
    document.getElementById('drawer').classList.toggle('open', open);
  }

  function openCheckout(){
    if(cart.length === 0){ alert('Ton panier est vide.'); return; }
    toggleCart(false);
    document.getElementById('checkoutModal').classList.add('open');
    document.getElementById('stepInfo').style.display = 'block';
    document.getElementById('stepPay').style.display = 'none';
    document.getElementById('modalStep').textContent = 'ÉTAPE 1/2 — TES INFOS';
  }
  function closeCheckout(){
    document.getElementById('checkoutModal').classList.remove('open');
  }

  function goToPayment(){
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    if(!name || !phone){ alert('Merci de renseigner ton nom et ton téléphone.'); return; }
    document.getElementById('stepInfo').style.display = 'none';
    document.getElementById('stepPay').style.display = 'block';
    document.getElementById('modalStep').textContent = 'ÉTAPE 2/2 — PAIEMENT';
  }

  function selectPay(method){
    document.getElementById('opt-airtel').classList.toggle('selected', method === 'Airtel Money');
    document.getElementById('opt-mtn').classList.toggle('selected', method === 'MTN Mobile Money');

    const total = cart.reduce((s,i)=>s + i.qty*i.price, 0);
    const instr = document.getElementById('payInstructions');
    instr.classList.add('show');
    instr.innerHTML = `Envoie <strong>${total} FCFA</strong> via <strong>${method}</strong> au numéro<br><span class="mono-num">+242 056833801</span><br>Puis clique sur le bouton ci-dessous pour confirmer ta commande — on la valide dès réception.`;

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const itemsList = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
    const msg = `Bonjour BŌL NUTRITION, je confirme ma commande : ${itemsList}. Total: ${total} FCFA. Paiement: ${method}. Nom: ${name}. Téléphone: ${phone}. Adresse: ${address}.`;

    const btn = document.getElementById('confirmWaBtn');
    btn.href = 'https://wa.me/242056833801?text=' + encodeURIComponent(msg);
    btn.style.display = 'flex';
  }
