import { NextRequest, NextResponse } from 'next/server';

export interface SocrataViolationRecord {
  id: string;
  address: string;
  violationDate: string;
  violationStatus: string;
  description: string;
  inspectorComments: string;
  ordinance: string;
  city: string;
  state: string;
  source: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || 'chicago';
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    let apiUrl = '';
    if (city.toLowerCase() === 'chicago') {
      // Chicago Building Violations (Open Data Portal SODA API)
      apiUrl = 'https://data.cityofchicago.org/resource/22u3-xenr.json';
    } else {
      apiUrl = 'https://data.cityofchicago.org/resource/22u3-xenr.json';
    }

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) WholesalePlatform/1.0',
        'Accept': 'application/json'
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Portal gubernamental respondió con estado ${response.status}` }, { status: response.status });
    }

    const rawData = await response.json();
    const records: SocrataViolationRecord[] = (Array.isArray(rawData) ? rawData : [])
      .slice(0, limit)
      .map((item: Record<string, unknown>, idx: number) => {
        const addr = (item.address as string) || `${item.street_number || ''} ${item.street_name || ''}`.trim() || 'Dirección no especificada';
        return {
          id: String(item.id || item.inspection_number || `viol-${idx}`),
          address: addr,
          violationDate: String(item.violation_date || item.violation_last_modified_date || 'Reciente').split('T')[0],
          violationStatus: String(item.violation_status || 'OPEN'),
          description: String(item.violation_description || item.violation_inspector_comments || 'Violación de código residencial / mantenimiento'),
          inspectorComments: String(item.violation_inspector_comments || 'Pendiente de inspección de seguimiento'),
          ordinance: String(item.violation_ordinance || 'Código Municipal de Edificaciones'),
          city: 'Chicago',
          state: 'IL',
          source: 'City of Chicago Open Data Portal (SODA API)'
        };
      });

    return NextResponse.json({
      success: true,
      city: 'Chicago, IL',
      totalExtracted: records.length,
      records
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error al extraer datos gubernamentales';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
