export const metadata = {
  title: "Apple Music Clone",
  description: "Clon Apple Music con Next.js y Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
