const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. UPDATE ZACH GINN CREATOR DETAILS
const zach = db.igCreators.find(c => c.handle && c.handle.includes('flipwithzach'));
if (zach) {
  const newReel = 'https://www.instagram.com/reel/DeDFblQjNUI/';
  if (!zach.reelUrls) zach.reelUrls = [];
  if (!zach.reelUrls.includes(newReel)) {
    zach.reelUrls.push(newReel);
  }
  zach.reelsCount = zach.reelUrls.length;
  zach.notes = (zach.notes || '') + ' | Reel DeDFblQjNUI: Caso de estudio de $70,000 en UN solo deal de Sucesiones (Probate). Localización de herederos directos, negociación empática y estructuración legal con la compañía de título para evitar demandas ("Lawsuit-Proof Probate").';
}

// 2. ADD MISS DANI AI TO CREATORS
const daniExists = db.igCreators.some(c => c.handle && c.handle.includes('missdani.ai'));
if (!daniExists) {
  db.igCreators.push({
    id: 'creator-miss-dani-ai',
    handle: '@missdani.ai',
    name: 'Miss Dani AI',
    role: 'Especialista en Automatización con IA Agéntica & Flujos de Ejecución Autónoma',
    marketsTheyBuy: 'Nacional & Global (Sistemas de Agentes Inteligentes con Gemini, ChatGPT, Claude & DeepSeek)',
    notes: 'Reel DdXgpZgifRc: "La IA ya no solo responde. Ahora ejecuta." Integración de agentes autónomos que investigan registros públicos, analizan bases de datos, generan ofertas y ejecutan procesos de ventas inmobiliarias en tiempo real sin fricción humana.',
    buyBoxSummary: 'Workflows de IA generativa y agentes autónomos para prospección masiva y cierres inmobiliarios',
    preferredContactMethod: 'Instagram DM @missdani.ai',
    outreachStatus: 'not_contacted'
  });
}

