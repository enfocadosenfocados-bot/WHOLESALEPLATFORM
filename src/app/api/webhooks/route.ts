import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export async function GET() {
  const db = getDatabase();
  const webhooks = (db.settings as any).webhooks || {
    discordWebhookUrl: '',
    telegramBotToken: '',
    telegramChatId: '',
    goHighLevelWebhookUrl: '',
  };
  return NextResponse.json({ success: true, webhooks });
}

export async function POST(req: NextRequest) {
  try {
    const { action, webhooks, eventName, payload } = await req.json();

    const db = getDatabase();

    // 1. Save Webhooks Configuration
    if (action === 'save_webhooks') {
      (db.settings as any).webhooks = webhooks;
      saveDatabase(db);
      return NextResponse.json({ success: true, message: 'Webhooks guardados con éxito' });
    }

    // 2. Dispatch / Test Webhook Notification
    if (action === 'test_or_dispatch') {
      const activeWebhooks = (db.settings as any).webhooks || webhooks || {};
      const results: any = {};

      const title = eventName || '🔔 Alerta de WholesalePlatform';
      const textMessage = payload?.message || `Evento: ${eventName || 'Test Webhook'} registrado con éxito a las ${new Date().toLocaleTimeString()}`;

      // Discord Webhook
      if (activeWebhooks.discordWebhookUrl) {
        try {
          const res = await fetch(activeWebhooks.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: 'WholesalePlatform AI Bot',
              content: `**${title}**\n${textMessage}`,
            }),
          });
          results.discord = res.ok ? 'Sent (200)' : `Failed (${res.status})`;
        } catch (e: any) {
          results.discord = `Error: ${e.message}`;
        }
      }

      // Telegram Bot
      if (activeWebhooks.telegramBotToken && activeWebhooks.telegramChatId) {
        try {
          const res = await fetch(
            `https://api.telegram.org/bot${activeWebhooks.telegramBotToken}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: activeWebhooks.telegramChatId,
                text: `${title}\n\n${textMessage}`,
                parse_mode: 'Markdown',
              }),
            }
          );
          results.telegram = res.ok ? 'Sent (200)' : `Failed (${res.status})`;
        } catch (e: any) {
          results.telegram = `Error: ${e.message}`;
        }
      }

      // GoHighLevel Webhook
      if (activeWebhooks.goHighLevelWebhookUrl) {
        try {
          const res = await fetch(activeWebhooks.goHighLevelWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: eventName || 'wholesale_lead_event',
              timestamp: new Date().toISOString(),
              data: payload,
            }),
          });
          results.goHighLevel = res.ok ? 'Sent (200)' : `Failed (${res.status})`;
        } catch (e: any) {
          results.goHighLevel = `Error: ${e.message}`;
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Disparo de Webhook completado',
        results,
      });
    }

    return NextResponse.json({ error: 'Acción no soportada' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error en webhooks' }, { status: 500 });
  }
}
