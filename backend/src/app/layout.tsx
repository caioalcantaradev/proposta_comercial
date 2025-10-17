import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WEBuilder - Proposta Comercial",
  description: "Proposta comercial personalizada para desenvolvimento web",
  keywords: "desenvolvimento web, proposta comercial, WEBuilder",
  authors: [{ name: "WEBuilder" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#d2f547" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
