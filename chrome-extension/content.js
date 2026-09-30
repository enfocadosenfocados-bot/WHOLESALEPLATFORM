// WholesalePlatform 1-Click Deal Importer Content Script
(function () {
  console.log('[WholesalePlatform] Extension content script loaded.');

  function extractZillowData() {
    const address =
      document.querySelector('h1[class*="Text"]')?.innerText ||
      document.querySelector('[data-test-id="bdp-home-address"]')?.innerText ||
      document.title.split('|')[0].trim();

    const priceText =
      document.querySelector('[data-test-id="price"]')?.innerText ||
      document.querySelector('span[class*="price"]')?.innerText ||
      '';
    const priceNum = parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 0;

    const bodyText = document.body.innerText;
    let daysOnMarket = 0;
    const domMatch = bodyText.match(/(\d+)\s+days?\s+on\s+Zillow/i);
    if (domMatch) daysOnMarket = parseInt(domMatch[1], 10);

    return {
      ownerName: `Owner / Listing of ${address.slice(0, 30)}`,
      propertyAddress: address,
      cityState: address.split(',').slice(-2).join(',').trim() || 'FL',
      phone: '(Contact on Listing)',
      email: '',
      leadSource: 'Zillow FSBO',
      estimatedArv: priceNum > 0 ? Math.round(priceNum * 1.15) : 300000,
      askingOrAssessedPrice: priceNum || 200000,
      recommendedMaoOffer: priceNum > 0 ? Math.round(priceNum * 0.65) : 130000,
      lowball60Offer: priceNum > 0 ? Math.round(priceNum * 0.60) : 120000,
      taxOrMortgageArrears: 0,
      status: 'new',
      notes: `Importado con 1 clic desde Zillow (${daysOnMarket} días en el mercado). URL: ${window.location.href}`,
    };
  }

  function injectFloatingButton() {
    if (document.getElementById('wholesaleplatform-import-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'wholesaleplatform-import-btn';
    btn.innerHTML = '⚡ Enviar a WholesalePlatform';
    btn.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background: linear-gradient(135deg, #10b981, #059669);
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 800;
      padding: 12px 18px;
      border: 2px solid #34d399;
      border-radius: 9999px;
      box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.5);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    `;

    btn.onmouseenter = () => (btn.style.transform = 'scale(1.05)');
    btn.onmouseleave = () => (btn.style.transform = 'scale(1)');

    btn.onclick = async () => {
      btn.innerHTML = '⏳ Enviando al Pipeline...';
      const dealData = extractZillowData();
      try {
        const ports = [3005, 3000];
        let sent = false;
        for (const port of ports) {
          try {
            const res = await fetch(`http://localhost:${port}/api/seller-outreach`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'create_lead', lead: dealData }),
            });
            if (res.ok) {
              sent = true;
              break;
            }
          } catch {}
        }

        if (sent) {
          btn.innerHTML = '✅ ¡Guardado en tu Pipeline!';
          btn.style.background = '#059669';
          setTimeout(() => {
            btn.innerHTML = '⚡ Enviar a WholesalePlatform';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          }, 3000);
        } else {
          alert('Asegúrate de que WholesalePlatform esté corriendo en http://localhost:3005');
          btn.innerHTML = '⚡ Enviar a WholesalePlatform';
        }
      } catch (err) {
        alert('Error al enviar: ' + err.message);
        btn.innerHTML = '⚡ Enviar a WholesalePlatform';
      }
    };

    document.body.appendChild(btn);
  }

  // Run on page load & URL change (SPA navigation on Zillow)
  injectFloatingButton();
  setInterval(injectFloatingButton, 3000);
})();
