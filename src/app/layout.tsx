import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkillForge | Dashboard Evolutivo de Skills & Wholesale Real Estate',
  description:
    'Transforma Reels de Instagram, TikTok, Facebook, YouTube, PDFs y páginas web en habilidades paso a paso ejecutables y Skills de Antigravity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
