/**
 * WHOLESALE MASTER NEGOTIATION & CLOSING ENCYCLOPEDIA
 * The most comprehensive compilation of Real Estate Wholesale negotiation strategies,
 * closing psychology, objection handling, and creative finance execution.
 * 
 * Synthesized from:
 * - Pace Morby (SubTo, Creative Finance, Emotional Rapport, Seller Financing)
 * - Chris Voss (FBI Hostage Negotiation, Never Split the Difference, Tactical Empathy, Calibrated Questions)
 * - Brent Daniels (TTP - Talk To People, 4 Pillars, Tonality, Push-Pull)
 * - Jerry Norton & Jamil Damji (Flipping Mastery & KeyGlee, Reverse Price Anchor, Plan B Inspection Haircut, Dispo)
 * - Zach Ginn & Rick Ginn (FreeWholesaling.com, Infill Land Flipping, Code Enforcement Liens, Government Lists)
 * - Todd Toback (No Limits Real Estate, The Takeaway Close, Digital Phone Tie-Downs)
 */

export interface NegotiationTactic {
  id: string;
  name: string;
  master: string;
  corePrinciple: string;
  psychologicalTrigger: string;
  exactScriptEnglish: string;
  exactScriptSpanish: string;
  bestUsedWhen: string;
  proTip: string;
}

export interface ObjectionDeepDive {
  id: string;
  objection: string;
  hiddenFear: string;
  tacticalEmpathyOpening: string;
  reframeScript: string;
  closingHook: string;
  category: 'Price' | 'Trust' | 'Legal/Process' | 'Competitor' | 'Procrastination';
}

export interface CreativeFinanceStructure {
  strategy: string;
  definition: string;
  whenToUse: string;
  sellerPitch: string;
  buyerPitch: string;
  legalSafeguards: string[];
  financialFormulas: {
    entryFeeFormula: string;
    cashOnCashFormula: string;
    wholesalerFeeSpread: string;
  };
}

