# 🏛️ WHOLESALEPLATFORM — AI Real Estate Wholesale & SkillForge Command Center

> **Plataforma completa de Inteligencia Artificial para Wholesale Real Estate**, ingestión multimodal de video (Instagram Reels / TikTok / YouTube / PDFs) con OCR y transcripción de audio, motor de negociación y cierre de vendedores motivados, base de datos de 33 compradores en efectivo y creadores con sus criterios exactos de compra (Buy Box), suite completa de XLeads / PumpStacker ($0/mes), y generador automático de contratos Purchase & Sale Agreement con cláusula de asignación a terceros.

---

## 🚀 Características Principales

### 1. ⚡ Módulo 1: Árbol Maestro de 9 Skills Evolutivas de Wholesale Real Estate
- **Fundamentos de Selección de Mercado**: Reglas 500k habitantes, 37% Homeownership rate, \$150k–\$450k median home price.
- **Listas de Gobierno y Solicitudes FOIA**: Code Enforcement, Tax Delinquent, Water Shut-Off, Probate Dockets.
- **Driving for Dollars & Zillow FSBO**: Filtros de 60+ días en Zillow al 60% del valor.
- **Skip Tracing Gratuito**: TruePeopleSearch, FastPeopleSearch y CyberBackgroundChecks para LLCs y dueños particulares.
- **Calculadora MAO & Reverse Price Anchor**: Fórmula `(ARV * 0.70) - Reparaciones - Assignment Fee`.
- **Contratos PSA y Asignación**: Contrato simple de 1–2 páginas con cláusula de inspección y depósito EMD de \$10 a \$100.
- **Financiamiento Creativo**: Hipotecas Asumibles al 2.8% (VA/FHA) y Subject-To en Zillow.
- **Wholesaling de Terrenos (Land Flipping)**: Infill Lots residenciales de 0.1 a 1 acre emparejados con constructores.
- **XLeads & PumpStacker Suite**: AI Death Scrubbing, AI Obituary Scraper, Curative Title y SkyDrive AI.

### 2. ⚡ Módulo 2: Pipeline de Adquisición de Vendedores & Agente de Llamadas IA
- **Pipeline Kanban**: Leads nuevos, contactados por SMS/Email, en llamada con IA, trato aceptado y contrato firmado.
- **Agente de Llamadas en Vivo (AI Voice Closer)**: Simulación interactiva por voz (con Web Speech API TTS) que sigue el guion de los 4 pilares de motivación (Condición, Plazo, Razón para Vender, Precio Flexible).
- **Manejador de Objeciones en Tiempo Real**: Respuestas instantáneas a *"Tu oferta es muy baja"*, *"Tengo otro comprador"*, *"Déjame pensarlo"*.
- **Generador de Contratos en 1 Clic**: Redacta el contrato legal completo con la cláusula de asignación a terceros lista para firma.

### 3. ⚡ Módulo 3: Directorio de 33 Creadores & Cash Buyers que Pagan a Buscadores
- Creadores de Instagram/YouTube/TikTok (Zach Ginn, Richard Taylor, Jerry Norton, Ryan Pineda, Max Maxwell, Austin Rutherford, Samuel G, Carson, etc.).
- Clasificación por modalidad:
  - 🔍 **Aceptan SOLO Encontrar la Propiedad / Lead Crudo (Sin Contrato / Bird Dog)**
  - 📄 **Requieren Contrato Ya Firmado (Signed PSA / JV Dispo)**
  - 🤝 **Aceptan Ambos**
- Cuánto pagan por trato (\$10,000 Finder's Fee, 50/50 JV Split, 100% Capital Funding para Terrenos).
- Buy Box exacto por ciudad, metros cuadrados, rango de precios y fórmulas de descuento.
- Botones de 1 clic para abrir sus portales de envío de deals, Instagram DM, comunidades y copiar mensajes pre-redactados.

### 4. ⚡ Módulo 4: PumpStacker & XLeads AI Suite ($0/mes)
- **AI Death Scrubbing**: Detecta propietarios fallecidos antes de que se abra Probate en la corte (Pre-Probate Leads).
- **AI Obituary Scraper**: Lee los obituarios de funerarias, extrae los herederos sobrevivientes (*"Survived by..."*) y genera enlaces directos de Skip Tracing gratis para cada hijo/cónyuge.
- **PumpStacker Curative Title Engine**: Diagnostica títulos con problemas (herencias sin testamento, multas municipales de código) y calcula la reducción del 85%–90% de multas mediante *Lien Mitigation*.
- **5 AI Zip Codes & SkyDrive AI**: Calcula los 5 códigos postales más calientes por velocidad de compras en efectivo y puntúa el deterioro satelital del techo y lote de 0 a 100.
- **BuyerMatch AI Dispo**: Clasifica a los compradores del código postal y genera el SMS y Email Dispo Blast en segundos.

### 5. ⚡ Ingestión Multimodal (Reels, TikTok, YouTube, PDF, Web)
- Usa `yt-dlp` local y `ffmpeg` para descargar el audio (MP3) y extraer cuadrículas visuales 3x2 de fotogramas clave con OCR.
- Evoluciona automáticamente las skills y exporta archivos reales `SKILL.md` a `.agents/skills/` compatibles con Antigravity / Gemini.

---

## 🛠️ Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js**: Versión 18.x o superior
- **Git**

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/enfocadosenfocados-bot/WHOLESALEPLATFORM.git
   cd WHOLESALEPLATFORM
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional):
   Copia el archivo de ejemplo o configúralo en tu sistema:
   ```bash
   cp .env.example .env.local
   ```
   *(Nota: Puedes ingresar tu clave de OpenRouter o Gemini directamente en la cabecera de la interfaz gráfica).*

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abrir en tu navegador**:
   Visita [http://localhost:3000](http://localhost:3000) (o el puerto configurado).

---

## 📁 Estructura del Proyecto

```text
WHOLESALEPLATFORM/
├── .agents/skills/                 # Skills maestras exportadas en formato Antigravity SKILL.md
├── bin/
│   └── yt-dlp.exe                  # Binario pre-empaquetado para descarga de Reels y videos
├── data/
│   └── skills-db.json              # Base de datos JSON con las 9 Skills, 33 Buyers, Leads y Pipeline
├── scripts/                        # Scripts de seeding y sincronización
├── src/
│   ├── app/
│   │   ├── api/                    # Endpoints Next.js (/api/skills, /api/pumpstacker, /api/scrape-buyers, etc.)
│   │   ├── layout.tsx
│   │   └── page.tsx                # Dashboard principal con navegación por pestañas
│   ├── components/                 # Componentes interactivos (XLeads, Cash Buyers, Pipeline, Ingestion, etc.)
│   ├── lib/                        # Clientes IA (OpenRouter fallback free), agentes de investigación y base de datos
│   └── types/                      # Definiciones TypeScript de Skills, Leads, Buyers y Creadores
├── package.json
└── README.md
```

---

## 📄 Licencia

MIT License — Desarrollado para uso educativo, análisis de mercado y operaciones de inversión en Wholesale Real Estate.
