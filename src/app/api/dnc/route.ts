import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const checkPhone = searchParams.get('phone');
    const db = getDatabase();

    const dncList: string[] = (db as any).dncList || [];

    if (checkPhone) {
      const cleanTarget = checkPhone.replace(/\D/g, '');
      const isBlocked = dncList.some((p) => p.replace(/\D/g, '') === cleanTarget);
      return NextResponse.json({
        phone: checkPhone,
        isBlocked,
        status: isBlocked ? 'DNC_BLOCKED' : 'CLEAN',
      });
    }

    return NextResponse.json({
      totalBlockedNumbers: dncList.length,
      dncList,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error al consultar DNC';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action = 'add', phone, reason = 'Seller requested removal (STOP opt-out)' } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Número telefónico requerido' }, { status: 400 });
    }

    const cleanNumber = phone.trim();
    const db = getDatabase();
    if (!(db as any).dncList) {
      (db as any).dncList = [];
    }

    const existingIndex = (db as any).dncList.findIndex(
      (p: string) => p.replace(/\D/g, '') === cleanNumber.replace(/\D/g, '')
    );

    if (action === 'add') {
      if (existingIndex === -1) {
        (db as any).dncList.push(cleanNumber);
      }
      // Also update sellerLead status if present
      if (db.sellerLeads) {
        const lead = db.sellerLeads.find(
          (l) => l.phone.replace(/\D/g, '') === cleanNumber.replace(/\D/g, '')
        );
        if (lead) {
          lead.status = 'dead_dnc';
          lead.notes = `${lead.notes || ''} | [DNC ADDED: ${reason}]`;
        }
      }
      saveDatabase(db);

      return NextResponse.json({
        success: true,
        action: 'added',
        phone: cleanNumber,
        message: `Número ${cleanNumber} agregado permanentemente a la lista interna Do Not Call (DNC).`,
      });
    }

    if (action === 'remove') {
      if (existingIndex !== -1) {
        (db as any).dncList.splice(existingIndex, 1);
        saveDatabase(db);
      }
      return NextResponse.json({
        success: true,
        action: 'removed',
        phone: cleanNumber,
        message: `Número ${cleanNumber} removido de la lista DNC.`,
      });
    }

    return NextResponse.json({ error: 'Acción inválida' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error al actualizar DNC';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
