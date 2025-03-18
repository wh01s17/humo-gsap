import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Efecto de Estela de Humo',
  description: 'Efecto de estela de humo siguiendo el cursor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body >
        {children}
      </body>
    </html>
  );
}