export const MASTER_NEGOTIATION_TACTICS: NegotiationTactic[] = [
  {
    id: 'tactic-calibrated-no',
    name: 'Calibrated No-Oriented Questions (FBI Negotiation)',
    master: 'Chris Voss (Never Split the Difference)',
    corePrinciple: 'Human beings have a primal need to say NO to feel safe, protected, and in control. "Yes" makes them feel trapped. "No" opens the door to honest negotiation.',
    psychologicalTrigger: 'Autonomy and Protection Instinct.',
    exactScriptEnglish: 'Have you given up on selling this property? ... Would it be completely unreasonable if we bought it as-is with zero closing costs? ... Is it a ridiculous idea to let us handle the problem tenants so you never have to think about them again?',
    exactScriptSpanish: '¿Ya te diste por vencido con la idea de vender esta propiedad? ... ¿Sería totalmente descabellado si te la compramos en efectivo tal como está absorbiendo nosotros el 100% de los gastos de título? ... ¿Es una pésima idea que nos hagamos cargo de los inquilinos problemáticos para que no tengas que lidiar con ellos nunca más?',
    bestUsedWhen: 'When a seller is guarded, defensive, ghosting your calls, or saying "I need to think about it".',
    proTip: 'Never ask "Do you have a few minutes to talk?" (they say No). Ask: "Did I catch you at a terrible time?" (they say "No, I have 2 minutes, what\'s up?").',
  },
  {
    id: 'tactic-push-pull',
    name: 'The Push-Pull & Takeaway Technique',
    master: 'Brent Daniels (TTP) & Todd Toback',
    corePrinciple: 'People always want what they cannot have. When you push a seller away and validate that maybe they SHOULD NOT sell, their natural reaction is to pull you back and convince you why they MUST sell.',
    psychologicalTrigger: 'Loss Aversion & Scarcity.',
    exactScriptEnglish: 'Look, {owner_name}, honestly... based on what you are telling me, our cash offer might not even be the right fit for you. If you don\'t mind waiting 6 months, hiring contractors to paint and redo the roof, and paying 6% to an agent, you\'d probably get more on the open market. Why not just keep the house and rent it out for another year?',
    exactScriptSpanish: 'Mira, {owner_name}, siendo 100% honesto contigo... según lo que me cuentas, nuestra oferta de contado tal vez ni siquiera sea la mejor opción para ti. Si no te importa esperar 6 meses, contratar albañiles para arreglar el techo y pagar el 6% a un agente, probablemente sacarías más dinero en el mercado abierto. ¿Por qué no mejor te quedas con la casa y la alquilas otro año más?',
    bestUsedWhen: 'When the seller acts indifferent, arrogant, or claims they are in "no rush to sell".',
    proTip: 'Watch how fast they panic and say: "No, no, I CANNOT deal with this house for another year! I don\'t want to hire contractors!" You just made them sell themselves to you.',
  },
  {
    id: 'tactic-ackerman-bargaining',
    name: 'The Ackerman Underwriting Ladder (65% -> 85% -> 95% -> 100% MAO)',
    master: 'Chris Voss & Jerry Norton',
    corePrinciple: 'Never offer your maximum price upfront. Anchor at 65% of MAO, then raise in diminishing increments (85%, 95%, 100%) paired with non-monetary concessions, ending on a precise non-round number.',
    psychologicalTrigger: 'Extreme Exhaustion of Concessions & The Illusion of Final Limit.',
    exactScriptEnglish: 'Step 1: Anchor at $65,000 (65%). Step 2: "My partner approved $85,000 if we close in 14 days." Step 3: "Look, I squeezed them to $95,000, and I will pay for your moving truck." Step 4 Final: "My absolute ceiling from the bank is $98,420 and not a dollar more. We pay title fees and you leave whatever junk you want in the house."',
    exactScriptSpanish: 'Paso 1: Anclas en $65,000 (65%). Paso 2: "Mi socio me autorizó subir a $85,000 si cerramos en 14 días". Paso 3: "Hablé con el comité y logré estirarlo a $95,000, y además nosotros te pagamos el camión de mudanza". Paso 4 Final: "El tope absoluto de mi inversionista es $98,420 exactos. Pagamos todos los gastos de título y puedes dejar todos los muebles viejos o basura en la casa."',
    bestUsedWhen: 'During deep price negotiations on single-family homes with heavy repair needs.',
    proTip: 'Precise non-round numbers like $98,420 sound like the result of serious mathematical calculations, whereas $100,000 sounds like a generic guess.',
  },
  {
    id: 'tactic-bad-cop-underwriting',
    name: 'Good Cop / Bad Cop Underwriting Committee Leverage',
    master: 'Pace Morby & Jamil Damji',
    corePrinciple: 'Position yourself as the seller\'s best friend and advocate ("Good Cop") fighting against your strict, cold underwriting partner or investment committee ("Bad Cop").',
    psychologicalTrigger: 'Alliance & Shared Empathy vs. Common Obstacle.',
    exactScriptEnglish: 'Look {owner_name}, I love you and I love the neighborhood. I personally want to give you what you want. But my numbers guy and our private capital board are being total hardasses on the current interest rates and labor costs. They told me to pull out of the deal. But I told them: "No, {owner_name} has been great to work with." If I go back to them right now and put my neck on the line for $75,000 net in your pocket, can we shake hands today?',
    exactScriptSpanish: 'Mira {owner_name}, a mí me encanta tu propiedad y me caes muy bien. Por mí te daría lo que pides. Pero mis socios de capital y el comité de números son sumamente estrictos con las tasas y los costos de materiales. Me dijeron que cancelara el deal. Pero yo les dije: "No, {owner_name} ha sido un caballero con nosotros". Si voy a pelear con ellos ahora mismo y pongo las manos en el fuego por $75,000 netos limpios para ti, ¿te comprometes a que cerramos el trato hoy?',
    bestUsedWhen: 'To justify why you cannot pay retail without making the seller angry at you.',
    proTip: 'You remain the trusted ally; the "investment committee" takes all the blame for the low cash offer.',
  },
  {
    id: 'tactic-tactical-empathy-labeling',
    name: 'Tactical Empathy & Emotional Labeling',
    master: 'Chris Voss (Never Split the Difference)',
    corePrinciple: 'Label the unvoiced negative emotions before they become barriers. Neutralize hostility by speaking the unspoken feelings of the seller.',
    psychologicalTrigger: 'Amygdala De-escalation & Emotional Validation.',
    exactScriptEnglish: 'It sounds like you have dealt with a lot of shady wholesalers who made big promises and locked up your house without closing. It seems like you are exhausted from dealing with county code letters and contractors who took your money and never finished the job.',
    exactScriptSpanish: 'Parece que has tenido que lidiar con muchos inversionistas informales que te prometieron el cielo y te hicieron perder el tiempo sin cerrar. Da la impresión de que estás completamente agotado de recibir cartas del municipio y de contratistas que cobraron y dejaron el trabajo a medias.',
    bestUsedWhen: 'When the seller is angry, stressed, skeptical, or has had a bad experience with realtors or wholesalers.',
    proTip: 'Never say "I understand" (it triggers defensiveness). Say "It sounds like..." or "It seems like..." and then BE QUIET for 4 full seconds.',
  },
  {
    id: 'tactic-plan-b-inspection-haircut',
    name: 'Plan B: The Contractor Inspection Price Drop (Renegotiation)',
    master: 'Jerry Norton & Richard Taylor',
    corePrinciple: 'How to legally drop a contract price by $10,000 to $25,000 after signing without breaching the contract, using Section 4 (Inspection Contingency) and licensed contractor repair bids.',
    psychologicalTrigger: 'Sunk Cost Fallacy & The Fear of Relisting.',
    exactScriptEnglish: 'Hey {owner_name}, our licensed contractor team walked the property yesterday. The foundation and bones are solid, but they uncovered hidden water rot in the roof trusses and a cracked heat exchanger in the furnace totaling $14,000 in mandatory fixes. Our investment committee instructed me to issue a termination notice under Section 4. BUT I went to bat for you: if we sign a 1-page addendum adjusting the price down by $10,000, I have authority to waive all remaining inspections and fund cash in 7 days.',
    exactScriptSpanish: 'Hola {owner_name}, nuestro equipo técnico y contratistas con licencia recorrieron la casa ayer. Las vigas están sólidas, pero encontraron daños ocultos de humedad en la madera del techo y el intercambiador de calor de la calefacción fisurado, sumando $14,000 en reparaciones imprevistas. El comité me ordenó cancelar el contrato bajo la Cláusula 4. PERO peleé por ti: si firmamos una enmienda de 1 página ajustando el precio $10,000 abajo, tengo autorización para renunciar a toda inspección y fondear en efectivo en 7 días.',
    bestUsedWhen: 'During the 14-day inspection window when underwriting requires a lower basis or when unexpected major repairs are confirmed.',
    proTip: 'Remind the seller: If they cancel, any conventional/FHA buyer will have the exact same inspector flag the same issue and the bank will decline their mortgage, losing 90 days.',
  },
  {
    id: 'tactic-digital-phone-tiedown',
    name: 'The Instant Digital Phone Tie-Down (Close on the Call)',
    master: 'Todd Toback & Brent Daniels',
    corePrinciple: 'Never hang up without a signed contract or a confirmed electronic signature link opened on their screen while you are still speaking.',
    psychologicalTrigger: 'Immediate Momentum & Commitment Consistency.',
    exactScriptEnglish: 'Great {owner_name}! While I have you on the phone, I just texted our simple 1-page agreement to your cell at {phone}. Can you look at your screen right now? ... Perfect, you see where it says $75,000 net to you? Just tap that blue box, sign your name with your finger, and hit submit. Awesome! Escrow is officially open with the title company today!',
    exactScriptSpanish: '¡Excelente {owner_name}! Mientras te tengo en la línea, acabo de enviarte nuestro contrato simple de 1 página por mensaje de texto a tu celular {phone}. ¿Puedes mirar tu pantalla un segundo? ... Perfecto, ¿ves donde dice $75,000 netos para ti? Solo toca el recuadro azul, firma con tu dedo en la pantalla y dale a enviar. ¡Listo! ¡Abrimos el archivo en la compañía de título hoy mismo!',
    bestUsedWhen: 'At the end of every successful negotiation to prevent "buyer remorse" or competitors calling them after you hang up.',
    proTip: 'Stay on the phone with casual conversation ("How long have you lived in the area?") while they tap and sign. Do NOT hang up until you receive the e-sign confirmation email.',
  },
];

