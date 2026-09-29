import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const xleadsSlug = 'wholesale-xleads-pumpstacker-obituary-curative-ai';
const existingIdx = db.skills.findIndex((s) => s.slug === xleadsSlug);

const xleadsSkill = {
  id: 'skill-9-xleads-pumpstacker',
  slug: xleadsSlug,
  title: 'XLeads X-Plan & PumpStacker: AI Death Scrubbing, Obituary Scraper, Curative Title & SkyDrive AI',
  category: 'Government Lists',
  version: '1.4',
  masteryScore: 98,
  lastUpdated: new Date().toISOString().split('T')[0],
  summary:
    'Sistema completo que replica las funciones del plan X-Plan ($249/mes) y PumpStacker de XLeads.com con costo $0: AI Death Scrubbing (detectar propietarios fallecidos antes de Probate), AI Obituary Scraper (extraer los nombres de los herederos sobrevivientes "Survived by..." desde Legacy.com/FindAGrave y hacerles Skip Tracing gratis), Curative Title + Deep List Stacking (resolver títulos sucios con Affidavit of Heirship y reducir multas de Code Enforcement un 85%-90%), 5 AI Zip Codes (SkyDrive AI + Sellability Scores) y BuyerMatch AI Dispo.',
  whyItWorks:
    'El 95% de los wholesalers compiten por las mismas listas fáciles y abandonan cualquier trato donde el dueño falleció sin Probate o donde existen $18,000 en multas municipales (Code Liens). Usando AI Death Scrubbing + AI Obituary Scraper encuentras a los hijos/herederos ANTES de que abran un caso en la corte (Pre-Probate), y usando Curative Title (Affidavit of Heirship + Lien Reduction Request) limpias el título en la compañía de título logrando descuentos del 40% al 60% sin competencia.',
  executorType: 'ai_skill_runner',
  steps: [
    {
      id: 'xleads-step-1',
      order: 1,
      title: 'AI Death Scrubbing: Detectar Propietarios Fallecidos en tus Listas (Pre-Probate)',
      actionDescription:
        'Toma tu lista de Tax Delinquent, Code Violations o Vacant y filtra propietarios con +15 años de tenencia o nombres tipo "Estate of / Heirs of". Cruza el nombre y ciudad contra Legacy.com, FindAGrave.com y FamilySearch Social Security Death Index.',
      exactCommandsOrClicks: [
        'Abrir la pestaña "⚡ PumpStacker & XLeads Suite" -> "1. AI Death Scrub & Obituary Scraper"',
        'Pegar el nombre del propietario o cargar el lote CSV en la tabla "Batch Death Scrub & Free Skip-Trace"',
        'Verificar confirmación de fallecimiento en Legacy.com y FindAGrave.com con 1 clic',
      ],
      sourceAttribution: 'XLeads.com (X-Plan / PumpStacker AI Death Scrubbing)',
      proTip:
        'Las propiedades donde el dueño falleció hace 3 a 18 meses pero aún NO han abierto Probate en la corte son las más rentables de todo el Real Estate ("Pre-Probate Leads").',
      completed: true,
    },
    {
      id: 'xleads-step-2',
      order: 2,
      title: 'AI Obituary Scraper: Extraer Herederos Sobrevivientes ("Survived By...") y Skip-Trace Gratis',
      actionDescription:
        'Usa el motor de IA para leer el texto del obituario ("Survived by his wife Mary, son David Miller of Tampa, daughter Sarah Jenkins of Charlotte...") y extraer el nombre completo y ciudad actual de cada heredero vivo.',
      exactCommandsOrClicks: [
        'Ejecutar "AI Death Scrubbing & Extraer Herederos Vivos" en el dashboard',
        'Identificar al Heredero #1 (usualmente el hijo local o el hijo que vive fuera del estado y no quiere viajar a mantener la casa)',
        'Hacer clic en "TruePeopleSearch", "FastPeopleSearch" y "CyberBackgroundChecks" junto a cada heredero para obtener su celular personal gratis',
      ],
      sourceAttribution: 'XLeads.com (AI Obituary Scraper Inside PumpStacker)',
      proTip:
        'El heredero que vive fuera del estado (Out-of-State Heir) suele ser el más motivado para vender rápido en efectivo y dividir el dinero con sus hermanos.',
      completed: true,
    },
    {
      id: 'xleads-step-3',
      order: 3,
      title: 'PumpStacker: Deep List Stacking + Solución de Títulos Sucios (Curative Title)',
      actionDescription:
        'Apila múltiples listas (Dead Owner + Tax Delinquent + Code Violation + Water Shut-Off) para priorizar propiedades con 3x o 4x motivaciones acumuladas y aplica ingeniería de Curative Title para limpiar gravámenes y herencias.',
      exactCommandsOrClicks: [
        'Si el dueño falleció sin testamento/Probate: solicitar a tu Investor-Friendly Title Company un "Affidavit of Heirship" firmado por los herederos y 2 testigos neutrales',
        'Si la casa tiene multas altas de Code Enforcement ($15k-$50k): presentar "Application for Lien Mitigation / Fine Reduction" ante el municipio (se reducen un 85% a 90% al comprometerse a reparar la propiedad)',
        'Anexar la "Cláusula Especial de Título Curativo (Curative Title Addendum)" de 45 días a tu contrato PSA',
      ],
      sourceAttribution: 'XLeads.com (PumpStacker Software: Curative Title + Deep List Stacking)',
      proTip:
        'Nunca descartes una casa por tener $25,000 en multas de pasto alto o código municipal; las ciudades perdonan hasta el 90% de la multa cuando un inversionista compra y rehabilita la propiedad.',
      completed: true,
    },
    {
      id: 'xleads-step-4',
      order: 4,
      title: '5 AI Zip Codes (SkyDrive AI + AI Sellability Scores 0-100)',
      actionDescription:
        'Enfoca el 80% de tu presupuesto/tiempo en los 5 Códigos Postales con mayor velocidad de cierres en efectivo (AI Sellability Score) y usa inspección satelital/StreetView (SkyDrive AI) para puntuar el deterioro del techo y terreno.',
      exactCommandsOrClicks: [
        'Abrir "3. 5 AI Zip Codes & SkyDrive AI" e ingresar tu ciudad/condado',
        'Inspeccionar el techo en Google Earth 3D (buscar lonas azules/tarps, tejas desgastadas de +18 años) y StreetView histórico',
        'Priorizar propiedades con SkyDrive Visual Distress Score > 80/100',
      ],
      sourceAttribution: 'XLeads.com (5 AI Zip Codes: SkyDrive AI + AI Sellability Scores)',
      completed: true,
    },
    {
      id: 'xleads-step-5',
      order: 5,
      title: 'BuyerMatch AI Dispo & XLeads Dispo Tab: Ranking de Cash Buyers y Dispo Blast',
      actionDescription:
        'Una vez firmado el contrato PSA con el vendedor o heredero, empareja la propiedad con los Cash Buyers que compraron en efectivo en ese mismo Zip Code en los últimos 12 meses y envía el Dispo Packet por SMS y Email.',
      exactCommandsOrClicks: [
        'Abrir "4. BuyerMatch AI & Dispo Tab" e ingresar dirección, precio de contrato, Assignment Fee y ARV',
        'Contactar en orden del Rank #1 al #4 a los compradores con AI Match Score > 90%',
        'Exigir $5,000 de Earnest Money Deposit (EMD) no reembolsable en la compañía de título para asignar el contrato',
      ],
      sourceAttribution: 'XLeads.com (AI Ranked Cash Buyers + BuyerMatch AI Dispo)',
      completed: true,
    },
  ],
  resources: [
    {
      name: 'Legacy.com Obituary Search (AI Obituary Scraper Source)',
      url: 'https://www.legacy.com/obituaries/search',
      category: 'skip_tracing',
      isFree: true,
      howToUse: 'Busca el nombre y apellido del propietario para encontrar su obituario y extraer la lista de hijos/parientes en el párrafo "Survived by...".',
      discoveredVia: 'XLeads.com PumpStacker Research',
    },
    {
      name: 'FindAGrave Memorial & Family Links Database',
      url: 'https://www.findagrave.com/memorial/search',
      category: 'skip_tracing',
      isFree: true,
      howToUse: 'Confirma fecha exacta de fallecimiento y revisa los enlaces a cónyuges, padres e hijos registrados en el memorial.',
      discoveredVia: 'XLeads.com AI Death Scrubbing Research',
    },
    {
      name: 'TruePeopleSearch (Skip Tracing 100% Gratis para Herederos)',
      url: 'https://www.truepeoplesearch.com/',
      category: 'skip_tracing',
      isFree: true,
      howToUse: 'Ingresa el nombre de cada heredero extraído del obituario junto con su ciudad actual para obtener su celular directo gratis.',
      discoveredVia: 'FreeWholesaling + PumpStacker Workflow',
    },
    {
      name: 'CyberBackgroundChecks (Relatives & Associates Tree)',
      url: 'https://www.cyberbackgroundchecks.com/',
      category: 'skip_tracing',
      isFree: true,
      howToUse: 'Excelente para cruzar familiares de primer grado cuando el obituario solo menciona el primer nombre de los hijos.',
      discoveredVia: 'PumpStacker Heirship Workflow',
    },
    {
      name: 'Google Earth Web 3D (SkyDrive AI Roof & Lot Inspection)',
      url: 'https://earth.google.com/web/',
      category: 'comp_tool',
      isFree: true,
      howToUse: 'Inspecciona desde satélite el estado del techo, lonas azules, piscina verde o patio abandonado para calcular el SkyDrive Distress Score.',
      discoveredVia: 'XLeads SkyDrive AI Research',
    },
  ],
  scriptsAndTemplates: [
    {
      title: 'Guion Empático Pre-Probate para Herederos Extraídos de Obituarios',
      type: 'cold_call_script',
      whenToUse: 'Usar al llamar al hijo/hija o cónyuge sobreviviente detectado mediante AI Obituary Scraper.',
      content: `"Hola [Nombre del Heredero], te habla [Tu Nombre] aquí en [Ciudad]. Te llamo con mucho respeto por la casa familiar en [Dirección]. Sé que cuando una propiedad queda en la familia, encargarse del mantenimiento, impuestos y del papeleo de título puede ser abrumador. Nosotros compramos propiedades heredadas 100% como están —sin que tengan que limpiar ni reparar nada— y nuestra compañía de título se encarga de todo el trámite de traspaso de herederos (Affidavit of Heirship / Probate) sin costo de bolsillo para ustedes. ¿Ya tomaron una decisión sobre qué harán con la propiedad o estarían abiertos a recibir una oferta justa en efectivo?"`,
    },
    {
      title: 'Cláusula Especial de Título Curativo (Curative Title PSA Addendum)',
      type: 'contract_clause',
      whenToUse: 'Incluir en el Purchase & Sale Agreement cuando el dueño en título falleció o cuando existen multas municipales (Code Liens) por mitigar.',
      content: `CURATIVE TITLE ADDENDUM: Buyer and Seller agree that Title Company shall have up to forty-five (45) business days to cure any title defects, including executing Affidavits of Heirship, completing Summary Probate proceedings, or negotiating municipal code enforcement lien reductions. Buyer shall coordinate administrative curative title work through closing escrow, and Seller/Heirs agree to reasonably cooperate in signing required heirship affidavits or municipal lien mitigation applications.`,
    },
  ],
  changelog: [
    {
      version: '1.4',
      date: new Date().toISOString().split('T')[0],
      sourceType: 'webpage',
      sourceTitle: 'https://xleads.com (X-Plan & PumpStacker Deep Research)',
      sourceUrlOrRef: 'https://xleads.com',
      summaryOfNewKnowledge:
        'Ingeniería inversa e implementación completa de las 8 funciones de XLeads X-Plan y PumpStacker: 60,000 Skiptraced Records workflow, AI Ranked Cash Buyers, XLeads Dispo Tab, BuyerMatch AI Dispo, 5 AI Zip Codes (SkyDrive AI + Sellability Scores), PumpStacker (Curative Title + Deep List Stacking), AI Death Scrubbing y AI Obituary Scraper.',
    },
  ],
};

