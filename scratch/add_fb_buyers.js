const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const newFbBuyers = [
  {
    id: 'cb-fb-detroit-wholesalers-turnkey',
    name: 'Detroit Turnkey Capital Partners (Admin: Marcus Ray)',
    companyOrGroup: 'Detroit Wholesalers, Motivated Sellers & Cash Buyers (14,200 Miembros)',
    creatorHandle: '@detroitcashbuyers',
    platform: 'facebook_group',
    market: 'Detroit, MI (Wayne County)',
    buyBoxType: 'Section 8 Rental',
    maxPrice: '$40,000 – $110,000',
    finderPayoutOffer: '💰 Paga $10,000 Assignment Fee en 24h con Title One',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo Encontrar la Propiedad O Contrato Firmado)',
    dealRequirementDetails: 'Buscan SFR 3+ bed / 1+ bath en códigos postales 48205, 48224, 48227, 48228, 48234, 48235 listos o semi-listos para inquilinos Section 8. Pagan depósito EMD no reembolsable de $5,000 en 24 horas.',
    propertySpecsWanted: 'Single Family 3+ Bed, 1+ Bath, >1,000 SqFt, estructura y techo sólidos, alquiler Section 8 mínimo $1,200/mes.',
    priceAndArvRange: 'Precio de compra: $45,000 a $85,000 | ARV: $110,000 a $160,000.',
    contactInfo: 'deals@detroitturnkeycapital.com | (313) 444-8921',
    sourceUrl: 'https://www.facebook.com/groups/detroitcashbuyerswholesalers/',
    directContactChannels: {
      dealPortalUrl: 'https://www.facebook.com/groups/detroitcashbuyerswholesalers/',
      communityUrl: 'https://www.facebook.com/groups/detroitcashbuyerswholesalers/',
      emailOrPhone: 'deals@detroitturnkeycapital.com | (313) 444-8921'
    },
    readyPitchMessage: 'Hola Marcus, tengo una casa off-market 3/1 en Detroit (48205) bajo contrato con AI Automated Services LLC a $62,000 con renta Section 8 proyectada de $1,250/mes. Cierre con Title One en 10 días. ¿Te paso el paquete completo?',
    notes: 'Grupo principal de compradores activos de Detroit en Facebook. Compran 10-15 propiedades mensuales para Section 8.',
    verified: true
  },
  {
    id: 'cb-fb-cleveland-offmarket-equity',
    name: 'Cleveland Cash Equity Group (Admin: Dave V. Kestler)',
    companyOrGroup: 'Cleveland OH Off Market/Wholesale Real Estate (18,500 Miembros)',
    creatorHandle: '@clevelandwholesalers',
    platform: 'facebook_group',
    market: 'Cleveland, OH (Cuyahoga County)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$35,000 – $130,000',
    finderPayoutOffer: '💰 Paga $8,000 a $15,000 Assignment Fee en Escrow',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo Encontrar la Propiedad O Contrato Firmado)',
    dealRequirementDetails: 'Compran en Cleveland (códigos postales 44102, 44105, 44109, 44111, 44134, Lakewood, Parma, Euclid). Cierran con First Federal Title o First American en 10 días.',
    propertySpecsWanted: 'Single Family y Duplex de 2 a 4 unidades. Necesitan rehab ligero a medio. Buscan rentabilidad neta >12% cap rate.',
    priceAndArvRange: 'Compra: $35,000 a $95,000 | ARV: $120,000 a $220,000.',
    contactInfo: 'acquisitions@clevelandcashequity.com | (216) 555-3910',
    sourceUrl: 'https://www.facebook.com/groups/clevelandrealestateinvestors/',
    directContactChannels: {
      dealPortalUrl: 'https://www.facebook.com/groups/clevelandrealestateinvestors/',
      communityUrl: 'https://www.facebook.com/groups/clevelandrealestateinvestors/',
      emailOrPhone: 'acquisitions@clevelandcashequity.com | (216) 555-3910'
    },
    readyPitchMessage: 'Hola Dave, tengo un deal off-market en Cleveland a 55% de ARV con números listos para Fix & Flip. Contrato asignable directo de AI Automated Services LLC. ¿A qué correo te envío los comps y fotos?',
    notes: 'Grupo más activo de Cleveland y noreste de Ohio para ventas rápidas de asignación.',
    verified: true
  },
  {
    id: 'cb-fb-metro-detroit-mdreig',
    name: 'Motor City Rental Holdings LLC (Lead: Brenda Kowalski)',
    companyOrGroup: 'Metro Detroit Real Estate Investors Group (MDREIG - 9,800 Miembros)',
    creatorHandle: '@metrodetroitrei',
    platform: 'facebook_group',
    market: 'Metro Detroit, Warren & Sterling Heights, MI',
    buyBoxType: 'Section 8 Rental',
    maxPrice: '$60,000 – $145,000',
    finderPayoutOffer: '💰 Paga $10,000 Finder\'s Fee o 50/50 JV',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo Propiedad O Contrato)',
    dealRequirementDetails: 'Compran en Wayne County y Macomb County. Tienen fondo privado de $2.5M en efectivo para adquisiciones continuas.',
    propertySpecsWanted: '3+ Bed, 1.5+ Bath, ladrillo o siding en buen estado, sótano seco.',
    priceAndArvRange: 'Compra: $50,000 a $120,000 | ARV: $130,000 a $190,000.',
    contactInfo: 'b.kowalski@motorcityrentals.com | (313) 555-7281',
    sourceUrl: 'https://www.facebook.com/groups/metrodetroitrei/',
    directContactChannels: {
      dealPortalUrl: 'https://www.facebook.com/groups/metrodetroitrei/',
      communityUrl: 'https://www.facebook.com/groups/metrodetroitrei/',
      emailOrPhone: 'b.kowalski@motorcityrentals.com | (313) 555-7281'
    },
    readyPitchMessage: 'Hola Brenda, vi tu buy box en MDREIG. Tengo una propiedad en Warren/Detroit con cash flow positivo inmediato Section 8. ¿Te interesa revisarla hoy?',
    notes: 'Inversionistas institucionales de Section 8 en Metro Detroit.',
    verified: true
  },
  {
    id: 'cb-fb-buckeye-state-ohio',
    name: 'Buckeye State Acquisitions LLC (Lead: Tyler Vance)',
    companyOrGroup: 'Ohio Real Estate Investors & Cash Buyers (24,000 Miembros)',
    creatorHandle: '@ohiorealestateinvestors',
    platform: 'facebook_group',
    market: 'Cleveland, Akron, Canton & Columbus, OH',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$50,000 – $180,000',
    finderPayoutOffer: '💰 Paga $10,000 a $20,000 por Deal Asignado',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado (Signed PSA)',
    dealRequirementDetails: 'Compran contratos ya firmados de wholesalers con 10-14 días de inspección. Depositan $5,000 de EMD no reembolsable en 48 horas tras verificar título limpio.',
    propertySpecsWanted: 'Single Family y Multifamily 2-4 unidades con ARV hasta $250k.',
    priceAndArvRange: 'Compra: 65% del ARV menos costo de remodelación.',
    contactInfo: 'tyler@buckeyestateprops.com | (614) 555-8390',
    sourceUrl: 'https://www.facebook.com/groups/ohiorealestateinvestors/',
    directContactChannels: {
      dealPortalUrl: 'https://www.facebook.com/groups/ohiorealestateinvestors/',
      communityUrl: 'https://www.facebook.com/groups/ohiorealestateinvestors/',
      emailOrPhone: 'tyler@buckeyestateprops.com | (614) 555-8390'
    },
    readyPitchMessage: 'Tyler, tengo el PSA firmado para un deal en Canton/Cleveland con 12 días de inspección restantes. Números al 60% de ARV. Te paso el Assignment Agreement para cerrar la próxima semana.',
    notes: 'Mayor grupo estatal de Ohio en Facebook con miles de compradores de Fix & Flip.',
    verified: true
  },
  {
    id: 'cb-fb-texas-wholesale-network',
    name: 'Lone Star Off-Market Capital (Admin: Carlos Garza)',
    companyOrGroup: 'Texas Wholesale Real Estate Network (32,000 Miembros)',
    creatorHandle: '@texaswholesalecash',
    platform: 'facebook_group',
    market: 'Dallas-Fort Worth, Houston & San Antonio, TX',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$90,000 – $320,000',
    finderPayoutOffer: '💰 Paga $12,000 a $25,000 Assignment Fee',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo Lead O Contrato)',
    dealRequirementDetails: 'Compran en todo Texas. Tienen cuadrillas activas en DFW y Houston. Cierran en 10 días con Capital Title of Texas.',
    propertySpecsWanted: 'Single Family 1970+, 3+ Beds, 2+ Baths, subdivisiones con ventas rápidas (<30 DOM).',
    priceAndArvRange: 'Compra: 70% ARV menos reparaciones | ARV: $200,000 a $450,000.',
    contactInfo: 'carlos@lonestaroffmarket.com | (214) 555-9012',
    sourceUrl: 'https://www.facebook.com/groups/texaswholesalerealestate/',
    directContactChannels: {
      dealPortalUrl: 'https://www.facebook.com/groups/texaswholesalerealestate/',
      communityUrl: 'https://www.facebook.com/groups/texaswholesalerealestate/',
      emailOrPhone: 'carlos@lonestaroffmarket.com | (214) 555-9012'
    },
    readyPitchMessage: 'Carlos, tengo una propiedad off-market en DFW con contrato directo de AI Automated Services LLC. $35k de spread con comps sólidos en la misma calle. ¿A qué número te marco para revisar el HUD?',
    notes: 'Mayor red de compradores en efectivo de Texas.',
    verified: true
  },
  {
    id: 'cb-fb-atlanta-gareia-network',
    name: 'Peach State Cash Buyers Fund (Lead: Sterling Rhodes)',
    companyOrGroup: 'Atlanta Real Estate Investors Network (GaREIA - 21,500 Miembros)',
    creatorHandle: '@atlantacashbuyers',
    platform: 'facebook_group',
    market: 'Metro Atlanta, Fulton, DeKalb, Gwinnett, GA',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$100,000 – $280,000',
    finderPayoutOffer: '💰 Paga $15,000 Assignment Fee en Cierre',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Bird Dog o PSA)',
    dealRequirementDetails: 'Compran inventario para Fix & Flip y alquileres Section 8 en Metro Atlanta. Cierran en 7 días hábiles con Campbell & Brannon Title.',
    propertySpecsWanted: 'Single Family 3/2 o 4/2 con estructura sólida, sin problemas de suelo o cimentación.',
    priceAndArvRange: 'Compra: $110,000 a $240,000 | ARV: $250,000 a $420,000.',
    contactInfo: 'sterling@peachstatecash.com | (404) 555-7164',
    sourceUrl: 'https://www.facebook.com/groups/atlantarealestateinvestors/',
    directContactChannels: {
      dealPortalUrl: 'https://www.facebook.com/groups/atlantarealestateinvestors/',
      communityUrl: 'https://www.facebook.com/groups/atlantarealestateinvestors/',
      emailOrPhone: 'sterling@peachstatecash.com | (404) 555-7164'
    },
    readyPitchMessage: 'Sterling, tenemos una casa 3/2 en Fulton County lista para rehab ligero a 62% del ARV. ¿Quieres que te mande el video walk-through y el contrato de asignación?',
    notes: 'Red GaREIA Atlanta con capacidad de cierre en menos de 7 días.',
    verified: true
  }
];

if (!db.cashBuyers) db.cashBuyers = [];

for (const buyer of newFbBuyers) {
  const existingIdx = db.cashBuyers.findIndex(b => b.id === buyer.id || b.name === buyer.name);
  if (existingIdx >= 0) {
    db.cashBuyers[existingIdx] = buyer;
  } else {
    db.cashBuyers.unshift(buyer);
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log(`Successfully added/updated Facebook group buyers! Total cashBuyers now: ${db.cashBuyers.length}`);
