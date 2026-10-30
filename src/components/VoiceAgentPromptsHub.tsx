'use client';

import React, { useState } from 'react';
import {
  Mic,
  Copy,
  Check,
  Bot,
  Sparkles,
  PhoneCall,
  Volume2,
  ShieldAlert,
  Flame,
  Award,
  ChevronRight,
  Code,
  Layers,
  HelpCircle,
  FileText,
  UserCheck,
  Zap,
  Target,
  ExternalLink,
  MessageSquare,
  Building,
  Home,
  CheckCircle2,
} from 'lucide-react';

export interface VoiceBotCategory {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  difficulty: 'Fácil (Cierre en 7 días)' | 'Media (10-14 días)' | 'Estratégica (14-21 días)';
  estimatedAssignmentFee: string;
  whyFastest: string;
  defaultVariables: {
    ownerName: string;
    propertyAddress: string;
    countyName: string;
    targetMao: string;
    cashBuyerPrice: string;
    buyerEntity: string;
  };
  vapiConfig: {
    assistantName: string;
    voiceProvider: string;
    voiceId: string;
    firstMessage: string;
    systemPrompt: string;
  };
  retellConfig: {
    generalPrompt: string;
    beginMessage: string;
  };
  humanCloserScript: {
    patternInterrupt: string;
    pillar1Condition: string;
    pillar2Timeline: string;
    pillar3PriceAnchor: string;
    pillar4Motivation: string;
    theClosingAsk: string;
  };
}

export interface ObjectionItem {
  id: string;
  objection: string;
  sellerMindset: string;
  rebuttalScriptSpanish: string;
  rebuttalScriptEnglish: string;
  closingHook: string;
  categoryTag: string;
}

