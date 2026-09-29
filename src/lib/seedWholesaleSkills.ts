import { SkillDatabase, SkillModule } from '@/types/skill';

export const INITIAL_WHOLESALE_SKILLS: SkillModule[] = [
  {
    id: 'skill-gov-lists',
    slug: 'wholesale-government-lists',
    title: 'Listas de Gobierno (Code Violations, Tax Delinquent, Probate & Water Shut-Off)',
    category: 'Government Lists',
    version: '1.2',
    lastUpdated: '2026-09-29',
    masteryScore: 78,
    summary:
      'Sistema paso a paso de FreeWholesaling.com para extraer listas gratuitas de vendedores con máxima motivación directamente de los portales del condado y municipios (sin pagar software caro), incluyendo solicitudes FOIA/Open Records.',
    whyItWorks:
      'A diferencia de las listas compradas en masa (PropStream/BatchLeads) donde compites con otros 50 wholesalers, las listas del gobierno (Code Violations, cortes de agua, sucesiones/Probate e impuestos atrasados) requieren contactar o navegar el portal municipal/condal, reduciendo la competencia en un 85%.',
    executorType: 'county_gov_finder',
    steps: [
      {
        id: 'gov-step-1',
        order: 1,
        title: 'Localizar el Portal Oficial del Condado / Ciudad (NETR Online + Clerk of Court)',
        actionDescription:
          'Entra al directorio de registros públicos del condado objetivo para ubicar 3 oficinas clave: Code Enforcement (Ciudad/Condado), Tax Collector / Treasurer y County Clerk of the Circuit Court.',
        exactCommandsOrClicks: [
          'Abre netronline.com -> Public Records Online -> Selecciona Estado y Condado.',
          'Identifica el link directo de "Property Appraiser / Tax Assessor" y "Clerk of Court / Recorder".',
          'Para Code Violations: busca en Google "[Nombre de Ciudad/Condado] Code Enforcement Lien Search" o "Building Department Open Violations".'
        ],
        proTip:
          'En muchos condados el portal de búsqueda de permisos ("Citizen Access" / Accela / EnerGov) permite exportar en CSV todas las quejas de Code Enforcement de los últimos 30-90 días sin siquiera enviar correo.',
        sourceAttribution: 'FreeWholesaling.com (Flip With Rick - Módulo Government Lists)',
        completed: false,
      },
      {
        id: 'gov-step-2',
        order: 2,
        title: 'Extraer Code Violations (Pasto alto, techos dañados, estructuras inseguras)',
        actionDescription:
          'Filtra únicamente violaciones físicas o estructurales abiertas (Open Cases) de los últimos 60 días y descarta violaciones triviales (como basura en la acera o autos mal estacionados).',
        exactCommandsOrClicks: [
          'En el portal municipal (Accela / Code Enforcement) selecciona "Search Cases" -> Status: "Open / Active / Notice of Violation".',
          'Filtra por palabras clave: Tall Grass, Overgrown, Unfit Structure, Boarded Up, Roof Damage, Condemned, Vacant.',
          'Si no está en línea, envía la plantilla FOIA / Public Records Request al departamento de Code Compliance pidiendo casos abiertos de los últimos 60 días con dirección de propiedad y Mailing Address del dueño.'
        ],
        proTip:
          'Pide siempre que el archivo incluya la "Owner Mailing Address". Si la dirección postal del dueño es diferente a la de la propiedad, tienes un Absentee Owner con una violación activa (combinación de oro).',
        sourceAttribution: 'FreeWholesaling.com + Estrategia Reels Code Enforcement',
        completed: false,
      },
      {
        id: 'gov-step-3',
        order: 3,
        title: 'Extraer Lista de Tax Delinquent (Impuestos Atrasados 2+ Años)',
        actionDescription:
          'Entra al portal del County Tax Collector / Treasurer y descarga la lista de propiedades con impuestos impagos (Delinquent Real Estate Taxes o Tax Certificates emitidos).',
        exactCommandsOrClicks: [
          'Busca "[County Name] Tax Collector Delinquent Tax Roll" o "Tax Lien Certificate List".',
          'Filtra propiedades con 2 o más años de atraso, sin hipoteca institucional reciente (si aparece en registros) y excluye terrenos baldíos si solo buscas casas (Use Code: Single Family Residential / 0100).',
          'Cruza la dirección con el Property Appraiser para verificar que el dueño haya comprado hace más de 5-10 años (alto equity).'
        ],
        proTip:
          'No llames diciendo "vi que no pagaste tus impuestos". Usa el acercamiento suave: "Hola, ¿eres el dueño de la propiedad en la calle X? Estaba buscando comprar una casa en el vecindario en efectivo..."',
        sourceAttribution: 'FreeWholesaling.com (Módulo Tax Delinquent)',
        completed: false,
      },
      {
        id: 'gov-step-4',
        order: 4,
        title: 'Extraer Probate (Sucesiones / Herencias) y Pre-Foreclosures (Lis Pendens)',
        actionDescription:
          'Utiliza el portal del County Clerk of Court (Official Records Search) para buscar casos de Probate recién abiertos y notificaciones de demanda hipotecaria (Lis Pendens / Notice of Default).',
        exactCommandsOrClicks: [
          'Entra a Clerk of Court -> Official Records / Case Search.',
          'En Document Type selecciona "Lis Pendens" (LP) o "Probate / Letters of Administration" de los últimos 30-90 días.',
          'En casos de Probate, identifica el nombre y dirección del "Personal Representative / Executor" (esa es la persona con firma legal para vender la propiedad heredada).'
        ],
        proTip:
          'En Probate, espera al menos 30-45 días desde que se emitieron las Letters of Administration para llamar con empatía; el Personal Representative suele querer liquidar rápido para repartir entre herederos.',
        sourceAttribution: 'FreeWholesaling.com (Probate Mastery)',
        completed: false,
      },
      {
        id: 'gov-step-5',
        order: 5,
        title: 'Solicitar Lista de Water Shut-Off (Cortes de Agua) y Fire Damaged',
        actionDescription:
          'Contacta a la empresa municipal de agua (Public Utilities) y al departamento de bomberos (Fire Marshal) mediante solicitud de registros públicos para obtener casas vacías o siniestradas.',
        exactCommandsOrClicks: [
          'Identifica si el servicio de agua es municipal (los servicios públicos estatales están sujetos a la ley FOIA / Sunshine Law).',
          'Envía el correo FOIA solicitando direcciones residenciales con desconexión de servicio de agua por más de 30 días.',
          'Solicita al Fire Department el "Incident Report Log" de incendios residenciales (Residential Structure Fires) del último trimestre.'
        ],
        proTip:
          'Si el empleado municipal dice "no tenemos esa lista", pregunta amablemente: "¿Cómo puedo enviar una solicitud formal de registros públicos (FOIA) al Records Custodian?". Están obligados por ley a responder.',
        sourceAttribution: 'FreeWholesaling.com (Secret Government Lists)',
        completed: false,
      }
    ],
    resources: [
      {
        id: 'res-netr',
        name: 'NETR Online - Directorio Nacional de Registros Públicos por Condado',
        url: 'https://publicrecords.netronline.com/',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Selecciona Estado -> Condado para abrir directamente el Tax Assessor, Clerk of Court y GIS.',
        discoveredVia: 'seed',
      },
      {
        id: 'res-regrid',
        name: 'Regrid (Mapa Nacional de Parcelas y Dueños)',
        url: 'https://app.regrid.com/us',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Permite ver límites de parcelas, nombre del propietario registrado, dirección postal (Mailing Address) y código de uso.',
        discoveredVia: 'seed',
      },
      {
        id: 'res-nfoic',
        name: 'NFOIC - Plantillas de Leyes de Registros Abiertos por Estado (FOIA)',
        url: 'https://www.nfoic.org/state-freedom-of-information-laws/',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Consulta el nombre exacto de la ley de registros públicos de cada estado (ej. Florida Statute Chapter 119, Texas Public Information Act) para citarla en tu email.',
        discoveredVia: 'deep_research',
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'tpl-foia-email',
        title: 'Plantilla Email FOIA / Solicitud de Registros Públicos (Code Violations & Water Shut-Off)',
        type: 'foia_request',
        whenToUse: 'Enviar al Records Custodian del Municipio o Departamento de Code Enforcement / Utilities.',
        content: `Subject: Public Records Request - Open Code Enforcement Cases / Residential Utility Disconnections

Dear Custodian of Public Records,

Pursuant to the State Open Records / Freedom of Information Act, I am requesting an electronic copy (preferably in Excel, CSV, or PDF format) of the following public records:

1. All open/active residential Code Enforcement violations recorded between [START DATE - 60 days ago] and [PRESENT DATE].
2. Please include the following fields if available in your system:
   - Property Street Address
   - Owner Name & Owner Mailing Address
   - Case Date / Violation Type (e.g., overgrown lot, unsafe structure, vacant property)
   - Case Status

Since I am requesting this data strictly in electronic format via email, please let me know if there are any fees before processing if they exceed $10.00.

Thank you very much for your time and assistance!

Best regards,
[Your Name]
[Your Phone Number]`,
      }
    ],
    sources: [
      {
        id: 'src-fw-gov',
        title: 'FreeWholesaling.com - Government Lists Master Module (Zach & Rick Ginn)',
        url: 'https://www.freewholesaling.com/',
        sourceType: 'seed_course',
        creator: 'Flip With Rick (Zach & Rick Ginn)',
        addedAt: '2026-09-29',
        rawTranscript: 'Módulo fundacional de extracción de listas gubernamentales: Code Violations, Probate, Tax Delinquent, Water Shut-Offs y Evictions.',
        screenOcrFindings: [
          'publicrecords.netronline.com',
          'County Clerk of Court -> Official Records -> Lis Pendens / Probate',
          'Accela Citizen Access -> Code Enforcement Search'
        ],
        deepResearchNotes: [
          'Verificado: Portales municipales Accela y EnerGov permiten descarga CSV directa sin solicitud manual en más de 400 municipios de EE.UU.'
        ],
        extractedStepsCount: 5,
        versionCreated: '1.2',
      }
    ],
    changelog: [
      {
        version: '1.0',
        date: '2026-09-29',
        summaryOfNewKnowledge: 'Base maestra cargada desde FreeWholesaling.com (Listas de Gobierno).',
        sourceTitle: 'FreeWholesaling.com Core Curriculum',
        sourceType: 'seed_course',
      },
      {
        version: '1.2',
        date: '2026-09-29',
        summaryOfNewKnowledge: 'Enriquecido con búsqueda directa en portales Accela/Citizen Access y plantillas FOIA estatales.',
        sourceTitle: 'Deep Research Enricher',
        sourceType: 'web_page',
      }
    ]
  },
  {
    id: 'skill-skip-tracing-outreach',
    slug: 'wholesale-free-skip-tracing-cold-calling',
    title: 'Skip Tracing Gratis & Cold Calling de Alta Conversión',
    category: 'Skip Tracing & Outreach',
    version: '1.1',
    lastUpdated: '2026-09-29',
    masteryScore: 74,
    summary:
      'Cómo encontrar los números de teléfono celular reales de propietarios motivados (incluyendo propiedades a nombre de LLCs o difuntos en Probate) 100% gratis y cómo estructurar la llamada en frío para detectar los 4 pilares de motivación.',
    whyItWorks:
      'Combinar el registro oficial del Property Appraiser (para obtener la dirección postal exacta del dueño) con buscadores públicos gratuitos permite alcanzar hasta un 75% de contacto directo sin pagar centavos por registro al empezar.',
    executorType: 'skip_trace_hub',
    steps: [
      {
        id: 'skip-step-1',
        order: 1,
        title: 'Obtener Nombre Exacto y Mailing Address en el County Property Appraiser',
        actionDescription:
          'Antes de buscar teléfonos, entra al Property Appraiser del condado con la dirección de la propiedad para ver quién figura como dueño legal y cuál es su dirección postal actual (Owner Mailing Address).',
        exactCommandsOrClicks: [
          'Pega la dirección del inmueble en el Property Appraiser del condado.',
          'Copia el "Owner Name" (nota: suele venir como APELLIDO NOMBRE) y la "Mailing Address".',
          'Si el dueño es una LLC, busca esa LLC en el portal Sunbiz / Secretary of State de ese estado y copia el nombre y dirección del "Registered Agent" o "Managing Member".'
        ],
        proTip:
          'La clave para no llamar al inquilino por error es buscar en los portales de Skip Tracing usando la "Owner Mailing Address", NO la dirección de la propiedad vacante/alquilada.',
        sourceAttribution: 'FreeWholesaling.com (Skip Tracing 101)',
        completed: false,
      },
      {
        id: 'skip-step-2',
        order: 2,
        title: 'Triangulación Gratuita de Teléfonos (TruePeopleSearch + CyberBackgroundChecks)',
        actionDescription:
          'Cruza el nombre del dueño + su dirección postal en los 3 mejores motores gratuitos de registros telefónicos de EE.UU.',
        exactCommandsOrClicks: [
          'Abre TruePeopleSearch.com -> pestaña "Name" o "Address" -> ingresa Nombre + Ciudad/Estado de la Mailing Address.',
          'Copia los primeros 2-3 números marcados como "Wireless" (Celular) y el más reciente ("Last reported 2025/2026").',
          'Si no aparece o es un caso de Probate, abre CyberBackgroundChecks.com o FastPeopleSearch.com y revisa la sección "Possible Relatives" para contactar a los familiares/herederos.'
        ],
        proTip:
          'CyberBackgroundChecks suele mostrar datos más limpios cuando TruePeopleSearch pide captcha o cuando buscas parientes de primer grado en propiedades abandonadas.',
        sourceAttribution: 'FreeWholesaling.com + Reels Skip Tracing Hacks',
        completed: false,
      },
      {
        id: 'skip-step-3',
        order: 3,
        title: 'Ejecutar Llamada Calificadora (Los 4 Pilares: Condición, Línea de Tiempo, Motivación y Precio)',
        actionDescription:
          'Llama usando un número local (Google Voice) y califica al vendedor sin sonar como un telemarketer corporativo.',
        exactCommandsOrClicks: [
          'Apertura casual: "¿Hola, hablo con [Nombre]? Qué tal, mi nombre es [Tu Nombre], te llamo rápido porque vi la propiedad en [Dirección] y quería saber si considerarías una oferta en efectivo por ella en algún momento."',
          'Pilar 1 (Motivación): "¿Qué te haría considerar venderla ahora mismo?"',
          'Pilar 2 (Condición): "¿Cómo están el techo, el aire acondicionado (HVAC), la plomería y la cocina? ¿Qué remodelaciones necesitaría?"',
          'Pilar 3 (Tiempo): "Si llegáramos a un acuerdo en efectivo sin comisiones, ¿en cuántas semanas te gustaría cerrar?"',
          'Pilar 4 (Precio): "¿Cuánto es lo mínimo que estarías buscando recibir libre de gastos para que tenga sentido para ti?"'
        ],
        proTip:
          'El primero que dice un número pierde apalancamiento. Intenta siempre que el vendedor te dé su expectativa primero; si se niega, usa la técnica del Reverse Price Anchor.',
        sourceAttribution: 'FreeWholesaling.com (Acquisitions & Cold Calling)',
        completed: false,
      }
    ],
    resources: [
      {
        id: 'res-tps',
        name: 'TruePeopleSearch (Skip Tracing 100% Gratis)',
        url: 'https://www.truepeoplesearch.com/',
        category: 'skip_tracing',
        isFree: true,
        howToUse: 'Busca por Nombre + Mailing Address; prioriza números Wireless reportados recientemente.',
        discoveredVia: 'seed',
      },
      {
        id: 'res-cbc',
        name: 'CyberBackgroundChecks (Alternativa Gratis + Parientes)',
        url: 'https://www.cyberbackgroundchecks.com/',
        category: 'skip_tracing',
        isFree: true,
        howToUse: 'Excelente para encontrar números adicionales, correos electrónicos y herederos en casos de Probate.',
        discoveredVia: 'seed',
      },
      {
        id: 'res-fps',
        name: 'FastPeopleSearch',
        url: 'https://www.fastpeoplesearch.com/',
        category: 'skip_tracing',
        isFree: true,
        howToUse: 'Tercer motor de respaldo para validar cuál teléfono celular coincide en los 3 portales.',
        discoveredVia: 'seed',
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'tpl-cold-call',
        title: 'Guion Maestro de Cold Calling (Vendedores Motivados - Flip With Rick)',
        type: 'cold_call_script',
        whenToUse: 'Al llamar a listas de gobierno (Code Violations, Tax Delinquent, Absentee Owners).',
        content: `1. APERTURA (Tono relajado, como un vecino o comprador local):
"Hola, ¿[Nombre del Dueño]? ¡Hola! Te habla [Tu Nombre]. Sé que te llamo de imprevisto, pero pasaba/estaba viendo propiedades por la zona de [Calle] y vi tu casa en [Dirección]. Solo llamaba para saber si de casualidad considerarías venderla por una oferta en efectivo."

2. SI DICE "DEPENDE DE LA OFERTA" O "TAL VEZ":
"Totalmente entendible. Para no hacerte perder el tiempo con un número al azar, cuéntame un poquito de la casa... ¿Actualmente vive alguien ahí o está vacía?"
"¿Cómo está de mantenimiento? ¿Hace cuánto se cambió el techo y el aire acondicionado?"

3. DESCUBRIR MOTIVACIÓN:
"Entiendo... ¿y qué te tiene pensando en la posibilidad de venderla en este momento?"

4. PEDIR EL PRECIO (PRE-OFERTA):
"Como nosotros compramos directo, pagamos todos los costos de cierre, no cobramos comisiones de realtor y la tomamos tal cual está (As-Is) sin que tengas que limpiar ni reparar nada... ¿qué precio tenías en mente para sentirte cómodo cerrando?"`,
      }
    ],
    sources: [
      {
        id: 'src-fw-skip',
        title: 'FreeWholesaling.com - Free Skip Tracing & Cold Calling Script',
        url: 'https://www.freewholesaling.com/',
        sourceType: 'seed_course',
        creator: 'Flip With Rick',
        addedAt: '2026-09-29',
        rawTranscript: 'Proceso completo de Skip Tracing gratuito y estructura de los 4 pilares de adquisición.',
        screenOcrFindings: ['truepeoplesearch.com', 'cyberbackgroundchecks.com', 'fastpeoplesearch.com'],
        deepResearchNotes: ['Portales de Secretary of State (como sunbiz.org en FL) permiten desenmascarar dueños detrás de LLCs gratis.'],
        extractedStepsCount: 3,
        versionCreated: '1.1',
      }
    ],
    changelog: [
      {
        version: '1.1',
        date: '2026-09-29',
        summaryOfNewKnowledge: 'Módulo inicial con triangulación en 3 buscadores gratuitos y guion de los 4 pilares.',
        sourceTitle: 'FreeWholesaling.com Core Curriculum',
        sourceType: 'seed_course',
      }
    ]
  },
  {
    id: 'skill-deal-analysis-mao',
    slug: 'wholesale-arv-comps-mao-calculator',
    title: 'Análisis de Comps (ARV), Estimación de Reparaciones y Oferta MAO (Reverse Price Anchor)',
    category: 'Deal Analysis & Offers',
    version: '1.3',
    lastUpdated: '2026-09-29',
    masteryScore: 85,
    summary:
      'Metodología exacta para calcular el ARV (After Repair Value) usando propiedades vendidas en Zillow/Redfin, estimar costos de remodelación sin ser contratista y presentar tu oferta máxima (MAO) usando el anclaje inverso de precio.',
    whyItWorks:
      'La mayoría de principiantes sobreestiman el ARV usando casas en venta (Active) en lugar de casas vendidas (Sold) o calculan mal las reparaciones, quedándose con contratos imposibles de vender a un Cash Buyer.',
    executorType: 'deal_calculator',
    steps: [
      {
        id: 'comp-step-1',
        order: 1,
        title: 'Sacar Comps Reales (Regla de 0.5 Millas, Mismo Vecindario y Vendidas en < 90 Días)',
        actionDescription:
          'Abre Zillow o Redfin y aplica los filtros estrictos de comparables para determinar en cuánto se vende la casa ya remodelada (ARV).',
        exactCommandsOrClicks: [
          'En Zillow cambia el filtro de "For Sale" a "Sold" (amarillo).',
          'En "Sold In Last" selecciona: 3 Months (máximo 6 meses si hay pocas ventas).',
          'Filtra por el mismo tipo de propiedad (Single Family), +- 250 pies cuadrados (SqFt), igual o similar número de habitaciones/baños y año de construcción (+- 15 años).',
          'Dibuja el polígono en el mapa sin cruzar autopistas principales, vías de tren ni ríos (que dividen subdivisiones de distinto valor).',
          'Promedia el precio por pie cuadrado ($/SqFt) de los 3 mejores comparables remodelados y multiplícalo por los SqFt de tu propiedad.'
        ],
        proTip:
          'Nunca uses el Zestimate. Revisa siempre las fotos interiores del comparable vendido para confirmar que tenía cocina y baños modernos.',
        sourceAttribution: 'FreeWholesaling.com (Comping Mastery)',
        completed: false,
      },
      {
        id: 'comp-step-2',
        order: 2,
        title: 'Estimar Reparaciones por Nivel de Daño (Light, Medium, Heavy / Gut Rehab)',
        actionDescription:
          'Calcula el costo de rehabilitación basándote en los pies cuadrados de la propiedad y los "Big 5" (Techo, HVAC, Plomería, Electricidad y Fundación).',
        exactCommandsOrClicks: [
          'Rehab Ligero (Cosmético: pintura, pisos, limpieza): $15 - $25 por SqFt.',
          'Rehab Medio (Cocina, baños, pisos, pintura + 1 elemento grande como techo o A/C): $30 - $45 por SqFt.',
          'Rehab Pesado / Full Gut (Todo nuevo, techo, HVAC, electricidad, plomería, cocina, baños): $55 - $80+ por SqFt.'
        ],
        proTip:
          'Pregunta siempre al vendedor por teléfono: "¿De qué año es el techo y el aire acondicionado?". Esos dos rubros solos pueden sumar $15,000 - $25,000.',
        sourceAttribution: 'FreeWholesaling.com (Repair Estimator)',
        completed: false,
      },
      {
        id: 'comp-step-3',
        order: 3,
        title: 'Aplicar Fórmula MAO Dinámica y Presentar con Reverse Price Anchor',
        actionDescription:
          'Calcula tu Oferta Máxima Aceptable (MAO) asegurando margen para el Flipper/Cash Buyer y tu Assignment Fee, y ancla un precio inicial menor para negociar.',
        exactCommandsOrClicks: [
          'Fórmula Clásica: MAO = (ARV × % Comprador [70% a 80% según precio del mercado]) - Reparaciones - Tu Assignment Fee ($10k - $25k).',
          'Oferta Inicial (Low Anchor): Empieza un 10%-15% por debajo de tu MAO.',
          'Usa el "Good Cop / Bad Cop" (El socio financiero): "Mi socio de números me dijo que con las reparaciones del techo estábamos cerca de $[Oferta Baja], sé que es bajo... ¿qué tan cerca de eso podríamos llegar para cerrarlo rápido?".'
        ],
        proTip:
          'En propiedades de menos de $150k ARV, el 70% suele quedar alto porque el flipper necesita un mínimo de $30k de ganancia fija. Ajusta el multiplicador según el rango de precio.',
        sourceAttribution: 'FreeWholesaling.com (Making Offers & Negotiation)',
        completed: false,
      }
    ],
    resources: [
      {
        id: 'res-zillow-sold',
        name: 'Zillow Sold Comps Filter',
        url: 'https://www.zillow.com/',
        category: 'comps_data',
        isFree: true,
        howToUse: 'Activa el filtro "Recently Sold" -> últimos 90 días y usa la herramienta "Draw" para no cruzar avenidas principales.',
        discoveredVia: 'seed',
      },
      {
        id: 'res-redfin',
        name: 'Redfin Sold Data (Fotos Históricas MLS)',
        url: 'https://www.redfin.com/',
        category: 'comps_data',
        isFree: true,
        howToUse: 'Úsalo cuando Zillow oculta las fotos interiores de una casa vendida; Redfin suele conservar la galería completa del MLS.',
        discoveredVia: 'seed',
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'tpl-reverse-anchor',
        title: 'Guion de Negociación: Reverse Price Anchor ("Good Cop / Bad Cop")',
        type: 'negotiation_anchor',
        whenToUse: 'Al presentar la oferta por teléfono después de analizar el ARV y reparaciones.',
        content: `"[Nombre del Vendedor], estuve revisando los números con mi socio (él es el encargado financiero y es súper estricto con el presupuesto de remodelación). 

Tomando en cuenta que hay que hacerle el techo, actualizar cocina y baños y cubrir todos los gastos de cierre de nuestro bolsillo... él me pidió que estuviéramos alrededor de $[Oferta Ancla Baja - 12% menor al MAO]. 

Honestamente, a mí me pareció un poco bajo y quiero ayudarte a que esto funcione... Si yo peleo con mi socio para subir un poco más, ¿cuál es el número más cercano a eso con el que tú podrías firmar hoy mismo?"`,
      }
    ],
    sources: [
      {
        id: 'src-fw-mao',
        title: 'FreeWholesaling.com - Comping, ARV, Repairs & Reverse Price Anchor',
        url: 'https://www.freewholesaling.com/',
        sourceType: 'seed_course',
        creator: 'Flip With Rick',
        addedAt: '2026-09-29',
        rawTranscript: 'Fórmulas de ARV, estimador de reparaciones por pie cuadrado y psicología de ofertas.',
        screenOcrFindings: ['MAO = (ARV * 0.75) - Repairs - Assignment Fee', 'Zillow Sold < 90 Days'],
        deepResearchNotes: ['Verificado: Redfin conserva fotos MLS de ventas cerradas mejor que Zillow en estados Non-Disclosure.'],
        extractedStepsCount: 3,
        versionCreated: '1.3',
      }
    ],
    changelog: [
      {
        version: '1.3',
        date: '2026-09-29',
        summaryOfNewKnowledge: 'Calculadora dinámica de MAO por tramos de ARV, tabla de reparaciones por SqFt y guion Reverse Price Anchor.',
        sourceTitle: 'FreeWholesaling.com Core Curriculum',
        sourceType: 'seed_course',
      }
    ]
  },
  {
    id: 'skill-contracts-dispo',
    slug: 'wholesale-contracts-title-cash-buyers',
    title: 'Contratos (PSA + Assignment), Compañías de Título y Búsqueda de Cash Buyers',
    category: 'Contracts & Dispo',
    version: '1.1',
    lastUpdated: '2026-09-29',
    masteryScore: 76,
    summary:
      'Cómo poner una propiedad bajo contrato con un Purchase & Sale Agreement (PSA) simple de 1-2 páginas con cláusula de inspección y asignabilidad, abrir título con una Investor-Friendly Title Company y encontrar Cash Buyers reales para cobrar tu Assignment Fee.',
    whyItWorks:
      'Un contrato simple y transparente sin jerga intimidante aumenta la tasa de firma del vendedor, mientras que las cláusulas de "Inspection Period" y "and/or assigns" protegen el 100% de tu riesgo.',
    executorType: 'contract_generator',
    steps: [
      {
        id: 'con-step-1',
        order: 1,
        title: 'Firmar el Purchase & Sale Agreement (PSA) con el Vendedor',
        actionDescription:
          'Envía el contrato de compraventa de 1-2 páginas por firma electrónica (DocuSign / PandaDoc / SignNow) mientras sigues en la llamada con el vendedor.',
        exactCommandsOrClicks: [
          'En el campo Buyer incluye tu nombre o LLC seguido de las palabras "and/or assigns" (o verifica que la cláusula de asignabilidad esté activa).',
          'Establece un Inspection Period (Período de Debida Diligencia) de 10 a 14 días hábiles.',
          'Define un Earnest Money Deposit (EMD) bajo para el vendedor ($100) pagadero a la compañía de título tras aceptar el contrato.',
          'No cuelgues la llamada antes de que el vendedor abra el correo y firme el documento.'
        ],
        proTip:
          'Revisa el contrato línea por línea con el vendedor por teléfono en 3 minutos; la incertidumbre mata los tratos cuando los dejas "pensarlo el fin de semana".',
        sourceAttribution: 'FreeWholesaling.com (Contracts & Closing)',
        completed: false,
      },
      {
        id: 'con-step-2',
        order: 2,
        title: 'Enviar Contrato a una Investor-Friendly Title Company (Abrir Escrow)',
        actionDescription:
          'Envía el PSA firmado a una compañía de título o abogado de cierre que entienda y procese transacciones de Wholesale (Assignment of Contract y Double Closing).',
        exactCommandsOrClicks: [
          'Pregunta antes a la compañía de título: "¿Trabajan con inversionistas y hacen cierres con Assignment of Contract?"',
          'Envíales el PSA firmado para que inicien el "Title Search" (búsqueda de gravámenes/liens e impuestos pendientes) y el "Municipal Lien Search".',
          'Coordina la toma de 25-35 fotos claras del interior y exterior de la propiedad (sin que aparezcan personas) para tu paquete de marketing a compradores.'
        ],
        proTip:
          'El Title Search revelará si hay hipotecas ocultas, embargos de código (Code Liens) o herederos adicionales que deban firmar antes del día del cierre.',
        sourceAttribution: 'FreeWholesaling.com (Title Companies)',
        completed: false,
      },
      {
        id: 'con-step-3',
        order: 3,
        title: 'Encontrar Cash Buyers Reales y Firmar el Assignment of Contract',
        actionDescription:
          'Localiza inversionistas que ya compraron en efectivo en ese mismo código postal en los últimos 6 meses y véndeles los derechos de tu contrato.',
        exactCommandsOrClicks: [
          'Método 1 (Zillow For Rent): Llama a los dueños de casas listadas "For Rent" por propietario en el mismo código postal.',
          'Método 2 (Flippers en Zillow Sold): Busca casas recién remodeladas y vendidas cerca -> entra al Property Appraiser -> mira qué LLC la compró hace 4-6 meses antes de remodelarla.',
          'Pide al comprador interesado un Earnest Money Deposit (EMD) NO reembolsable de $2,500 a $5,000 depositado en la compañía de título al firmar el Assignment of Contract.'
        ],
        proTip:
          'Un Cash Buyer nunca es "comprador confirmado" hasta que su EMD de $2,500+ está depositado en la cuenta de Escrow de la compañía de título.',
        sourceAttribution: 'FreeWholesaling.com (Dispositions & Cash Buyers)',
        completed: false,
      }
    ],
    resources: [
      {
        id: 'res-signnow',
        name: 'SignNow / DocuSign (Firma Electrónica de Contratos)',
        url: 'https://www.signnow.com/',
        category: 'contract_template',
        isFree: false,
        howToUse: 'Sube el PDF generado en este dashboard y envíalo por SMS/Email al vendedor durante la llamada.',
        discoveredVia: 'seed',
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'tpl-psa-clause',
        title: 'Cláusulas Esenciales de Protección (Inspection & Assignment Clause)',
        type: 'contract_clause',
        whenToUse: 'Incluir siempre en el Purchase & Sale Agreement (PSA).',
        content: `1. ASSIGNMENT CLAUSE: Buyer may assign this Agreement to another party or entity (Assignee) without further consent from Seller. Upon assignment, Assignee shall assume all Buyer rights and obligations under this Agreement.

2. INSPECTION & DUE DILIGENCE PERIOD: Buyer shall have [14] business days from the Effective Date ("Inspection Period") to inspect the Property and perform all due diligence. If Buyer, in Buyer's sole and absolute discretion, determines the Property is unsatisfactory for any reason, Buyer may cancel this Agreement by written notice prior to the expiration of the Inspection Period and receive a full refund of any Earnest Money Deposit.

3. ACCESS FOR INSPECTIONS: Seller agrees to provide Buyer and Buyer's partners, contractors, or inspectors reasonable access to the Property during the Inspection Period.`,
      }
    ],
    sources: [
      {
        id: 'src-fw-dispo',
        title: 'FreeWholesaling.com - Contracts, Title & Dispositions',
        url: 'https://www.freewholesaling.com/',
        sourceType: 'seed_course',
        creator: 'Flip With Rick',
        addedAt: '2026-09-29',
        rawTranscript: 'Uso de contratos PSA y Assignment, apertura de título y búsqueda de Cash Buyers activos.',
        screenOcrFindings: ['Purchase and Sale Agreement', 'Assignment of Real Estate Contract', 'EMD $2,500 Non-Refundable'],
        deepResearchNotes: ['En mercados con restricciones a asignaciones, usar Double Closing con Transactional Funding.'],
        extractedStepsCount: 3,
        versionCreated: '1.1',
      }
    ],
    changelog: [
      {
        version: '1.1',
        date: '2026-09-29',
        summaryOfNewKnowledge: 'Módulo completo de contratos PSA, Assignment, apertura de Escrow y extracción de Cash Buyers.',
        sourceTitle: 'FreeWholesaling.com Core Curriculum',
        sourceType: 'seed_course',
      }
    ]
  },
  {
    id: 'skill-d4d-zillow-fsbo',
    slug: 'wholesale-driving-for-dollars-zillow-fsbo',
    title: 'Driving for Dollars (Físico y Virtual) & Zillow FSBO Ocultos',
    category: 'Lead Gen & D4D',
    version: '1.0',
    lastUpdated: '2026-09-29',
    masteryScore: 70,
    summary:
      'Cómo encontrar propiedades abandonadas que no aparecen en ninguna lista pública recorriendo vecindarios (o usando Google Street View) y filtrando anuncios antiguos de For Sale By Owner (FSBO) en Zillow.',
    whyItWorks:
      'Las propiedades con lonas azules en el techo, ventanas tapiadas o buzones desbordados que apuntas manualmente son listas 100% exclusivas que ningún otro inversionista puede descargar con un clic.',
    executorType: 'ai_playbook_runner',
    steps: [
      {
        id: 'd4d-step-1',
        order: 1,
        title: 'Identificar Señales Visuales de Abandono (Físico o Google Maps Virtual D4D)',
        actionDescription:
          'Recorre vecindarios clase B/C con precio medio inferior a la media de tu ciudad buscando señales claras de descuido físico.',
        exactCommandsOrClicks: [
          'Busca: lonas en el techo (Blue Tarps), pasto de más de 30 cm, pintura descascarada, ventanas con madera (Boarded Up), avisos pegados en la puerta o aires acondicionados de ventana oxidados.',
          'Si haces Virtual Driving for Dollars: usa Google Street View verificando en la esquina inferior que la captura de imagen sea reciente (2024-2026).',
          'Anota la dirección exacta y pásala por el módulo de Skip Tracing Gratis.'
        ],
        proTip:
          'Habla con los vecinos inmediatos o el cartero: "Hola, estoy tratando de ubicar al dueño de la casa de al lado para comprarla y arreglarla, ¿sabes qué pasó con ellos o tienes su número?".',
        sourceAttribution: 'FreeWholesaling.com (Driving For Dollars)',
        completed: false,
      },
      {
        id: 'd4d-step-2',
        order: 2,
        title: 'Filtrar Zillow FSBO +90 Días en el Mercado y Palabras Clave de Motivación',
        actionDescription:
          'Extrae vendedores directos (For Sale By Owner) o listados caducados cuyas propiedades llevan más de 90 días sin venderse.',
        exactCommandsOrClicks: [
          'En Zillow -> "For Sale" -> desactiva "Agent Listings" y deja solo "By Owner & Other".',
          'En "Days on Zillow" selecciona: 90+ days (los dueños ya perdieron la ilusión inicial de vender caro).',
          'Opcional en Agent Listings: usa el filtro "Keywords" con palabras: TLC, Handyman, Investor Special, Cash Only, As-Is, Needs Work, Probate, Motivated.'
        ],
        proTip:
          'En Zillow FSBO de más de 90 días, llama todos los jueves o viernes por la tarde cuando el dueño lleva otra semana más sin ofertas.',
        sourceAttribution: 'FreeWholesaling.com (Zillow FSBO Strategy)',
        completed: false,
      }
    ],
    resources: [
      {
        id: 'res-gmaps',
        name: 'Google Maps Street View (Virtual Driving for Dollars)',
        url: 'https://www.google.com/maps',
        category: 'comps_data',
        isFree: true,
        howToUse: 'Arrastra el ícono de Street View sobre subdivisiones construidas entre 1955 y 1995; verifica la fecha de captura.',
        discoveredVia: 'seed',
      }
    ],
    scriptsAndTemplates: [],
    sources: [
      {
        id: 'src-fw-d4d',
        title: 'FreeWholesaling.com - Driving for Dollars & Zillow FSBO',
        url: 'https://www.freewholesaling.com/',
        sourceType: 'seed_course',
        creator: 'Flip With Rick',
        addedAt: '2026-09-29',
        rawTranscript: 'Técnicas de prospección visual en campo, Virtual D4D y filtros de días en el mercado en Zillow.',
        screenOcrFindings: ['Zillow -> By Owner (FSBO) -> 90+ Days on Zillow'],
        deepResearchNotes: [],
        extractedStepsCount: 2,
        versionCreated: '1.0',
      }
    ],
    changelog: [
      {
        version: '1.0',
        date: '2026-09-29',
        summaryOfNewKnowledge: 'Módulo base de Driving for Dollars y Zillow FSBO cargado.',
        sourceTitle: 'FreeWholesaling.com Core Curriculum',
        sourceType: 'seed_course',
      }
    ]
  },
  {
    id: 'skill-market-foundations',
    slug: 'wholesale-market-selection-foundations',
    title: 'Selección de Mercado Rentable & Configuración de Negocio Wholesale',
    category: 'Market & Foundations',
    version: '1.0',
    lastUpdated: '2026-09-29',
    masteryScore: 72,
    summary:
      'Reglas numéricas de FreeWholesaling.com para elegir un mercado ideal (ya sea local o Virtual Wholesaling desde cualquier lugar) y configurar tu operación con costo cero.',
    whyItWorks:
      'Elegir un mercado con suficiente población, liquidez de compradores en efectivo y un precio medio accesible evita estancarse en ciudades ultra caras o pueblos rurales sin flippers.',
    executorType: 'ai_playbook_runner',
    steps: [
      {
        id: 'mkt-step-1',
        order: 1,
        title: 'Evaluar los 3 Criterios de un Mercado Ganador de Wholesaling',
        actionDescription:
          'Verifica que el condado o ciudad cumpla los parámetros de demanda y precio antes de extraer listas.',
        exactCommandsOrClicks: [
          'Criterio 1 (Población): Mínimo 100,000 habitantes en el condado o área metropolitana (ideal 150,000 - 800,000).',
          'Criterio 2 (Precio Medio de Vivienda): Entre $120,000 y $400,000 (mercados donde abundan los flippers y compradores de renta BRRRR).',
          'Criterio 3 (Días en el Mercado / Liquidez): Verifica en Redfin Data Center o Zillow que el "Median Days on Market" sea menor a 45-60 días y que haya más de 50 ventas en efectivo (Cash Sales) al mes.'
        ],
        proTip:
          'Si tu ciudad tiene precios medios de $750k+ (ej. Los Ángeles o Miami Brickell), busca un "Secondary Market" a 1-2 horas de distancia o haz Virtual Wholesaling en mercados del Midwest/Southeast (Ohio, Indiana, Florida Central, Texas, Georgia, North Carolina).',
        sourceAttribution: 'FreeWholesaling.com (Picking Your Market)',
        completed: false,
      }
    ],
    resources: [
      {
        id: 'res-redfin-data',
        name: 'Redfin Weekly Housing Market Data Center',
        url: 'https://www.redfin.com/news/data-center/',
        category: 'comps_data',
        isFree: true,
        howToUse: 'Revisa el precio medio de venta y los días promedio en el mercado por condado o área metropolitana.',
        discoveredVia: 'seed',
      }
    ],
    scriptsAndTemplates: [],
    sources: [
      {
        id: 'src-fw-mkt',
        title: 'FreeWholesaling.com - Market Selection & Virtual Wholesaling',
        url: 'https://www.freewholesaling.com/',
        sourceType: 'seed_course',
        creator: 'Flip With Rick',
        addedAt: '2026-09-29',
        rawTranscript: 'Criterios de selección de mercados locales y virtuales para wholesaling.',
        screenOcrFindings: ['Population > 100,000', 'Median Home Price < $400,000'],
        deepResearchNotes: [],
        extractedStepsCount: 1,
        versionCreated: '1.0',
      }
    ],
    changelog: [
      {
        version: '1.0',
        date: '2026-09-29',
        summaryOfNewKnowledge: 'Módulo base de Selección de Mercado y Virtual Wholesaling.',
        sourceTitle: 'FreeWholesaling.com Core Curriculum',
        sourceType: 'seed_course',
      }
    ]
  }
];

