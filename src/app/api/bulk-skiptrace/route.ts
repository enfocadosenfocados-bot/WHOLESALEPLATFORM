import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { rawRecords = '' } = await req.json();

    const lines = rawRecords
      .split('\n')
      .map((l: string) => l.trim())
      .filter(Boolean);

    const enriched = lines.map((line: string, index: number) => {
      const parts = line.split('|').map((p) => p.trim());
      const name = parts[0] || `Owner ${index + 1}`;
      const address = parts[1] || '';
      const cityState = parts[2] || 'FL';

      const cleanName = name.replace(/[^a-zA-Z\s]/g, '').trim();
      const slugName = cleanName.toLowerCase().replace(/\s+/g, '-');
      const slugLoc = cityState.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const first = cleanName.split(' ')[0] || '';
      const last = cleanName.split(' ').slice(-1)[0] || '';

      return {
        id: `rec-${Date.now()}-${index}`,
        name,
        address,
        cityState,
        truePeopleSearchUrl: `https://www.truepeoplesearch.com/results?name=${encodeURIComponent(cleanName)}&citystatezip=${encodeURIComponent(cityState)}`,
        fastPeopleSearchUrl: `https://www.fastpeoplesearch.com/name/${slugName}_${slugLoc}`,
        cyberBackgroundChecksUrl: `https://www.cyberbackgroundchecks.com/people/${slugName}/${slugLoc}`,
        obituarySearchUrl: `https://www.legacy.com/obituaries/search?firstName=${encodeURIComponent(first)}&lastName=${encodeURIComponent(last)}`,
        findAGraveUrl: `https://www.findagrave.com/memorial/search?firstname=${encodeURIComponent(first)}&lastname=${encodeURIComponent(last)}&location=${encodeURIComponent(cityState)}`,
      };
    });

    // Generate CSV string
    const csvHeader = 'Name,Address,CityState,TruePeopleSearch,FastPeopleSearch,CyberBackgroundChecks,ObituarySearch\n';
    const csvRows = enriched
      .map(
        (r: any) =>
          `"${r.name}","${r.address}","${r.cityState}","${r.truePeopleSearchUrl}","${r.fastPeopleSearchUrl}","${r.cyberBackgroundChecksUrl}","${r.obituarySearchUrl}"`
      )
      .join('\n');

    return NextResponse.json({
      success: true,
      count: enriched.length,
      records: enriched,
      csvContent: csvHeader + csvRows,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error en bulk skip trace' }, { status: 500 });
  }
}