export const CREATIVE_FINANCE_PLAYBOOK: CreativeFinanceStructure[] = [
  {
    strategy: 'Subject-To (Adquisición Sujeta a Hipoteca Existente)',
    definition: 'El inversionista compra la propiedad adquiriendo el título legal (Deed), mientras la hipoteca existente a tasa fija baja (2.8%–4%) permanece a nombre del vendedor, siendo pagada mensualmente por el comprador a través de una compañía de Loan Servicing neutral.',
    whenToUse: 'Cuando el vendedor tiene poco equity (debe el 80%-90% del valor de la casa), no puede aceptar una oferta de contado con descuento, pero tiene una hipoteca fija a tasa muy baja conseguida entre 2020 y 2021.',
    sellerPitch: '¿Estarías abierto a que te paguemos tu precio completo si asumimos las cuotas mensuales de tu hipoteca al 2.8% o te pagamos mensualmente con intereses a través de un Loan Servicer autorizado?',
    buyerPitch: 'Tengo una casa unifamiliar en Tampa con hipoteca fija al 2.85% FHA. El pago mensual PITI es de solo $950/mes y la renta del mercado es de $1,800/mes ($850/mes de flujo libre). Entrada total de capital de $28,000 (incluye $12k al dueño y $12k de asignación). Cash-on-cash del 36% anual sin calificar con bancos.',
    legalSafeguards: [
      'Contrato de Administración Neutral con Servicer Regulado (Weststar / Evergreen) para pago automático al banco y envío de recibo al vendedor.',
      'Fideicomiso de Título (Land Trust) para proteger la transferencia y mitigar la cláusula Due-on-Sale.',
      'Póliza de Seguro de Riesgo (Hazard Insurance) con el nuevo comprador como asegurado principal y el acreedor original como acreedor adicional.',
      'Limited Power of Attorney específico para trámites hipotecarios y de seguros.',
    ],
    financialFormulas: {
      entryFeeFormula: 'Entry Fee = Cash al Vendedor (Moving Money) + Atrasos Hipotecarios + Assignment Fee Wholesaler + Costos de Cierre Title Company',
      cashOnCashFormula: 'Cash-on-Cash Return = (Flujo de Caja Anual Neto / Capital Total de Entrada Invertido) * 100',
      wholesalerFeeSpread: 'Normalmente entre $10,000 y $25,000 USD cobrados al comprador en la mesa de cierre (HUD-1/ALTA).',
    },
  },
  {
    strategy: 'Seller Financing (Financiamiento por el Dueño / Vendedor Actúa como el Banco)',
    definition: 'El vendedor posee la propiedad 100% libre de deudas (Free & Clear) o con mucho equity, y acepta financiar la venta recibiendo un enganche inicial (Down Payment) y pagos mensuales fijos de capital e interés por un plazo determinado (ej. 5, 10 o 30 años con o sin globo/balloon).',
    whenToUse: 'Dueños de propiedades multifamiliares (Duplex, Triplex, Fourplex), terrenos baldíos o casas heredadas libres de hipoteca que buscan ingresos pasivos mensuales sin dolores de cabeza de administración y quieren diferir el pago de impuestos sobre ganancias de capital (Capital Gains).',
    sellerPitch: '¿Qué pasaría si te damos tu precio completo — e incluso $20,000 más de lo que pides — con un pago inicial en efectivo hoy y pagos mensuales garantizados al 4% de interés por los próximos 10 años, convirtiendo tu propiedad en una pensión mensual sin pagar impuestos de golpe?',
    buyerPitch: 'Tengo un Fourplex en venta financiado 100% por el dueño al 4% de interés fijo sin bancos. Renta $4,200/mes y el pago al dueño es de $2,100/mes. Te deja $2,100/mes de flujo neto. Asignación de contrato disponible por $15,000.',
    legalSafeguards: [
      'Pagaré Formal (Promissory Note) detallando tasa, plazo y amortización.',
      'Hipoteca de Garantía (Mortgage / Deed of Trust) registrada en el registro público del condado protegiendo al vendedor en caso de incumplimiento.',
      'Servicing profesional para retención de impuestos prediales y seguros (Escrow Account).',
    ],
    financialFormulas: {
      entryFeeFormula: 'Down Payment al Dueño + Assignment Fee Wholesaler + Gastos de Título',
      cashOnCashFormula: '((Renta Bruta - Cuota Seller Finance - Seguros - Impuestos) * 12) / Total Entry Capital',
      wholesalerFeeSpread: '$10,000 a $30,000 USD de Assignment Fee o participación de Equity (15%-25%) en la propiedad.',
    },
  },
  {
    strategy: 'Novation Agreement (Acuerdo de Novación Inmobiliaria)',
    definition: 'El wholesaler firma un acuerdo de compraventa y un poder especial de comercialización (Novation Agreement) con el vendedor para remodelar ligeramente o poner la casa directamente en el MLS a precio de mercado minorista (Retail), garantizándole al dueño un número neto fijo y quedándose con todo el excedente por encima de esa cifra.',
    whenToUse: 'Propiedades en condiciones decentes donde el vendedor no acepta un descuento agresivo en efectivo pero está dispuesto a esperar 45-60 días para que el wholesaler la venda a un comprador con crédito FHA/Convencional en el MLS.',
    sellerPitch: 'Te garantizamos tus $180,000 netos en mano sin comisiones. Nosotros asumimos los costos de limpieza, fotos profesionales y comercialización, y si se vende por más, esa es nuestra compensación.',
    buyerPitch: 'Venta abierta en MLS a compradores minoristas tradicionales con créditos hipotecarios bancarios.',
    legalSafeguards: [
      'Specific Limited Power of Attorney para comercialización.',
      'Novation Addendum vinculante que autoriza listar en MLS.',
      'Garantía de precio mínimo neto para el vendedor protegido en cuenta de depósito en garantía.',
    ],
    financialFormulas: {
      entryFeeFormula: 'Cero para el comprador minorista bancario.',
      cashOnCashFormula: 'N/A (Operación de salida directa al MLS).',
      wholesalerFeeSpread: 'Precio Final de Venta en MLS - Precio Neto Garantizado al Dueño - Costos de Comercialización (Spread típico: $20,000 - $50,000 USD).',
    },
  },
];