export const INITIAL_DATABASE: SkillDatabase = {
  skills: INITIAL_WHOLESALE_SKILLS,
  ingestionHistory: [
    {
      id: 'hist-seed-1',
      timestamp: '2026-09-29T13:00:00Z',
      inputUrlOrFile: 'https://www.freewholesaling.com/ (Base Maestra Flip With Rick)',
      sourceType: 'seed_course',
      targetSkillSlug: 'wholesale-government-lists',
      targetSkillTitle: 'Listas de Gobierno (Code Violations, Tax Delinquent, Probate & Water Shut-Off)',
      oldVersion: '1.0',
      newVersion: '1.2',
      summary: 'Pre-cargados los 5 pilares de Wholesale Real Estate de FreeWholesaling.com con portales gubernamentales, calculadoras MAO/ARV y plantillas FOIA.',
      screenOcrDetected: [
        'publicrecords.netronline.com',
        'truepeoplesearch.com',
        'cyberbackgroundchecks.com',
        'MAO = (ARV * 0.75) - Repairs - Assignment Fee'
      ],
      webResearchAdded: [
        'Directorio nacional de portales de condados NETR Online',
        'Acceso directo a portales municipales Accela Citizen Access para Code Violations'
      ]
    }
  ],
  settings: {
    autoExportToAntigravity: true,
    exportGlobalSkills: false,
    preferredModel: 'google/gemini-2.5-flash',
  },
};