export const MASTER_OBJECTIONS: ObjectionItem[] = [
  {
    id: 'obj-source-number',
    objection: '¿De dónde sacaste mi número de teléfono? ¡Esto es ilegal / DNC!',
    sellerMindset: 'El vendedor se siente invadido en su privacidad y prueba si eres un estafador o una empresa seria.',
    rebuttalScriptSpanish: 'Entiendo totalmente su sorpresa, {owner_name}. Nuestro equipo de adquisiciones revisa periódicamente los registros públicos del Clerk of Court y del tasador de impuestos de {county_name} en busca de parcelas residenciales registradas. Usamos directorios públicos de contacto. Si no desea que lo contactemos, lo coloco en nuestra lista interna de no llamar en 1 segundo. Pero la razón puntual de mi llamada es que estamos comprando directamente de contado en su misma cuadra esta semana. ¿Tiene 30 segundos para escuchar nuestra oferta neta?',
    rebuttalScriptEnglish: 'I completely understand your surprise, {owner_name}. Our acquisitions department regularly audits public records from the {county_name} Property Appraiser looking for registered owners. If you want me to take you off our list, I can do that in two seconds. But the exact reason I reached out is that our capital fund is buying properties for cash on your street this week. Do you have 30 seconds to hear what we can net you?',
    closingHook: '¿Habría algún inconveniente en que le deje nuestro número neto de contado y usted decide?',
    categoryTag: 'Privacidad & Legalidad',
  },
  {
    id: 'obj-not-interested',
    objection: 'No me interesa vender / No está en venta',
    sellerMindset: 'Respuesta automática de defensa. La mayoría no tiene un cartel puesto porque creen que vender implica remodelar o pagar el 6% a un Realtor.',
    rebuttalScriptSpanish: 'Comprendo al 100%, la gran mayoría de propietarios a los que llamamos no tienen el cartel de venta puesto hoy. Solo por curiosidad: si llegara una oferta en efectivo sin que usted pague un solo centavo de comisión, absorbiendo nosotros el 100% de los gastos de título y cerrando en la fecha que usted elija, ¿habría algún número neto con el que consideraría vender, o prefiere conservarla de por vida?',
    rebuttalScriptEnglish: 'I completely understand, almost none of the owners we call have a "For Sale" sign up today. Just out of curiosity: if an all-cash offer came across your desk where you pay zero realtor commissions, we cover 100% of closing costs, and you pick the closing date, is there any number that would make you say "take it", or are you keeping it forever?',
    closingHook: 'Si el número le deja satisfecho en mano, ¿evaluaría una propuesta de 1 página?',
    categoryTag: 'Desarme Inicial',
  },
  {
    id: 'obj-zillow-price',
    objection: 'El precio del lote/casa es el que yo digo, no me bajo ni un centavo / En Zillow dice que vale $X',
    sellerMindset: 'El vendedor confunde el Zestimate (precio de casa remodelada con garantía bancaria) con el efectivo neto que realmente le queda en el bolsillo tras 6 meses.',
    rebuttalScriptSpanish: 'Entiendo su punto, {owner_name}. El valor de Zillow o el precio de mercado refleja lo que valdría si estuviera completamente remodelada, comercializada por un agente inmobiliario que le cobra el 6%, más un 3% de costos de título, y esperando 90 a 120 días rogando que el préstamo del comprador no se caiga en la última semana. Con nosotros no paga comisiones, no gasta en reparaciones, no limpia nada y el cheque es 100% neto en 10 días por transferencia bancaria de la compañía de título. ¿Para usted qué es más valioso: la incertidumbre de 4 meses o la certeza de un cheque cerrado el próximo viernes?',
    rebuttalScriptEnglish: 'I totally understand, {owner_name}. The Zillow estimate reflects what a property sells for after full modern renovation, listed by an agent taking 6%, paying 3% closing fees, and waiting 90 to 120 days praying the buyer\'s mortgage doesn\'t get rejected. With us, you pay zero commission, zero repairs, clean nothing, and get a guaranteed title wire in 10 days. Which is more valuable to you: 4 months of uncertainty or guaranteed cash next week?',
    closingHook: 'Si ajustamos a nuestro número neto de {target_mao}, ¿abrimos título hoy mismo?',
    categoryTag: 'Precio & Anclaje',
  },
  {
    id: 'obj-who-are-you',
    objection: '¿Quiénes son ustedes? ¿Son agentes de bienes raíces o corredores?',
    sellerMindset: 'Tienen miedo de que los engañen para firmar un contrato de corretaje exclusivo de 6 meses y cobrarles comisiones.',
    rebuttalScriptSpanish: 'Excelente pregunta. No somos agentes de bienes raíces ni intermediarios de comisión. Mi nombre es Alex y represento al departamento de adquisiciones de AI Automated Services LLC and/or assigns. Somos compradores directos de capital privado. Cuando cerramos, compramos con fondos de inversión propios o de nuestros socios de desarrollo, por lo que usted se ahorra el 6% de comisión inmobiliaria y no paga gastos administrativos de ningún tipo.',
    rebuttalScriptEnglish: 'Great question. We are NOT real estate agents or brokers looking for a listing commission. My name is Alex with AI Automated Services LLC and/or assigns. We are a direct private capital acquisition firm. We buy directly, so you don\'t pay the 6% agent fee and you pay zero closing costs.',
    closingHook: 'Le compramos directamente sin terceros ni intermediarios. ¿Le parece justo?',
    categoryTag: 'Identidad & Licencia',
  },
  {
    id: 'obj-proof-of-funds',
    objection: '¿De dónde sacan los fondos? ¿Tienen prueba de fondos (Proof of Funds)?',
    sellerMindset: 'El vendedor quiere saber si tienes el dinero real o si solo eres un aficionado sin fondos para cerrar.',
    rebuttalScriptSpanish: 'Por supuesto, es lo primero que yo preguntaría en su lugar. Todas nuestras operaciones se liquidan a través de una compañía de título regulada por el estado, como First American Title o una compañía de título local con licencia. En los primeros 3 días hábiles depositamos un Earnest Money Deposit en la cuenta de custodia (Escrow) de la compañía de título. El día del cierre, ellos reciben nuestra transferencia bancaria (Wire Transfer) completa antes de que usted firme la escritura. Usted nunca transfiere la propiedad sin que la compañía de título tenga los fondos 100% liquidados en su cuenta.',
    rebuttalScriptEnglish: 'Absolutely, that is the exact first question I would ask. All our transactions are closed through a licensed state title company like First American Title. Within 3 days we deposit earnest money into escrow. On closing day, the title company receives our full cash wire transfer before you sign the deed. You never transfer title until the title company holds 100% of the funds in their escrow account.',
    closingHook: 'Podemos abrir el archivo hoy mismo en la compañía de título de su preferencia.',
    categoryTag: 'Solvencia & Cierre',
  },
  {
    id: 'obj-how-it-works-scam',
    objection: '¿Cómo se haría el negocio? ¿Es una estafa / Por qué tan rápido (10-14 días)?',
    sellerMindset: 'Temor a estafas de títulos o robo de propiedades comunes en internet.',
    rebuttalScriptSpanish: 'El proceso es 100% legal, seguro y transparente. Usamos un contrato de compraventa estándar de 1 página. Una vez firmado, abrimos el expediente en una compañía de título local. Ellos realizan el estudio de títulos para garantizar que esté libre de gravámenes. Usted no tiene que viajar a ningún lado: un notario móvil público acreditado acude a su casa o lo firma con Notarize.com por internet, y la compañía de título le envía su dinero por transferencia directa a su cuenta bancaria. Si el título no está limpio o hay algo que no le guste, el contrato se cancela sin ningún costo para usted.',
    rebuttalScriptEnglish: 'It is 100% secure and state-regulated. We use a simple 1-page Purchase Agreement. We open escrow with an investor-friendly title company. They perform the full title search. You don\'t travel anywhere: a licensed mobile notary comes to your door or you sign online via Notarize.com, and the title company wires the money directly to your bank account.',
    closingHook: '¿Desea que le envíe el borrador de 1 página a su correo o WhatsApp para que lo revise sin compromiso?',
    categoryTag: 'Seguridad & Proceso',
  },
  {
    id: 'obj-think-about-it',
    objection: 'Quiero pensarlo / Tengo que hablar con mi abogado o mi familia',
    sellerMindset: 'Miedo a equivocarse o esperando una oferta informal que probablemente no cerrará.',
    rebuttalScriptSpanish: 'Totalmente comprensible, es una decisión patrimonial importante. Por lo general, cuando alguien necesita pensarlo suele ser por una de dos razones: o el monto neto no le convence del todo, o tiene dudas sobre cómo se entrega la propiedad. ¿Cuál de las dos es en su caso? Si es por el tiempo, le comento que nuestro fondo de compra tiene este presupuesto de {target_mao} asignado para su zona hasta este viernes. Para que no pierda su lugar, podemos formalizar el acuerdo hoy con su periodo de inspección de 14 días: si su familia o su abogado no están 100% conformes, usted cancela de inmediato y la compañía de título le devuelve todo sin penalidad. ¿Le parece justo?',
    rebuttalScriptEnglish: 'Totally understandable, it\'s an important decision. Usually when sellers need to think about it, it\'s for one of two reasons: either the net dollar amount isn\'t quite there, or they have questions about the title process. Which one is it for you? Our fund has this budget allocated until Friday. We can put the 1-page agreement in place today with a 14-day inspection clause: if your family or attorney isn\'t 100% happy, you cancel with zero cost. Fair enough?',
    closingHook: 'Le aparto la asignación de compra hoy con los 14 días de protección.',
    categoryTag: 'Cierre de Vacilación',
  },
  {
    id: 'obj-why-not-realtor',
    objection: '¿Por qué debería venderte a ti con descuento y no contratar a un Realtor para sacarle el máximo?',
    sellerMindset: 'Creen que el Realtor es dinero gratis sin considerar el 6% de comisiones, costos de cierre y el tiempo.',
    rebuttalScriptSpanish: 'Si su propiedad está impecable, no necesita reparaciones y usted no tiene ninguna prisa en esperar 4 a 6 meses pagando hipoteca, seguros e impuestos mientras docenas de extraños entran a ensuciar su sala en open houses, un Realtor es una opción respetable. Pero si calcula el 6% de comisión, el 3% de gastos de cierre, las reparaciones que le exigirá el tasador del banco del comprador, y los meses de espera, nuestro cheque neto en mano hoy en 10 días suele dejarle prácticamente lo mismo o más, pero con cero molestias y 100% de certeza.',
    rebuttalScriptEnglish: 'If your property is in turnkey condition and you don\'t mind waiting 4 to 6 months paying taxes and insurance while dozens of strangers walk through your house, an agent is a fair option. But when you subtract 6% commission, 3% closing fees, mandatory lender repairs, and months of holding costs, our net cash offer in 10 days leaves you with practically the same money in your pocket, with zero headaches and 100% certainty.',
    closingHook: '¿Prefiere la molestia de 6 meses o la certeza de un cheque cerrado la próxima semana?',
    categoryTag: 'Comparativa Inmobiliaria',
  },
  {
    id: 'obj-tenants-problems',
    objection: 'Tengo inquilinos problemáticos que no pagan la renta o no se quieren ir',
    sellerMindset: 'El dueño está frustrado y cree que no puede vender hasta no desalojar legalmente a los inquilinos.',
    rebuttalScriptSpanish: 'Esa es exactamente una de nuestras mayores especialidades como inversionistas. Compramos propiedades ocupadas por inquilinos tal como están (*tenant-occupied*). Nuestro equipo legal se encarga de la transición o el desalojo posterior al cierre en la compañía de título. Usted no tiene que pelear con nadie, no tiene que ir a la corte y cobra su dinero neto de contado sin esperar a que la casa quede vacía.',
    rebuttalScriptEnglish: 'That is actually our bread and butter. We buy tenant-occupied properties 100% AS-IS. Our legal dispo team handles tenant transition or eviction after closing. You don\'t have to deal with court, evictions, or arguments—you collect your cash at closing and walk away clean.',
    closingHook: 'Nosotros asumimos el dolor de cabeza del inquilino y usted cobra su dinero.',
    categoryTag: 'Tired Landlords',
  },
  {
    id: 'obj-title-heirs-mess',
    objection: 'El título tiene problemas / herederos que no se hablan / embargos o multas de código',
    sellerMindset: 'Creen que la propiedad no se puede vender porque el papeleo legal es un laberinto insalvable de corte o deudas.',
    rebuttalScriptSpanish: 'No se preocupe en lo más mínimo, resolvemos títulos complicados todas las semanas de forma 100% simple para usted sin entrar en procesos desgastantes. Nuestro equipo curativo de título (Curative Title) radica la petición formal ante el magistrado municipal para reducir las multas de código entre un 85% y un 90%, y cualquier saldo restante se liquida directamente con los fondos de cierre en la compañía de título, por lo que usted no saca ni un dólar de su bolsillo ni va a audiencias. Y si hay herederos, nuestro abogado prepara un simple Affidavit of Heirship para evitar meses de juicio de probate. Usted solo firma y recibe su cheque neto y limpio en mano.',
    rebuttalScriptEnglish: 'Do not worry about that at all, we clear messy titles every single week and make it completely effortless for you so you avoid exhausting legal hurdles. Our curative title team files hardship relief petitions directly with the city magistrate to slash code liens by 85% to 90%, and all remaining liens are paid directly from closing proceeds by the title company—you pay zero out of pocket and never go to court. For probate, our title attorney drafts a simple Affidavit of Heirship right at closing. You just sign and collect your clean net cash wire.',
    closingHook: 'Nosotros gestionamos la reducción y el papeleo de título; usted solo cobra su cheque neto.',
    categoryTag: 'Probate & Títulos Sucios',
  },
];