if (existingIdx >= 0) {
  db.skills[existingIdx] = xleadsSkill;
} else {
  db.skills.push(xleadsSkill);
}

db.ingestionHistory.unshift({
  id: 'ingest-xleads-pumpstacker-' + Date.now(),
  timestamp: new Date().toISOString(),
  sourceType: 'webpage',
  inputUrlOrFile: 'https://xleads.com',
  targetSkillSlug: xleadsSlug,
  targetSkillTitle: xleadsSkill.title,
  oldVersion: '1.0',
  newVersion: '1.4',
  summary:
    'Extraídas e implementadas todas las herramientas del plan X-Plan ($249/mes) y PumpStacker de XLeads.com: AI Death Scrubbing (detección de dueños fallecidos Pre-Probate), AI Obituary Scraper (extracción de herederos "Survived by..." + Skip Tracing gratis), PumpStacker (Deep List Stacking + Curative Title para reducir multas municipales un 85%-90% y resolver Heirs Property con Affidavit of Heirship), 5 AI Zip Codes (SkyDrive AI + Sellability Scores 0-100) y BuyerMatch AI Dispo.',
  screenOcrDetected: [
    '60,000 Skiptraced Record Download/month',
    'AI Ranked Cash Buyers + XLeads Dispo Tab + BuyerMatch AI Dispo',
    '5 AI Zip Codes (SkyDrive AI + AI Sellability Scores)',
    'Pump Stacker Software (Curative Title + Deep List Stacking)',
    'AI Death Scrubbing (Find Dead Owners from a List)',
    'AI Obituary Scraper (Inside PumpStacker)',
  ],
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log('Successfully added XLeads & PumpStacker Master Skill #9 to skills-db.json!');