export const MASTER_OBJECTIONS_ENCYCLOPEDIA: ObjectionDeepDive[] = [
  {
    id: 'obj-deep-zillow',
    objection: 'En Zillow / Redfin dice que mi casa vale $250,000, no voy a vender por menos.',
    hiddenFear: 'Miedo a ser estafado o a dejar dinero sobre la mesa por falta de información.',
    tacticalEmpathyOpening: 'Tiene toda la razón en mirar el número de Zillow, es una propiedad hermosa y entiendo perfectamente por qué querría ese monto.',
    reframeScript: 'El número de Zillow refleja el valor de una casa completamente remodelada con cocina de cuarzo y techo nuevo, vendida por un agente que cobra el 6%, con el comprador pidiendo 3% en gastos de cierre y esperando 90 a 120 días rogando que el tasador del banco no rechace el préstamo por daños. Si a $250,000 le resta $15,000 de comisión, $7,500 de cierre y $25,000 de reparaciones obligatorias, su neto real serían unos $202,500 tras 4 meses de estrés. Nosotros le garantizamos $195,000 netos al contado en 10 días sin tocar una brocha de pintura.',
    closingHook: '¿Para su familia qué tiene más valor: la incertidumbre de 4 meses con extraños visitando su casa, o la certeza de un cheque cerrado y depositado el próximo viernes?',
    category: 'Price',
  },
  {
    id: 'obj-deep-dnc',
    objection: '¿Cómo conseguiste mi número? ¡Esto es acoso / Estoy en la lista DNC!',
    hiddenFear: 'Invasión de la privacidad, desconfianza hacia llamadas no solicitadas o estafas telefónicas.',
    tacticalEmpathyOpening: 'Comprendo totalmente su sorpresa y le pido una sincera disculpa por interrumpir su tarde.',
    reframeScript: 'Nuestro departamento de adquisiciones revisa periódicamente los registros públicos del condado y del tasador de impuestos de parcelas residenciales en su código postal. Usamos directorios públicos de contacto autorizados. Si no desea que lo contactemos, lo coloco en nuestra lista interna de no llamar en 1 segundo y nunca más sabrá de nosotros. Pero la razón exacta por la que le marqué es que nuestro fondo de inversión tiene capital listo para comprar una casa de contado en su misma cuadra esta semana.',
    closingHook: '¿Habría algún inconveniente en que le deje nuestra cifra neta en 30 segundos antes de borrar su número, por si le sirve de referencia?',
    category: 'Trust',
  },
  {
    id: 'obj-deep-think',
    objection: 'Tengo que pensarlo / Quiero consultar con mi abogado o mis hijos.',
    hiddenFear: 'Parálisis por análisis y temor a tomar una decisión apresurada de la que se puedan arrepentir.',
    tacticalEmpathyOpening: 'Me parece una excelente idea, vender una propiedad es una decisión patrimonial crucial y debe tomarse con total seguridad.',
    reframeScript: 'Generalmente cuando los propietarios necesitan pensarlo suele ser por una de tres razones: o el monto neto de dinero no es exactamente lo que esperaban, o la fecha de cierre no les encaja, o tienen dudas sobre el proceso legal en la compañía de título. ¿Cuál de esas tres es la que más le preocupa en este momento? Nuestro contrato tiene un periodo de inspección y aprobación de 14 días: si sus hijos o su abogado no están 100% satisfechos, usted cancela sin penalidad de un solo centavo.',
    closingHook: '¿Qué le parece si le dejo la oferta bloqueada por escrito con los 14 días de protección para que la revise con ellos sobre la mesa hoy?',
    category: 'Procrastination',
  },
  {
    id: 'obj-deep-liens-probate',
    objection: 'El título tiene multas del municipio por césped/código, impuestos atrasados o la casa era de mis padres fallecidos y no hay testamento.',
    hiddenFear: 'Vergüenza por deudas acumuladas y terror a trámites legales costosos o juicios interminables.',
    tacticalEmpathyOpening: 'Por favor no se preocupe por eso en lo más mínimo; resolvemos títulos enredados y herencias todas las semanas y es mucho más fácil de lo que parece.',
    reframeScript: 'Nosotros nos encargamos de absolutamente todo para que usted no tenga que entrar en procesos desgastantes: 1) Usted no paga un solo dólar de su bolsillo. 2) No tiene que contratar abogados ni presentarse ante el juez del municipio. 3) Nuestro equipo de Curative Title radica una petición de causa de fuerza mayor ante el magistrado de código y negocia reducciones de multas de entre el 85% y el 90%. 4) Cualquier saldo restante de multas o impuestos se paga automáticamente de los fondos de cierre en la compañía de título. 5) Si es herencia, nuestro abogado de título redacta un simple Affidavit of Heirship (Declaración Jurada de Herederos) para transferir el título sin meses de juicio de probate.',
    closingHook: 'Usted solo firma el acuerdo con el notario y se lleva su cheque neto libre de deudas. ¿Le gustaría que nuestro equipo de título revise el récord hoy mismo?',
    category: 'Legal/Process',
  },
];