// 3. CREATE SKILL 14: Master Probate Wholesaling ($70k Assignment & Lawsuit-Proof Protocol)
const skillExists = db.skills.some(s => s.id === 'skill-14-probate-70k-lawsuit-proof');
if (!skillExists) {
  const newSkill = {
    id: 'skill-14-probate-70k-lawsuit-proof',
    title: 'Sucesiones y Herencias de Alto Valor (Probate Wholesaling): Protocolo de $70,000 & Blindaje Legal',
    slug: 'wholesale-probate-70k-lawsuit-proof',
    category: 'Government Lists',
    version: '1.0',
    lastUpdated: '2026-10-05',
    summary: 'Metodología avanzada extraída de Zach Ginn (@flipwithzach - Reel DeDFblQjNUI) para cerrar asignaciones de hasta $70,000 en propiedades de herencias (Probate / Intestate Estates). Incluye la identificación del Representante Personal / Albacea (PR / Executor), negociación compasiva sin intermediarios y el protocolo de blindaje legal (\"Lawsuit-Proof Title\") con Letters of Administration y Affidavit of Heirship para cerrar limpiamente en la compañía de título.',
    workflowSteps: [
      {
        id: 'probate-70k-step-1',
        order: 1,
        title: 'Extracción de la Petición de Sucesión (Probate Docket & Letters Testamentary)',
        actionDescription: 'Descarga semanalmente los registros del Tribunal Testamentario (Probate Court / Surrogate Court) del condado.',
        exactCommandsOrClicks: [
          'Ingresa al portal del tribunal de sucesiones del condado (ej. Wayne County Probate Court en MI, Cuyahoga County Probate en OH, o Dallas County Probate en TX).',
          'Filtra casos iniciados en los últimos 30 a 90 días con categoría: "Formal Administration" o "Petition for Administration".',
          'Abre el expediente del caso e identifica: 1) Nombre del difunto (Decedent), 2) Nombre y dirección del Representante Personal / Albacea (Personal Representative o PR), 3) Lista de bienes inmuebles declarados (Inventory of Real Estate).'
        ],
        proTip: 'En los casos donde la casa tiene equidad sustancial y está libre de hipoteca pero deteriorada, los herederos suelen vivir fuera del estado y buscan liquidar rápidamente para repartir el dinero.',
        sourceAttribution: 'Zach Ginn (@flipwithzach) — Reel DeDFblQjNUI',
        completed: false
      },
      {
        id: 'probate-70k-step-2',
        order: 2,
        title: 'Contacto Empático con el Albacea (The Compassionate Executor Cold Call)',
        actionDescription: 'Aborda al Representante Personal con respeto y profesionalismo, sin mencionar la muerte de forma agresiva.',
        exactCommandsOrClicks: [
          'Skip-trace del Albacea en CyberBackgroundChecks.com o TruePeopleSearch.',
          'Apertura empática: "Hola [Nombre del Albacea], le habla Alex de AI Automated Services LLC. Le llamo con respecto a la propiedad familiar en [Dirección]. Primero que todo, mis sinceras condolencias por la pérdida de su familia. Sé que gestionar una sucesión conlleva muchos trámites y tensiones."',
          'Propuesta de valor: "Nuestra empresa ayuda a familias en proceso de sucesión comprando la propiedad exactamente en el estado en que se encuentra (As-Is), sin necesidad de que limpien muebles viejos, reparen nada ni paguen comisiones de realtor del 6%, permitiendo cerrar y liberar los fondos de la herencia rápidamente."'
        ],
        proTip: 'Nunca utilices la palabra \"muerte\" o \"fallecido\" repetidamente. Enfréntalo como una solución logística para aliviar la carga administrativa de la familia.',
        sourceAttribution: 'Zach Ginn — FreeWholesaling.com',
        completed: false
      },
      {
        id: 'probate-70k-step-3',
        order: 3,
        title: 'Protocolo de Blindaje Legal para Prevenir Demandas ("Lawsuit-Proof Probate Protocol")',
        actionDescription: 'Garantiza que la venta cuente con la autorización judicial y de todos los herederos legítimos.',
        exactCommandsOrClicks: [
          'Verifica si el tribunal ya emitió las \"Letters of Administration\" o \"Letters Testamentary\" que otorgan autoridad legal al Albacea para vender.',
          'Si el testamento no otorga poder expreso de venta (Power of Sale), solicita al abogado de la sucesión o prepara la petición formal ante el juez: \"Order Authorizing Sale of Real Property\".',
          'Si no hay testamento (Intestate), coordina con la compañía de título la firma de un \"Affidavit of Heirship\" firmado por dos testigos desinteresados para asegurar que ningún heredero omitido pueda demandar posteriormente.',
          'Envía el contrato PSA As-Is a nombre de \"AI Automated Services LLC and/or assigns\" con un depósito EMD de $500 en la cuenta de custodia (Escrow).'
        ],
        proTip: 'El error que lleva a demandas (\"Lawsuit City\") es poner bajo contrato la casa con uno de los hijos cuando existen otros 3 hermanos que no han firmado. Todos los herederos o el Albacea con orden del juez deben ratificar la venta.',
        sourceAttribution: 'Zach Ginn — Warning: How a $70k deal turns into Lawsuit City',
        completed: false
      },
      {
        id: 'probate-70k-step-4',
        order: 4,
        title: 'Asignación de Alto Margen ($70,000 Assignment Fee)',
        actionDescription: 'Monetiza la tremenda brecha entre el precio pactado con la familia y el valor de mercado para compradores de Fix & Flip.',
        exactCommandsOrClicks: [
          'Al haber adquirido la propiedad con un descuento profundo (ej. comprada en $50,000 en un vecindario donde el ARV es de $220,000 y requiere $40,000 de reparaciones).',
          'Ofrece el trato a los 43 compradores verificados de la plataforma a un precio de $120,000 en efectivo.',
          'Firma el Assignment of Contract estipulando un Assignment Fee neto de $70,000 USD para AI Automated Services LLC.',
          'El comprador final aporta los $120,000 en la compañía de título: el tribunal/herederos reciben sus $50,000 pactados y la compañía de título gira tu cheque o transferencia bancaria de $70,000 USD limpios.'
        ],
        proTip: 'Un solo trato de sucesión de este calibre puede representar los ingresos de todo un año de trabajo gracias al diferencial masivo de equidad.',
        sourceAttribution: 'Zach Ginn (@flipwithzach) — Reel DeDFblQjNUI',
        completed: false
      }
    ],
    resources: [
      {
        id: 'res-zach-probate-ig',
        name: 'Zach Ginn Instagram Oficial (@flipwithzach)',
        url: 'https://www.instagram.com/flipwithzach/',
        category: 'mentor_profile',
        isFree: true,
        howToUse: 'Estrategias de Sucesiones (Probate), llamadas en frío a herederos y contratos libres de costo.',
        discoveredVia: 'reel-DeDFblQjNUI'
      },
      {
        id: 'res-miss-dani-ig',
        name: 'Miss Dani AI Instagram (@missdani.ai)',
        url: 'https://www.instagram.com/missdani.ai/',
        category: 'mentor_profile',
        isFree: true,
        howToUse: 'Implementación de agentes de IA autónomos que ejecutan tareas complejas de prospección y ventas.',
        discoveredVia: 'reel-DdXgpZgifRc'
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'template-probate-sympathy-script',
        title: 'Guión Telefónico Compasivo para Albaceas y Herederos (Zach Ginn Probate Closer)',
        type: 'phone_closer_script',
        whenToUse: 'Llamar al Representante Personal o albacea de un caso de sucesión abierto.',
        content: "\"Buenos días [Nombre del Albacea], le habla Alex de AI Automated Services LLC.\nLe llamo con el mayor de los respetos con relación a la propiedad familiar en [Dirección]. En primer lugar, permítame expresarle mis sinceras condolencias a usted y a su familia.\n\nSé que en estos momentos lidiar con trámites legales, la corte testamentaria y el mantenimiento de una propiedad puede ser desgastante. \n\nNuestra firma de inversiones se especializa en asistir a familias en procesos de sucesión. Lo que hacemos es muy simple:\n1. Adquirimos la propiedad completamente As-Is (tal como está), lo que significa que no tienen que limpiar pertenencias viejas, reparar el techo ni sacar muebles.\n2. No cobramos comisiones de intermediación inmobiliaria del 6% ni tarifas ocultas.\n3. Cubrimos los costos de cierre y coordinamos directamente con la compañía de título y el abogado de la sucesión para que los fondos queden liberados y disponibles para los herederos en un plazo récord.\n\n¿Ha pensado la familia si mantendrán la propiedad o si consideran más conveniente liquidarla para facilitar la distribución del patrimonio?\""
      },
      {
        id: 'template-probate-contingency-addendum',
        title: 'Cláusula de Autorización Judicial y Título Limpio para Sucesiones (Court Approval Addendum)',
        type: 'contract_template',
        whenToUse: 'Incluir en el contrato PSA de cualquier propiedad sujeta a proceso de Probate o herencia.',
        content: "PROBATE & COURT APPROVAL CONTINGENCY ADDENDUM\n\nProperty: [Dirección de la Propiedad]\nSeller (Estate Representative): [Nombre del Albacea / Personal Representative], as Personal Representative of the Estate of [Nombre del Difunto]\nBuyer: AI Automated Services LLC and/or assigns\n\n1. COURT APPROVAL: This Agreement is expressly contingent upon Seller obtaining all required Court Orders, Letters of Administration, or Court Approvals necessary to convey marketable fee-simple title to Buyer within sixty (60) days of execution.\n2. ALL HEIRS RATIFICATION: Seller warrants that all lawful heirs, beneficiaries, and interested parties have been disclosed and will execute all necessary deeds, affidavits of heirship, and closing instruments required by the Title Company.\n3. TITLE CLEARANCE: In the event marketable title cannot be conveyed free and clear of all estate debts, liens, or claims of creditors, Buyer shall have the immediate right to terminate this agreement and receive a full 100% refund of the Earnest Money Deposit.\n\nSigned by Seller & Buyer."
      }
    ],
    changelog: [
      {
        version: '1.0',
        date: '2026-10-05',
        sourceType: 'instagram_reel',
        sourceUrl: 'https://www.instagram.com/reel/DeDFblQjNUI/',
        sourceTitle: 'Reel IG @flipwithzach (DeDFblQjNUI) — $70,000 Probate Deal & Miss Dani AI (@missdani.ai)',
        summaryOfNewKnowledge: 'Metodología avanzada de Zach Ginn para cerrar tratos de sucesiones de $70,000 con blindaje contra demandas (Affidavit of Heirship y Letters of Administration) y visión agéntica de ejecución autónoma de Miss Dani AI.'
      }
    ],
    agyExportedPath: '.agents/skills/wholesale-probate-70k-lawsuit-proof/SKILL.md'
  };
  db.skills.push(newSkill);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated database with Skill 14 & Zach/Dani creators!');
console.log('Total Skills:', db.skills.length, '| Cash Buyers:', db.cashBuyers.length, '| Creators:', db.igCreators.length);
