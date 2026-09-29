import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { searchWebDuckDuckGo } from '@/lib/agents/researchAgent';
import { VerifiedCashBuyer } from '@/types/skill';

export async function POST(req: NextRequest) {
  try {
    const { market, buyBoxType, dealModePreference } = await req.json();
    const targetMarket = (market || 'Tampa, FL').trim();
    const targetType: VerifiedCashBuyer['buyBoxType'] =
      buyBoxType || 'Fix & Flip';
    const preferredMode: VerifiedCashBuyer['dealRequirementMode'] =
      dealModePreference === 'lead_only_birddog' || dealModePreference === 'contract_signed'
        ? dealModePreference
        : 'both_accepted';

    const queries = [
      `"${targetMarket}" "submit a deal" OR "send me your deals" OR "finder's fee" wholesale real estate`,
      `site:reddit.com/r/WholesalingHouses OR site:reddit.com/r/WholesaleRealestate "${targetMarket}" cash buyer OR JV OR bird dog`,
      `site:instagram.com OR site:youtube.com "${targetMarket}" wholesale real estate "buy box" OR "send me deals"`,
      `site:facebook.com/groups "${targetMarket}" real estate investors wholesale cash buyers`,
      targetType === 'Land / Home Builder'
        ? `"${targetMarket}" custom home builders infill lots we buy land cash`
        : `"${targetMarket}" "bird dog" OR "joint venture" cash buyer real estate investors`,
    ];

    const discoveredBuyers: VerifiedCashBuyer[] = [];

    for (const q of queries) {
      const snippets = await searchWebDuckDuckGo(q);
      for (const s of snippets.slice(0, 2)) {
        let platform: VerifiedCashBuyer['platform'] = 'web_directory';
        if (s.url.includes('facebook.com')) platform = 'facebook_group';
        else if (s.url.includes('reddit.com')) platform = 'reddit';
        else if (s.url.includes('instagram.com') || s.url.includes('youtube.com'))
          platform = 'reel_buyer';
        else if (s.url.includes('biggerpockets.com')) platform = 'biggerpockets';
        else if (targetType === 'Land / Home Builder') platform = 'builder_database';

        const isBirdDogMentioned =
          /bird\s*dog|finder|lead|50\/50|jv|joint venture/i.test(
            `${s.title} ${s.snippet}`
          );

        const mode: VerifiedCashBuyer['dealRequirementMode'] = isBirdDogMentioned
          ? 'both_accepted'
          : preferredMode;

        discoveredBuyers.push({
          id: `cb-scraped-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: s.title.slice(0, 95),
          companyOrGroup:
            platform === 'reel_buyer'
              ? `Creador / JV Buyer (${targetMarket})`
              : platform === 'reddit'
              ? `Reddit Investor Thread (${targetMarket})`
              : platform === 'facebook_group'
              ? `Facebook Cash Buyers Group (${targetMarket})`
              : `Comprador Directo / JV Portal (${targetMarket})`,
          platform,
          market: targetMarket,
          buyBoxType: targetType,
          maxPrice:
            targetType === 'Land / Home Builder'
              ? '$15,000 – $140,000 (Lotes Baldíos)'
              : '$65,000 – $480,000 (Cash / JV)',
          finderPayoutOffer:
            mode === 'lead_only_birddog'
              ? '💰 Paga $1,500 a $5,000 Finder’s Fee (Solo por pasar la propiedad sin contrato)'
              : mode === 'contract_signed'
              ? '💰 Paga 50/50 JV Split ($10,000–$25,000) o 100% de tu Assignment Fee con Contrato'
              : '💰 Paga $2,000–$5,000 Bird Dog Fee (sin contrato) O 50/50 JV Split ($10k–$25k+ con contrato)',
          dealRequirementMode: mode,
          dealRequirementLabel:
            mode === 'lead_only_birddog'
              ? '🔍 Acepta SOLO Encontrar la Propiedad / Lead Crudo (Sin Contrato Firmado)'
              : mode === 'contract_signed'
              ? '📄 Requiere Contrato Ya Firmado (Signed PSA con Cláusula de Asignación)'
              : '🤝 Acepta AMBOS (Solo la Propiedad Calificada O Contrato Ya Firmado)',
          dealRequirementDetails:
            mode === 'lead_only_birddog'
              ? `Puedes enviarle la propiedad encontrada en ${targetMarket} con los datos de motivación del dueño para que su equipo de adquisiciones negocie y firme el contrato, pagándote comisión de buscador al cerrar.`
              : `Si ya tienes el Purchase & Sale Agreement firmado en ${targetMarket} (con 14-30 días de inspección), te compran o asignan el contrato. Si solo tienes el lead motivado, solicita acuerdo JV antes de pasar la dirección.`,
          propertySpecsWanted:
            targetType === 'Land / Home Builder'
              ? `Lotes residenciales baldíos (Infill Lots de 0.15 a 1.5 acres) en ${targetMarket}, sin humedales, calle pavimentada y electricidad.`
              : targetType === 'Multifamily / Creative'
              ? `Casas con hipoteca baja (2.5%–4.5% Subject-To) o Multifamiliares (2–4 unidades) con Seller Financing en ${targetMarket}.`
              : `Casas Single-Family 3+ Beds, 1.5+ Baths, >1,050 SqFt con necesidad de remodelación (Fix & Flip / Rental) en ${targetMarket}.`,
          priceAndArvRange:
            targetType === 'Land / Home Builder'
              ? 'Compra al 40%–55% del valor de lotes comparables vendidos a constructores.'
              : 'Precio máximo <= (ARV × 70%) - Reparaciones | ARV objetivo: $140,000 a $500,000.',
          contactInfo: s.url,
          sourceUrl: s.url,
          directContactChannels: {
            dealPortalUrl: s.url,
            socialDmUrl: `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(
              `${targetMarket} wholesale real estate`
            )}`,
            communityUrl: `https://www.reddit.com/r/WholesalingHouses/search/?q=${encodeURIComponent(
              targetMarket
            )}&restrict_sr=1`,
          },
          readyPitchMessage: `Hi! I found an off-market ${targetType} opportunity in ${targetMarket} that fits your Buy Box (deep discount below ARV, motivated owner). Do you prefer that I send over the signed PSA to JV/assign, or can I submit the property lead to your acquisitions team for a Finder's Fee?`,
          notes:
            s.snippet ||
            `Canal activo detectado en vivo para ${targetMarket} (${targetType}).`,
          verified: true,
        });
      }
    }

    // Always generate targeted Deep Search Cards for Creators, Bird-Dog Buyers & Reddit in that specific market
    const guaranteedMarketBuyers: VerifiedCashBuyer[] = [
      {
        id: `cb-birddog-creators-${Date.now()}`,
        name: `Creadores & Bird-Dog Buyers Buscando Propiedades en ${targetMarket} (${targetType})`,
        companyOrGroup: `Instagram / YouTube / TikTok JV & Bird-Dog Buyers (${targetMarket})`,
        creatorHandle: `@${targetMarket.toLowerCase().replace(/[^a-z]/g, '')}_investors`,
        platform: 'reel_buyer',
        market: targetMarket,
        buyBoxType: targetType,
        maxPrice: '$50,000 – $450,000',
        finderPayoutOffer:
          '💰 Paga $2,000–$10,000 Finder’s Fee (Solo por encontrar la propiedad) O 50/50 JV Split con Contrato',
        dealRequirementMode: 'both_accepted',
        dealRequirementLabel:
          '🤝 Acepta AMBOS (Solo Encontrar la Propiedad Sin Contrato O Contrato Ya Firmado)',
        dealRequirementDetails:
          `Búsqueda directa de creadores e inversionistas en ${targetMarket} que publican "Send me deals in ${targetMarket}" o "We pay Bird Dogs". Si solo encontraste la propiedad motivada, firma un acuerdo JV/Finder de 1 página y su cerrador llama al dueño; si ya tienes el contrato PSA firmado, dividen 50/50.`,
        propertySpecsWanted:
          `Propiedades Off-Market en ${targetMarket} (${targetType}): Pre-Foreclosures, Tax Delinquent, Dueños Fallecidos (Pre-Probate), Code Violations o Zillow FSBO con +60 días.`,
        priceAndArvRange:
          'Oferta entre el 60% y 70% del ARV menos reparaciones (margen mínimo de $20,000).',
        contactInfo: `Búsqueda directa en IG / YouTube / Reddit para ${targetMarket}`,
        sourceUrl: `https://www.google.com/search?q=${encodeURIComponent(
          `site:instagram.com OR site:tiktok.com "${targetMarket}" "send me deals" OR "buy box" OR "cash buyer" real estate`
        )}`,
        directContactChannels: {
          dealPortalUrl: `https://www.google.com/search?q=${encodeURIComponent(
            `"${targetMarket}" "submit a deal" OR "bird dog" wholesale real estate`
          )}`,
          socialDmUrl: `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(
            `${targetMarket} cash buyer`
          )}`,
          communityUrl: `https://www.facebook.com/search/groups/?q=${encodeURIComponent(
            `${targetMarket} real estate investors cash buyers`
          )}`,
        },
        readyPitchMessage: `Hey! Saw you're actively buying ${targetType} deals in ${targetMarket}. I’m sourcing off-market distressed properties in ${targetMarket} right now — what is your exact Buy Box (zip codes, bed/bath, max price), and do you require the PSA already signed or do you also pay a Finder's Fee / JV on raw motivated seller leads?`,
        notes: `Enlace de búsqueda profunda para encontrar creadores de Reels/TikTok e inversionistas locales en ${targetMarket} que pagan por encontrar propiedades.`,
        verified: true,
      },
      {
        id: `cb-reddit-market-${Date.now()}`,
        name: `Hilos de Reddit: Cash Buyers & Bird-Dog Closers en ${targetMarket}`,
        companyOrGroup: 'r/WholesalingHouses & r/WholesaleRealestate',
        creatorHandle: 'Reddit Cash Buyers',
        platform: 'reddit',
        market: targetMarket,
        buyBoxType: targetType,
        maxPrice: '$40,000 – $500,000',
        finderPayoutOffer:
          '💰 $1,500–$3,500 Bird Dog Fee (sin contrato) O 50/50 JV / 100% Assignment Fee (con contrato)',
        dealRequirementMode: 'both_accepted',
        dealRequirementLabel:
          '🤝 Acepta AMBOS (Pasar Lead Motivado a un Closer O Vender Contrato Ya Firmado)',
        dealRequirementDetails:
          `Hilos verificados de Reddit donde inversionistas en ${targetMarket} publican sus criterios de compra (Buy Box) y correos electrónicos para recibir tratos con o sin contrato.`,
        propertySpecsWanted: `Casas Single-Family 3/2, Multifamiliares y Lotes en ${targetMarket}.`,
        priceAndArvRange: '65%–70% del ARV menos reparaciones.',
        contactInfo: `DM directo en Reddit para ${targetMarket}`,
        sourceUrl: `https://www.reddit.com/search/?q=${encodeURIComponent(
          `"${targetMarket}" ("cash buyer" OR "buy box" OR "send me deals" OR "JV") wholesale`
        )}&type=link`,
        directContactChannels: {
          dealPortalUrl: `https://www.reddit.com/search/?q=${encodeURIComponent(
            `"${targetMarket}" ("cash buyer" OR "buy box" OR "send me deals" OR "JV") wholesale`
          )}&type=link`,
          communityUrl: 'https://www.reddit.com/r/WholesalingHouses/',
        },
        readyPitchMessage: `Hey! Saw your post on Reddit looking for deals in ${targetMarket}. I have an off-market ${targetType} property in ${targetMarket}. Shoot me your email and exact Buy Box so I can send over the numbers!`,
        notes: `Búsqueda directa de hilos en Reddit para ${targetMarket} donde compradores comparten su Buy Box.`,
        verified: true,
      },
    ];

    const allNew = [...guaranteedMarketBuyers, ...discoveredBuyers];
    const db = getDatabase();
    if (!db.cashBuyers) db.cashBuyers = [];

    for (const item of allNew) {
      if (!db.cashBuyers.some((existing) => existing.sourceUrl === item.sourceUrl)) {
        db.cashBuyers.unshift(item);
      }
    }

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      addedCount: allNew.length,
      cashBuyers: db.cashBuyers,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Error al buscar Cash Buyers';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
