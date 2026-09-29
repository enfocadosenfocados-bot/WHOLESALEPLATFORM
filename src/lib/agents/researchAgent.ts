import * as cheerio from 'cheerio';

export interface WebSearchSnippet {
  title: string;
  url: string;
  snippet: string;
}

export async function searchWebDuckDuckGo(query: string): Promise<WebSearchSnippet[]> {
  try {
    const encoded = encodeURIComponent(query);
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encoded}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(10000),
    });

    const html = await res.text();
    const $ = cheerio.load(html);
    const results: WebSearchSnippet[] = [];

    $('.result').each((_, el) => {
      if (results.length >= 6) return;
      const title = $(el).find('.result__title').text().trim();
      const snippet = $(el).find('.result__snippet').text().trim();
      let rawHref = $(el).find('.result__url').attr('href') || $(el).find('a.result__a').attr('href') || '';

      if (rawHref.includes('uddg=')) {
        try {
          const parsed = new URL(rawHref, 'https://duckduckgo.com');
          rawHref = decodeURIComponent(parsed.searchParams.get('uddg') || rawHref);
        } catch {
          // keep rawHref
        }
      }

      if (title && rawHref.startsWith('http')) {
        results.push({ title, url: rawHref, snippet });
      }
    });

    return results;
  } catch {
    return [];
  }
}

export const STATE_FOIA_LAWS: Record<string, string> = {
  Florida: 'Florida Public Records Law (Fla. Stat. Chapter 119 - Sunshine Law)',
  Texas: 'Texas Public Information Act (Tex. Gov’t Code Chapter 552)',
  California: 'California Public Records Act (Cal. Gov’t Code § 7920.000 et seq.)',
  Georgia: 'Georgia Open Records Act (O.C.G.A. § 50-18-70 et seq.)',
  Ohio: 'Ohio Public Records Act (Ohio Rev. Code § 149.43)',
  'North Carolina': 'North Carolina Public Records Law (N.C.G.S. Chapter 132)',
  Arizona: 'Arizona Public Records Law (A.R.S. § 39-121 et seq.)',
  Indiana: 'Indiana Access to Public Records Act (APRA - IC 5-14-3)',
  Tennessee: 'Tennessee Public Records Act (T.C.A. § 10-7-503)',
  Pennsylvania: 'Pennsylvania Right-to-Know Law (65 P.S. § 67.101 et seq.)',
  Michigan: 'Michigan Freedom of Information Act (MCL 15.231 et seq.)',
  Illinois: 'Illinois Freedom of Information Act (5 ILCS 140)',
};

export interface CountyPortalDiscovery {
  state: string;
  county: string;
  listType: string;
  foiaStatute: string;
  discoveredPortals: WebSearchSnippet[];
  stepByStepPlaybook: string[];
  readyToSendFoiaEmail: string;
}

export async function discoverCountyGovernmentPortals(
  state: string,
  county: string,
  listType: string
): Promise<CountyPortalDiscovery> {
  const cleanCounty = county.replace(/\s+county$/i, '').trim();
  const foiaStatute =
    STATE_FOIA_LAWS[state] || `${state} State Freedom of Information / Open Records Act`;

  const queries = [
    `${cleanCounty} County ${state} ${listType} official portal`,
    `${cleanCounty} County ${state} Property Appraiser Tax Assessor Clerk of Court`,
  ];

  const allSnippets: WebSearchSnippet[] = [];
  for (const q of queries) {
    const found = await searchWebDuckDuckGo(q);
    for (const item of found) {
      if (!allSnippets.some((existing) => existing.url === item.url)) {
        allSnippets.push(item);
      }
    }
  }

  // Always include verified fallback links so the user has guaranteed access
  if (allSnippets.length === 0) {
    allSnippets.push(
      {
        title: `NETR Online - ${cleanCounty} County, ${state} Public Records Directory`,
        url: `https://publicrecords.netronline.com/`,
        snippet: `Directorio oficial con enlaces directos al Property Appraiser, Tax Collector y Clerk of Court de ${cleanCounty} County, ${state}.`,
      },
      {
        title: `Búsqueda Directa: ${cleanCounty} County ${state} ${listType}`,
        url: `https://www.google.com/search?q=${encodeURIComponent(`${cleanCounty} County ${state} ${listType} official records`)}`,
        snippet: `Acceso directo a los portales gubernamentales del condado de ${cleanCounty}.`,
      }
    );
  }

  const stepByStepPlaybook = [
    `1. Abre el portal oficial del condado de ${cleanCounty}, ${state} (ver enlaces descubiertos abajo) o entra por NETR Online -> ${state} -> ${cleanCounty}.`,
    `2. Para "${listType}": ${
      listType.toLowerCase().includes('code')
        ? `Busca la sección "Code Enforcement / Citizen Access (Accela / EnerGov)" y filtra casos con estado "Open / Notice of Violation" de los últimos 60 días.`
        : listType.toLowerCase().includes('probate') || listType.toLowerCase().includes('foreclosure')
        ? `Entra al "${cleanCounty} County Clerk of Court -> Official Records Search" y filtra por Document Type: "${listType}" en los últimos 90 días.`
        : listType.toLowerCase().includes('tax')
        ? `Entra al "${cleanCounty} County Tax Collector / Treasurer" y descarga el "Delinquent Real Estate Tax Roll" filtrando dueños con 2+ años de atraso.`
        : `Solicita el registro electrónico de ${listType} al departamento municipal de ${cleanCounty} usando la carta legal FOIA adjunta.`
    }`,
    `3. Cruza cada dirección con el ${cleanCounty} County Property Appraiser para obtener el "Owner Name" y la "Owner Mailing Address" (prioriza cuando Mailing Address != Property Address).`,
    `4. Pasa la lista por TruePeopleSearch.com y CyberBackgroundChecks.com para obtener teléfonos Wireless gratuitos y llama con el guion de los 4 Pilares.`,
  ];

  const today = new Date().toISOString().split('T')[0];
  const sixtyDaysAgo = new Date(Date.now() - 60 * 86400000).toISOString().split('T')[0];

  const readyToSendFoiaEmail = `Subject: Public Records Request (${foiaStatute}) - ${listType} List (${cleanCounty} County)

Dear Custodian of Public Records for ${cleanCounty} County, ${state},

Pursuant to the ${foiaStatute}, I am formally requesting an electronic copy (preferably in Excel .xlsx, .csv, or PDF format) of the following public records:

- Record Type Requested: Active/Open ${listType} records for residential properties in ${cleanCounty} County.
- Date Range: From ${sixtyDaysAgo} through ${today}.
- Requested Fields: Property Street Address, Parcel ID (APN), Owner Name, Owner Mailing Address, Filing/Violation Date, and Current Case Status.

Please deliver the requested records electronically via reply to this email. If there are any administrative costs associated with fulfilling this electronic request that exceed $15.00, please notify me in advance for approval.

Thank you very much for your public service and assistance.

Sincerely,
[Tu Nombre / Tu LLC]
[Tu Teléfono]
[Tu Email]`;

  return {
    state,
    county: cleanCounty,
    listType,
    foiaStatute,
    discoveredPortals: allSnippets.slice(0, 6),
    stepByStepPlaybook,
    readyToSendFoiaEmail,
  };
}