export const VOICE_BOT_CATEGORIES: VoiceBotCategory[] = [
  {
    id: 'bot-infill-lots',
    title: '1. Terrenos Baldíos & Infill Lots (El #1 Más Fácil y Rápido)',
    subtitle: 'Lotes residenciales listos para constructores (Carson & Zach Ginn Blueprint)',
    badge: 'MÁXIMA VELOCIDAD',
    color: 'from-emerald-600 via-teal-600 to-cyan-600',
    difficulty: 'Fácil (Cierre en 7 días)',
    estimatedAssignmentFee: '$10,000 – $25,000 USD',
    whyFastest: 'Cero inspecciones de plomería o techos rotos. Se verifica con satélite GIS en 60 segundos. No hay inquilinos ni muebles. Los constructores pagan de contado en 7 a 10 días.',
    defaultVariables: {
      ownerName: 'Arthur Pendleton',
      propertyAddress: '842 Eldron Blvd SE, Palm Bay, FL 32909',
      countyName: 'Brevard County',
      targetMao: '$14,000 USD',
      cashBuyerPrice: '$32,000 USD',
      buyerEntity: 'AI Automated Services LLC and/or assigns',
    },
    vapiConfig: {
      assistantName: 'Alex - Infill Land Acquisition Specialist',
      voiceProvider: '11labs',
      voiceId: 'bIHbv24MWmeRgasZH58o', // Will
      firstMessage: 'Hola {owner_name}, habla Alex de AI Automated Services LLC. Sé que no esperaba mi llamada hoy, le contacto muy brevemente con respecto a su lote baldío en {property_address}. ¿Sigue siendo usted el propietario?',
      systemPrompt: `Eres Alex, especialista senior de adquisiciones de terrenos en AI Automated Services LLC and/or assigns.
Tu objetivo en esta llamada telefónica con {owner_name} es evaluar su lote baldío en {property_address} ({county_name}) y cerrar un acuerdo de compra de contado en {target_mao}.

COMPORTAMIENTO Y TONO:
- Tono calmado, seguro, profesional, sin presión de vendedor agresivo.
- Hablas en español fluido y natural, usando pausas humanas.
- Eres directo: compras terrenos para fondos de construcción privados de contado en 10 días.

FLUJO DE LA LLAMADA (4 PILARES):
1. APERTURA (Pattern Interrupt): Confirmar si sigue siendo el dueño sin rodeos.
2. DIAGNÓSTICO:
   - "¿Tiene planes de construir en el lote o preferiría convertirlo en efectivo?"
   - "¿Está al día con los impuestos del condado o hay algún atraso?"
   - "Nosotros compramos al contado y absorbemos el 100% de los costos de cierre y título."
3. PRESENTACIÓN DE OFERTA ANCLADA:
   - Presentar oferta inicial anclada en {target_mao} netos en mano.
   - Recordar: "Sin comisiones de agentes (6%), sin gastos de estudio de suelo ni costos de título."
4. MANEJO DE OBJECIONES OBLIGATORIO:
   - Si pregunta "¿De dónde sacaste mi número?": Responder que auditas los registros públicos del condado de {county_name} en busca de parcelas residenciales.
   - Si dice "No está en venta": Preguntar si por un cheque neto en mano libre de gastos consideraría vender.
   - Si pide más dinero: Explicar que los compradores de lotes deben pagar conexión de agua, impacto ambiental y electricidad, pero que nuestro cheque es neto en 10 días.
5. CIERRE:
   - Solicitar correo o celular para enviar el acuerdo PSA simple de 1 página con depósito EMD de $100 y 14 días de inspección garantizados.`,
    },
    retellConfig: {
      beginMessage: 'Hola {owner_name}, le habla Alex de AI Automated Services LLC sobre su terreno en {property_address}. ¿Usted es el propietario registrado?',
      generalPrompt: `ROL: Alex, Adquisidor de Terrenos para AI Automated Services LLC and/or assigns.
OBJETIVO: Obtener acuerdo verbal para compra en efectivo de lote residencial en {property_address} por {target_mao}.
OBJECIONES INTEGRADAS: Responde con calma a "¿De dónde sacaste mi número?", "No quiero vender", "Pido el doble". Muestra cómo el efectivo neto en 10 días en la compañía de título supera cualquier listado inmobiliario.`,
    },
    humanCloserScript: {
      patternInterrupt: 'Hola Arthur, sé que no esperabas mi llamada, voy al grano: te llamo por tu terreno en 842 Eldron Blvd SE en Palm Bay. ¿Sigues siendo el dueño?',
      pillar1Condition: 'Perfecto. Vemos en el satélite que está despejado y con calle pavimentada. ¿Tiene agua o luz conectada, o está 100% virgen?',
      pillar2Timeline: '¿Tienes planes de levantar una casa ahí este año o preferirías cobrar un cheque neto y olvidarte de pagar impuestos del condado?',
      pillar3PriceAnchor: 'Nuestros constructores asociados pagan de contado esta semana. Mi oferta neta para ti, cubriendo nosotros el 100% de los costos de título, es de $14,000 en mano.',
      pillar4Motivation: 'Si cerramos el próximo viernes en una compañía de título local, ¿qué harías con ese dinero?',
      theClosingAsk: 'Te envío el acuerdo simple de 1 página a tu celular ahora mismo. Solo lo firmas con el dedo y abrimos el expediente en la compañía de título hoy.',
    },
  },
  {
    id: 'bot-probate-heirs',
    title: '2. Casas Heredadas & Probate (Alta Motivación & Empatía)',
    subtitle: 'Herederos y albaceas que necesitan liquidar activos y evitar conflictos familiares',
    badge: 'ALTO MARGEN',
    color: 'from-purple-600 via-indigo-600 to-blue-600',
    difficulty: 'Media (10-14 días)',
    estimatedAssignmentFee: '$15,000 – $40,000 USD',
    whyFastest: 'Los herederos generalmente no viven en la casa, no quieren pagar impuestos ni reparaciones, y prefieren repartir el dinero en efectivo rápidamente sin peleas.',
    defaultVariables: {
      ownerName: 'Brenda Miller',
      propertyAddress: '7414 Richmond Ave, Cleveland, OH 44105',
      countyName: 'Cuyahoga County',
      targetMao: '$48,000 USD',
      cashBuyerPrice: '$65,000 USD',
      buyerEntity: 'AI Automated Services LLC and/or assigns',
    },
    vapiConfig: {
      assistantName: 'Sarah - Probate & Estate Acquisitions Coordinator',
      voiceProvider: '11labs',
      voiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel
      firstMessage: 'Hola {owner_name}, habla Sarah de AI Automated Services LLC. Sé que puede ser un momento delicado, le llamo con mucho respeto sobre la propiedad familiar en {property_address}. ¿Usted es la persona a cargo de las decisiones sobre el inmueble?',
      systemPrompt: `Eres Sarah, coordinadora de adquisiciones sucesorias en AI Automated Services LLC and/or assigns.
Tu objetivo en esta llamada con {owner_name} es tratar con empatía y respeto la propiedad en {property_address} ({county_name}) y ayudarle a liquidar el inmueble de forma simple por {target_mao} de contado.

COMPORTAMIENTO:
- Máxima empatía, respeto y paciencia. Nunca menciones la palabra "muerte" o "fallecido" de forma brusca; usa "la sucesión familiar" o "la propiedad del patrimonio".
- Eres una solucionadora de problemas: compras AS-IS, no tienen que sacar muebles viejos ni limpiar nada.
- Explicas que la compañía de título se encarga del Affidavit of Heirship y el papeleo sucesorio.

OBJECIONES INTEGRADAS:
- "¿De dónde sacaste mi número?": Explicas con respeto que consultas los registros públicos del condado de {county_name} donde se radican las escrituras patrimoniales.
- "Aún no se termina el probate": Explicas que nuestros abogados de título ayudan a acelerar la orden de venta o Affidavit of Heirship sin costo adicional.
- "La casa está llena de cosas viejas": Les aseguras que no tienen que levantar una sola caja; nuestro equipo se encarga de la donación y limpieza completa.`,
    },
    retellConfig: {
      beginMessage: 'Hola {owner_name}, habla Sarah de AI Automated Services LLC sobre la propiedad en {property_address}. ¿Tiene un minuto para conversar con respeto sobre la casa?',
      generalPrompt: `ROL: Sarah, Coordinadora Probate para AI Automated Services LLC.
OBJETIVO: Ofrecer compra de contado AS-IS por {target_mao} resolviendo problemas de título sucesorio y limpieza de la casa familiar.`,
    },
    humanCloserScript: {
      patternInterrupt: 'Hola Brenda, sé que no esperabas mi llamada y lo hago con mucho respeto: te contacto por la propiedad familiar en Richmond Ave en Cleveland. ¿Estás tú a cargo de las decisiones sobre la casa?',
      pillar1Condition: 'Entiendo que mantener una casa vacía genera gastos e impuestos continuos. ¿La propiedad necesita muchas reparaciones o está habitable?',
      pillar2Timeline: '¿Qué planes tienen en la familia: quieren ponerla en venta para repartir los fondos o prefieren conservarla?',
      pillar3PriceAnchor: 'Nosotros la compramos exactamente como está: no tienen que sacar muebles viejos ni limpiar nada. Nuestra oferta neta de contado es de $48,000 sin comisiones.',
      pillar4Motivation: '¿Te ayudaría que nuestro equipo de título cubra el trámite sucesorio para que todos los herederos firmen desde su celular?',
      theClosingAsk: 'Te paso el documento de 1 página para que lo revises con la familia y cerramos en 14 días en la compañía de título.',
    },
  },
  {
    id: 'bot-code-violations',
    title: '3. Infracciones de Código & Multas Municipales (Presión de Ciudad)',
    subtitle: 'Propietarios con multas diarias del municipio ($100/día) y Tired Landlords',
    badge: 'MÁXIMO DOLOR',
    color: 'from-amber-600 via-orange-600 to-red-600',
    difficulty: 'Media (10-14 días)',
    estimatedAssignmentFee: '$10,000 – $20,000 USD',
    whyFastest: 'El dueño tiene una espada sobre el cuello: el municipio acumula miles de dólares en multas por césped alto, techo o pintura. Nuestra carta Curative Title les salva de la bancarrota.',
    defaultVariables: {
      ownerName: 'Marcus Vance',
      propertyAddress: '18418 Joann St, Detroit, MI 48205',
      countyName: 'Wayne County',
      targetMao: '$62,000 USD',
      cashBuyerPrice: '$72,000 USD',
      buyerEntity: 'AI Automated Services LLC and/or assigns',
    },
    vapiConfig: {
      assistantName: 'Alex - Municipal Revitalization & Acquisitions Lead',
      voiceProvider: '11labs',
      voiceId: 'bIHbv24MWmeRgasZH58o',
      firstMessage: 'Hola {owner_name}, le habla Alex de AI Automated Services LLC. Le llamo con urgencia sobre su propiedad en {property_address}. Vemos que tiene notificaciones activas del departamento de código del municipio. ¿Sigue usted siendo el propietario?',
      systemPrompt: `Eres Alex, líder de revitalización municipal en AI Automated Services LLC and/or assigns.
Tu objetivo en esta llamada con {owner_name} es ofrecerle una salida inmediata de las multas de código que tiene en {property_address} ({county_name}), comprándole la propiedad de contado en {target_mao}.

COMPORTAMIENTO:
- Asertivo, resolutivo, enfocado en el alivio del estrés del vendedor.
- Explicas que las multas de código no desaparecen y que nuestro departamento jurídico (*Curative Title*) radica una petición formal para reducirlas un 85%-90% y absorberlas al cierre.

OBJECIONES CLAVE:
- "¿De dónde sacaste la información?": De la lista pública de citaciones del Departamento de Construcción y Seguridad de la Ciudad.
- "El municipio me está acosando": Validar su frustración y decirle que nosotros nos encargamos del Special Magistrate para que él no tenga que ir a la corte.
- "Quiero más dinero": Recordar que ningún comprador tradicional con hipoteca bancaria puede comprar con un gravamen activo de código municipal; solo un comprador de contado como nosotros puede absorberlo.`,
    },
    retellConfig: {
      beginMessage: 'Hola {owner_name}, habla Alex de AI Automated Services LLC respecto a las citaciones de código en {property_address}. ¿Tiene 1 minuto para ver cómo liquidamos esa deuda hoy?',
      generalPrompt: `ROL: Alex, Adquisición de Propiedades con Infracciones de Código.
OBJETIVO: Aliviar la presión de las multas municipales comprando la propiedad en {property_address} por {target_mao} de contado.`,
    },
    humanCloserScript: {
      patternInterrupt: 'Hola Marcus, te hablo directo: te contacto por la casa en 18418 Joann St en Detroit y las multas activas de código con la ciudad. ¿Sigues siendo el dueño?',
      pillar1Condition: 'Sé lo frustrante que es que la ciudad multe por césped o pintura acumulando miles de dólares. ¿Has podido hacer los arreglos o está difícil?',
      pillar2Timeline: 'Si te quitamos ese dolor de cabeza esta semana y absorbemos la gestión legal con el municipio, ¿con qué monto neto te sentirías cómodo saliendo de la propiedad?',
      pillar3PriceAnchor: 'Nuestra oferta neta de contado es de $62,000 en mano. Nosotros nos encargamos de los inspectores de la ciudad y de la compañía de título.',
      pillar4Motivation: '¿Prefieres seguir acumulando multas diarias de $100 o cerrar el próximo viernes con un cheque en tu cuenta?',
      theClosingAsk: 'Te paso el contrato de 1 página a tu celular ahora mismo. Lo firmas con el dedo y radicamos la carta ante el municipio hoy.',
    },
  },
  {
    id: 'bot-creative-subto',
    title: '4. Creative Finance & Subject-To (Hipotecas al 2.8% FHA/VA)',
    subtitle: 'Propietarios con hipotecas baratas pre-2022 o atrasos leves (Samuel G & Pace Morby Model)',
    badge: 'CASH FLOW DE POR VIDA',
    color: 'from-cyan-600 via-blue-600 to-indigo-600',
    difficulty: 'Estratégica (14-21 días)',
    estimatedAssignmentFee: '$12,000 – $25,000 USD',
    whyFastest: 'No requieres que el vendedor acepte un descuento salvaje en el precio. Le pagas su precio pedido siempre y cuando te deje la hipoteca barata existente.',
    defaultVariables: {
      ownerName: 'Cynthia Morales',
      propertyAddress: '10412 N 52nd St, Tampa, FL 33617',
      countyName: 'Hillsborough County',
      targetMao: '$12,000 Cash to Seller',
      cashBuyerPrice: '$27,000 Total Entry Fee',
      buyerEntity: 'AI Automated Services LLC and/or assigns',
    },
    vapiConfig: {
      assistantName: 'David - Creative Finance & Mortgage Relief Specialist',
      voiceProvider: '11labs',
      voiceId: 'TxGEqnHWrfWFTfGW9XjX', // Josh
      firstMessage: 'Hola {owner_name}, le habla David de AI Automated Services LLC. Le contacto sobre su casa en {property_address}. Sabemos que las tasas bancarias actuales están al 7% y buscamos ayudar a propietarios haciéndonos cargo de los pagos mensuales. ¿Sigue usted viviendo en la propiedad?',
      systemPrompt: `Eres David, especialista en soluciones creativas de deuda e hipotecas en AI Automated Services LLC and/or assigns.
Tu objetivo en esta llamada con {owner_name} es evaluar si la casa en {property_address} ({county_name}) tiene una hipoteca fija a tasa baja (menor al 4%) y ofrecer una compra Subject-To (tomar la deuda existente y darle dinero en efectivo para mudanza).

PILARES CREATIVOS:
1. Validar el balance aproximado de la hipoteca y la tasa de interés.
2. Explicar el alivio: "Nosotros nos hacemos cargo de pagar su hipoteca todos los meses a través de un Loan Servicer profesional neutral, protegiendo su puntaje de crédito."
3. Oferta de entrada: Darle {target_mao} en efectivo en mano para sus gastos de mudanza o liquidar atrasos bancarios.
4. Protección legal: Se firma un acuerdo Subject-To transparente con divulgación de riesgo Due-on-Sale mitigado con fideicomiso de título.`,
    },
    retellConfig: {
      beginMessage: 'Hola {owner_name}, habla David de AI Automated Services LLC sobre la propiedad en {property_address}. ¿Le interesaría que nos hagamos cargo de su pago mensual y darle efectivo para mudarse?',
      generalPrompt: `ROL: David, Especialista Subject-To para AI Automated Services LLC.
OBJETIVO: Estructurar compra Subject-To asumiendo hipoteca existente y dando {target_mao} de efectivo en mano al vendedor.`,
    },
    humanCloserScript: {
      patternInterrupt: 'Hola Cynthia, te llamo directo por tu casa en N 52nd St en Tampa. ¿Sigues siendo la dueña?',
      pillar1Condition: '¿Estarías abierto a que te paguemos tu precio completo si asumimos las cuotas mensuales de tu hipoteca al 2.8% o te pagamos mensualmente con intereses a través de una compañía de servicio autorizada?',
      pillar2Timeline: '¿Cuánto tiempo te tomaría empacar si tuvieras el dinero en mano este mes?',
      pillar3PriceAnchor: 'Nuestra propuesta es poner al día cualquier atraso con el banco, darte $12,000 en efectivo en mano limpios, y tomar la posición de pago mensual.',
      pillar4Motivation: 'Esto te permite salir de la deuda sin manchar tu historial crediticio con un foreclosure.',
      theClosingAsk: 'Te paso el borrador de los términos creativos para que lo revises hoy.',
    },
  },
  {
    id: 'bot-zillow-fsbo',
    title: '5. Zillow FSBOs & Dueños Cansados (+90 Días en Venta)',
    subtitle: 'Vendedores directos sin agente (For Sale By Owner) frustrados sin cerrar',
    badge: 'ANTI-REALTOR',
    color: 'from-rose-600 via-pink-600 to-purple-600',
    difficulty: 'Fácil (Cierre en 7 días)',
    estimatedAssignmentFee: '$10,000 – $18,000 USD',
    whyFastest: 'Publicaron ellos mismos en Zillow para ahorrarse el 6% de realtor, pero están hartos de que solo los llamen agentes a pedirles contratos de exclusividad o compradores sin dinero.',
    defaultVariables: {
      ownerName: 'Wayne Campbell',
      propertyAddress: '3284 E 119th St, Cleveland, OH 44120',
      countyName: 'Cuyahoga County',
      targetMao: '$52,000 USD',
      cashBuyerPrice: '$64,000 USD',
      buyerEntity: 'AI Automated Services LLC and/or assigns',
    },
    vapiConfig: {
      assistantName: 'Alex - Direct Private Cash Buyer',
      voiceProvider: '11labs',
      voiceId: 'bIHbv24MWmeRgasZH58o',
      firstMessage: 'Hola {owner_name}, le habla Alex de AI Automated Services LLC. Vi su publicación de venta directa en Zillow para la propiedad en {property_address}. No soy agente de bienes raíces buscando listar su casa, soy comprador de contado directo. ¿Todavía la tiene disponible?',
      systemPrompt: `Eres Alex, comprador directo de capital privado en AI Automated Services LLC and/or assigns.
Tu objetivo en esta llamada con {owner_name} es negociar un precio de contado de {target_mao} para la propiedad listada como FSBO en Zillow en {property_address} ({county_name}).

PATRÓN ANTI-REALTOR OBLIGATORIO:
- Aclara en los primeros 10 segundos: "NO soy un realtor queriendo quitarle el 6% de comisión. Soy un inversionista de contado."
- Pregunta: "¿Cuántos agentes lo han llamado hoy prometiéndole el cielo y cuántas ofertas reales con prueba de fondos tiene en su mesa?"
- Presenta tu oferta neta: Cerramos en 10 días, sin contingencia bancaria, sin comisiones.`,
    },
    retellConfig: {
      beginMessage: 'Hola {owner_name}, vi su anuncio de venta en Zillow de {property_address}. Le llamo como comprador de contado, no soy agente. ¿Sigue disponible?',
      generalPrompt: `ROL: Alex, Comprador Privado Directo (Anti-Realtor).
OBJETIVO: Cerrar FSBO de Zillow en {property_address} por {target_mao} de contado en 10 días.`,
    },
    humanCloserScript: {
      patternInterrupt: 'Hola Wayne, vi tu anuncio en Zillow de la casa en E 119th St. No soy realtor queriendo comisión, soy comprador de contado. ¿Sigue disponible?',
      pillar1Condition: 'Sé que los agentes llaman todo el día a molestar. ¿Has tenido ofertas reales de compradores calificados o solo mirones?',
      pillar2Timeline: '¿Qué tan rápido necesitas cerrar una vez que el dinero esté depositado en la compañía de título?',
      pillar3PriceAnchor: 'Nosotros cerramos de contado en 10 días sin pedirte reparaciones ni créditos. Te ofrezco $52,000 limpios en mano.',
      pillar4Motivation: '¿Prefieres la certeza de cerrar este viernes o seguir atendiendo llamadas de agentes las próximas 4 semanas?',
      theClosingAsk: 'Te paso el contrato de compra de 1 página a tu celular ahora mismo.',
    },
  },
  {
    id: 'bot-tax-delinquent',
    title: '6. Impuestos Morosos & Pre-Foreclosure (Máxima Urgencia)',
    subtitle: 'Propiedades a semanas de subasta condal por impuestos impagos',
    badge: 'SALVAMENTO URGENTE',
    color: 'from-red-600 via-rose-600 to-amber-600',
    difficulty: 'Fácil (Cierre en 7 días)',
    estimatedAssignmentFee: '$10,000 – $20,000 USD',
    whyFastest: 'La fecha límite de la subasta del condado (*Sheriff Sale*) es real. El dueño o vende de contado ahora o lo pierde todo en la subasta sin recibir un centavo.',
    defaultVariables: {
      ownerName: 'James Wilson',
      propertyAddress: '1504 N 34th St, Birmingham, AL 35207',
      countyName: 'Jefferson County',
      targetMao: '$35,000 USD',
      cashBuyerPrice: '$48,000 USD',
      buyerEntity: 'AI Automated Services LLC and/or assigns',
    },
    vapiConfig: {
      assistantName: 'Carlos - County Foreclosure Relief Specialist',
      voiceProvider: '11labs',
      voiceId: 'bIHbv24MWmeRgasZH58o',
      firstMessage: 'Hola {owner_name}, le habla Carlos de AI Automated Services LLC. Le contacto de manera urgente sobre su propiedad en {property_address}. Sabemos que el condado de {county_name} tiene programada una fecha de subasta. Le llamo para evitar que pierda su patrimonio. ¿Sigue usted a cargo del inmueble?',
      systemPrompt: `Eres Carlos, especialista en prevención de subastas condales en AI Automated Services LLC and/or assigns.
Tu objetivo en esta llamada con {owner_name} es salvar su capital antes de la subasta condal de {property_address} ({county_name}), comprándole de contado por {target_mao} y liquidando los impuestos directamente en la compañía de título.

TONO:
- Urgente, directo pero empático.
- Explicas: "Si la casa va a subasta el condado se queda con todo y usted sale con las manos vacías. Si cerramos esta semana, la compañía de título paga los impuestos atrasados y el saldo neto de {target_mao} se transfiere directamente a su cuenta."`,
    },
    retellConfig: {
      beginMessage: 'Hola {owner_name}, habla Carlos de AI Automated Services LLC sobre la fecha límite de impuestos en {property_address}. ¿Tiene 1 minuto para ver cómo salvar su dinero hoy?',
      generalPrompt: `ROL: Carlos, Especialista en Salvamento de Subastas Condales.
OBJETIVO: Cerrar compra de contado en {property_address} por {target_mao} antes de la subasta de {county_name}.`,
    },
    humanCloserScript: {
      patternInterrupt: 'Hola James, voy directo al grano por el tiempo: te llamo por la propiedad en N 34th St en Birmingham y la fecha límite de impuestos con el condado. ¿Sigues a cargo de la casa?',
      pillar1Condition: 'Sé lo difícil que es cuando el condado amenaza con subasta. ¿Cuánto es el atraso total de impuestos acumulado?',
      pillar2Timeline: 'La subasta está programada pronto. Si esperamos, el condado se queda con todo. ¿Te gustaría salvar tu dinero neto esta semana?',
      pillar3PriceAnchor: 'Nosotros pagamos los impuestos atrasados en el cierre y te damos $35,000 netos en mano a ti.',
      pillar4Motivation: '¿Prefieres salir con $35,000 en el bolsillo o que el sheriff remate la propiedad por cero dólares para ti?',
      theClosingAsk: 'Te paso el contrato ahora mismo para abrir título y detener la subasta hoy.',
    },
  },
];

