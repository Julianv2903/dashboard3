import "./globals.css";


export const metadata = {
  title: "Apple Music Clone",
  description: "Replica inspirada, solo educativa"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-black">
        <NavBar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
