# Simpli
AI Learning Tool
<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Simpli — Koupit předplatné</title>
  <meta name="description" content="Simpli — neomezené kvízy z vlastních zápisků. Koupit předplatné." />

  <style>
    /* Základní reset */
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%}
    body{
      font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
      display:flex;align-items:center;justify-content:center;
      background: linear-gradient(180deg,#f7fbff 0%, #eaf6ff 50%, #f3fbff 100%);
      color:#03314b;
    }

    /* Kontejner s liquid-glass efektem */
    .card{
      width:min(720px, 92%);
      background: rgba(255,255,255,0.55);
      border-radius:20px;
      padding:48px;
      box-shadow: 0 8px 30px rgba(6,24,55,0.12);
      backdrop-filter: blur(10px) saturate(120%);
      -webkit-backdrop-filter: blur(10px) saturate(120%);
      border: 1px solid rgba(255,255,255,0.6);
      display:grid;gap:18px;align-items:center;justify-items:center;
    }

    .logo{
      height:64px;width:64px;border-radius:14px;
      background: linear-gradient(135deg, rgba(8,110,230,0.12), rgba(8,110,230,0.22));
      display:flex;align-items:center;justify-content:center;font-weight:700;color:#064a86;font-size:22px;
      box-shadow:inset 0 -6px 18px rgba(8,110,230,0.04);
    }

    h1{
      font-size:20px;font-weight:600;color:#042b44;text-align:center;
    }
    p.lead{color:#0b3b57;opacity:0.9;text-align:center;max-width:640px}

    .price{
      background: linear-gradient(90deg, rgba(6,95,200,0.12), rgba(6,95,200,0.08));
      padding:18px 28px;border-radius:12px;border:1px solid rgba(6,95,200,0.08);
      display:flex;gap:14px;align-items:center;justify-content:center;font-weight:700;color:#063a6b;font-size:18px;
    }

    .actions{display:flex;gap:12px;align-items:center}

    .btn{
      padding:12px 18px;border-radius:12px;border:none;cursor:pointer;font-weight:600;font-size:15px;
      box-shadow: 0 6px 18px rgba(6,24,55,0.08);
    }

    .btn-primary{
      background: linear-gradient(180deg,#0a66c2,#045ea8);color:white;
      transition:transform .12s ease, box-shadow .12s ease;
    }
    .btn-primary:active{transform:translateY(1px)}

    .btn-ghost{
      background:transparent;color:#063a6b;border:1px solid rgba(6,58,107,0.08);
    }

    .muted{font-size:13px;color:#063a6b;opacity:0.75}

    footer{margin-top:6px;font-size:12px;color:#063a6b;opacity:0.7;text-align:center}

    /* malé obrazovky */
    @media (max-width:480px){
      .card{padding:28px;border-radius:16px}
      h1{font-size:18px}
      .price{font-size:16px;padding:14px}
    }
  </style>
</head>
<body>
  <main class="card" role="main" aria-labelledby="title">
    <div class="logo">S</div>
    <h1 id="title">Simpli — kvízy z tvých zápisků</h1>
    <p class="lead">Rychle vytvořené, kvalitní otázky z vlastních poznámek. Uč se efektivněji — jeden klik a jdeš do toho.</p>

    <div class="price" aria-hidden>
      <div>Simpli PRO</div>
      <div style="opacity:.95;padding-left:6px">2,99 € / měsíc</div>
    </div>

    <div class="actions">
      <button id="buyBtn" class="btn btn-primary">Koupit předplatné</button>
      <button id="trialBtn" class="btn btn-ghost">Vyzkoušet zdarma</button>
    </div>

    <div class="muted">Platba proběhne přes bezpečnou platební bránu. Po zaplacení se přihlas do Simpli stejným e‑mailem.</div>
    <footer>© Simpli • Made with care</footer>
  </main>

  <script>
    // Jednoduchý klient pro vytvoření Checkout Session.
    // POZN: musíš nasadit backend endpoint /create-checkout-session (POST) který zavolá Stripe
    // Endpoint by měl vrátit { url: "https://checkout.stripe.com/..." }

    const buyBtn = document.getElementById('buyBtn');
    const trialBtn = document.getElementById('trialBtn');

    buyBtn.addEventListener('click', async () => {
      buyBtn.disabled = true; buyBtn.textContent = 'Probíhá přesměrování...';
      try {
        // V reálné implementaci pošli e-mail nebo user id
        const res = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ priceId: 'PRICE_ID_FROM_STRIPE', email: '' })
        });
        if (!res.ok) throw new Error('Chyba při komunikaci');
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url; // přesměrování na Stripe Checkout
        } else {
          alert('Nepodařilo se vytvořit checkout session.');
          buyBtn.disabled = false; buyBtn.textContent = 'Koupit předplatné';
        }
      } catch (err) {
        console.error(err);
        alert('Chyba. Zkontroluj konzoli.');
        buyBtn.disabled = false; buyBtn.textContent = 'Koupit předplatné';
      }
    });

    // Trial — v této jednoduché verzi jen redirectuje na info stránku / nebo můžeš implementovat /create-trial
    trialBtn.addEventListener('click', () => {
      // pokud chceš automatické trialy, implementuj backend /create-trial
      alert('Trial lze získat po registraci. Přihlas se stejným e‑mailem v Simpli.');
    });
  </script>
</body>
</html>