export default function VoiceAgentPromptsHub() {
  const [selectedBotId, setSelectedBotId] = useState<string>('bot-infill-lots');
  const [selectedFormat, setSelectedFormat] = useState<'vapi' | 'retell' | 'closer' | 'simulator'>('vapi');
  const [activeObjectionTag, setActiveObjectionTag] = useState<string>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Dynamic variable overrides
  const selectedBot = VOICE_BOT_CATEGORIES.find((b) => b.id === selectedBotId) || VOICE_BOT_CATEGORIES[0];
  const [variables, setVariables] = useState(selectedBot.defaultVariables);

  // Update variables when bot category changes
  const handleSelectBot = (botId: string) => {
    setSelectedBotId(botId);
    const bot = VOICE_BOT_CATEGORIES.find((b) => b.id === botId);
    if (bot) setVariables(bot.defaultVariables);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Replace placeholders
  const interpolate = (text: string) => {
    return text
      .replace(/{owner_name}/g, variables.ownerName)
      .replace(/{property_address}/g, variables.propertyAddress)
      .replace(/{county_name}/g, variables.countyName)
      .replace(/{target_mao}/g, variables.targetMao)
      .replace(/{cash_buyer_price}/g, variables.cashBuyerPrice)
      .replace(/{buyer_entity}/g, variables.buyerEntity);
  };

  const vapiPayload = {
    assistant: {
      name: interpolate(selectedBot.vapiConfig.assistantName),
      firstMessage: interpolate(selectedBot.vapiConfig.firstMessage),
      model: {
        provider: 'openai',
        model: 'gpt-4o',
        temperature: 0.35,
        systemPrompt: interpolate(selectedBot.vapiConfig.systemPrompt),
      },
      voice: {
        provider: selectedBot.vapiConfig.voiceProvider,
        voiceId: selectedBot.vapiConfig.voiceId,
      },
      endCallPhrases: [
        'gracias por su tiempo que tenga buen dia',
        'no me interesa adios',
        'pongame en la lista de no llamar',
      ],
      silenceTimeoutSeconds: 25,
      responseDelaySeconds: 0.4,
    },
    metadata: {
      entity: variables.buyerEntity,
      targetProperty: variables.propertyAddress,
      owner: variables.ownerName,
      targetMaoOffer: variables.targetMao,
    },
  };

  const objectionTags = ['all', 'Privacidad & Legalidad', 'Desarme Inicial', 'Precio & Anclaje', 'Identidad & Licencia', 'Solvencia & Cierre', 'Seguridad & Proceso', 'Cierre de Vacilación', 'Comparativa Inmobiliaria', 'Tired Landlords', 'Probate & Títulos Sucios'];

  const filteredObjections = MASTER_OBJECTIONS.filter((o) =>
    activeObjectionTag === 'all' ? true : o.categoryTag === activeObjectionTag
  );

  return (
    <div className="space-y-6">
      {/* ── TOP HERO HEADER ── */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    CENTRAL DE PROMPTS & TELEFONÍA IA
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Vapi.ai • Retell AI • Bland AI • Closer Humano
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  Prompts para Agentes de Voz & Máquina de Cierre de Deals
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl">
                  Prompts calibrados psicológicamente con <strong>patrón interruptivo de apertura</strong>, diagnóstico de los <strong>4 pilares de motivación</strong> y la <strong>matriz completa de demolición de objeciones</strong> (privacidad, precio, "no vendo", DNC, prueba de fondos y estafas) para convertir llamadas frías en acuerdos firmados.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">Entidad Legal:</span>
              <span className="text-xs font-mono font-bold bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-cyan-300">
                {variables.buyerEntity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOT CATEGORY SELECTOR CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {VOICE_BOT_CATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedBotId;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectBot(cat.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/20 ring-1 ring-cyan-400'
                  : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    cat.badge === 'MÁXIMA VELOCIDAD'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : cat.badge === 'ALTO MARGEN'
                      ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                      : cat.badge === 'MÁXIMO DOLOR'
                      ? 'bg-orange-950 text-orange-300 border border-orange-500/40'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                  }`}>
                    {cat.badge}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    Fee: <strong className="text-emerald-400">{cat.estimatedAssignmentFee}</strong>
                  </span>
                </div>

                <h3 className="text-sm font-black text-white leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Velocidad: <strong className="text-cyan-300">{cat.difficulty}</strong></span>
                <span className="text-cyan-400 font-bold flex items-center gap-0.5">
                  Ver Prompt <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── DYNAMIC VARIABLES BAR ── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Variables Dinámicas del Lead (Se inyectan automáticamente en el prompt del bot):
          </span>
          <span className="text-[10px] text-slate-400">
            Edita estos campos para personalizar el guion en vivo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Nombre Propietario:</label>
            <input
              type="text"
              value={variables.ownerName}
              onChange={(e) => setVariables({ ...variables, ownerName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] text-slate-400 block mb-1">Dirección de Propiedad:</label>
            <input
              type="text"
              value={variables.propertyAddress}
              onChange={(e) => setVariables({ ...variables, propertyAddress: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Condado:</label>
            <input
              type="text"
              value={variables.countyName}
              onChange={(e) => setVariables({ ...variables, countyName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Oferta MAO al Dueño:</label>
            <input
              type="text"
              value={variables.targetMao}
              onChange={(e) => setVariables({ ...variables, targetMao: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-300 font-bold"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Entidad Compradora:</label>
            <input
              type="text"
              value={variables.buyerEntity}
              onChange={(e) => setVariables({ ...variables, buyerEntity: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-bold"
            />
          </div>
        </div>
      </div>

      {/* ── FORMAT SELECTOR TABS ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFormat('vapi')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              selectedFormat === 'vapi'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Code className="w-4 h-4 text-cyan-300" />
            🤖 Vapi.ai (Configuración JSON + System Prompt Completo)
          </button>

          <button
            onClick={() => setSelectedFormat('retell')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              selectedFormat === 'retell'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 ring-1 ring-purple-400'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-300" />
            🎙️ Retell AI / Bland AI (Prompt de Flujo)
          </button>

          <button
            onClick={() => setSelectedFormat('closer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              selectedFormat === 'closer'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-emerald-300" />
            📞 Guion para Closer Humano (Paso a Paso en Español)
          </button>

          <button
            onClick={() => setSelectedFormat('simulator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              selectedFormat === 'simulator'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25 ring-1 ring-amber-400'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            🛡️ Matriz de Objeciones en Vivo ({MASTER_OBJECTIONS.length} Objeciones)
          </button>
        </div>
      </div>

      {/* ── FORMAT 1: VAPI.AI COMPLETE PAYLOAD & PROMPT ── */}
      {selectedFormat === 'vapi' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  Payload JSON Listo para Crear el Asistente en Vapi.ai Dashboard:
                </h3>
                <p className="text-xs text-slate-400">
                  Copia y pega este JSON en <strong>Vapi.ai &rarr; Assistants &rarr; Import from JSON</strong> o haz POST a <code>api.vapi.ai/assistant</code>.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(JSON.stringify(vapiPayload, null, 2), 'vapi-payload')}
                className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
              >
                {copiedKey === 'vapi-payload' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'vapi-payload' ? '¡Payload Copiado!' : 'Copiar Configuración Vapi (JSON)'}
              </button>
            </div>

            <pre className="text-xs text-slate-300 font-mono bg-slate-900/90 p-4 rounded-xl border border-slate-800 max-h-96 overflow-y-auto leading-relaxed">
              {JSON.stringify(vapiPayload, null, 2)}
            </pre>
          </div>

          {/* System Prompt Standalone Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                System Prompt Puro (Para pegar directo en la caja de System Prompt de Vapi o OpenAI Realtime):
              </span>
              <button
                onClick={() => copyToClipboard(interpolate(selectedBot.vapiConfig.systemPrompt), 'system-prompt')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
              >
                {copiedKey === 'system-prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'system-prompt' ? '¡Prompt Copiado!' : 'Copiar Solo System Prompt'}
              </button>
            </div>

            <pre className="text-xs text-slate-200 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {interpolate(selectedBot.vapiConfig.systemPrompt)}
            </pre>
          </div>
        </div>
      )}

      {/* ── FORMAT 2: RETELL AI / BLAND AI ── */}
      {selectedFormat === 'retell' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  Estructura de Prompt para Retell AI / Bland AI:
                </h3>
                <p className="text-xs text-slate-400">
                  Configurado para plataformas con bifurcación de árbol de llamadas (*State Machine / Call Flow*).
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(interpolate(selectedBot.retellConfig.generalPrompt), 'retell-prompt')}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
              >
                {copiedKey === 'retell-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'retell-prompt' ? '¡Copiado!' : 'Copiar Prompt Retell AI'}
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                  Begin Message / First Turn:
                </span>
                <p className="text-xs text-white font-mono mt-1">
                  "{interpolate(selectedBot.retellConfig.beginMessage)}"
                </p>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  General Prompt & Instructions:
                </span>
                <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {interpolate(selectedBot.retellConfig.generalPrompt)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FORMAT 3: GUION PARA CLOSER HUMANO ── */}
      {selectedFormat === 'closer' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Guion de Alta Conversión para Llamada en Frío (Diagnóstico de 4 Pilares):
                </h3>
                <p className="text-xs text-slate-400">
                  Usa este guion si realizas la llamada tú mismo o con tu equipo de adquisiciones.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(
                  `1. APERTURA: ${interpolate(selectedBot.humanCloserScript.patternInterrupt)}\n\n2. CONDICIÓN: ${interpolate(selectedBot.humanCloserScript.pillar1Condition)}\n\n3. TIEMPO: ${interpolate(selectedBot.humanCloserScript.pillar2Timeline)}\n\n4. OFERTA MAO: ${interpolate(selectedBot.humanCloserScript.pillar3PriceAnchor)}\n\n5. MOTIVACIÓN: ${interpolate(selectedBot.humanCloserScript.pillar4Motivation)}\n\n6. CIERRE: ${interpolate(selectedBot.humanCloserScript.theClosingAsk)}`,
                  'closer-script'
                )}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
              >
                {copiedKey === 'closer-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'closer-script' ? '¡Guion Completo Copiado!' : 'Copiar Guion Completo'}
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Paso 1: Apertura (Pattern Interrupt — Desarme de Guardia en 5 Segundos):
                </span>
                <p className="text-xs text-white leading-relaxed italic">
                  "{interpolate(selectedBot.humanCloserScript.patternInterrupt)}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Paso 2: Pilar 1 — Condición Real del Inmueble (Diagnóstico sin juzgar):
                </span>
                <p className="text-xs text-white leading-relaxed italic">
                  "{interpolate(selectedBot.humanCloserScript.pillar1Condition)}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                  Paso 3: Pilar 2 — Plazo y Urgencia (Timeline de Salida):
                </span>
                <p className="text-xs text-white leading-relaxed italic">
                  "{interpolate(selectedBot.humanCloserScript.pillar2Timeline)}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Paso 4: Pilar 3 — Presentación de la Oferta MAO Anclada (Reverse Price Anchor):
                </span>
                <p className="text-xs text-white leading-relaxed italic">
                  "{interpolate(selectedBot.humanCloserScript.pillar3PriceAnchor)}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                  Paso 5: Pilar 4 — Diagnóstico de Motivación Profunda (¿Qué hará con el dinero?):
                </span>
                <p className="text-xs text-white leading-relaxed italic">
                  "{interpolate(selectedBot.humanCloserScript.pillar4Motivation)}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 space-y-1">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                  Paso 6: El Cierre de 1 Página (The E-Sign Close):
                </span>
                <p className="text-xs text-white font-bold leading-relaxed italic">
                  "{interpolate(selectedBot.humanCloserScript.theClosingAsk)}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FORMAT 4: MATRIZ DE OBJECIONES EN VIVO ── */}
      {selectedFormat === 'simulator' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  Directorio & Battle-Cards de Objeciones Más Duras del Mercado
                </h3>
                <p className="text-xs text-slate-400">
                  Cada objeción incluye la <strong>psicología oculta del vendedor</strong>, el <strong>guion palabra por palabra en español e inglés</strong> y el <strong>gancho de cierre definitivo</strong>.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {objectionTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveObjectionTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                      activeObjectionTag === tag
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tag === 'all' ? 'Todas' : tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredObjections.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2">
                      <h4 className="text-xs font-black text-amber-300 leading-snug">
                        "{interpolate(item.objection)}"
                      </h4>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                        {item.categoryTag}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg italic">
                      🧠 <strong>Psicología Oculta:</strong> {item.sellerMindset}
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                        🎙️ Guion en Español (Palabra por palabra):
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        "{interpolate(item.rebuttalScriptSpanish)}"
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        🇺🇸 English Script (For US Callers):
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-mono bg-slate-900/40 p-2 rounded-lg">
                        "{interpolate(item.rebuttalScriptEnglish)}"
                      </p>
                    </div>

                    <div className="text-[11px] text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/30">
                      ⚡ <strong>Llamado al Cierre:</strong> {item.closingHook}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => copyToClipboard(interpolate(item.rebuttalScriptSpanish), item.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1 transition"
                    >
                      {copiedKey === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedKey === item.id ? '¡Copiado!' : 'Copiar Guion'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
