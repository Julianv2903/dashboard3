"use client";
import Link from "next/link";
export default function NavBar(){
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <nav className="flex gap-4">
          <Link href="/" className="font-semibold">AM Clone</Link>
          <Link href="/admin/artists">Artistas</Link>
          <Link href="/admin/albums">Álbumes</Link>
          <Link href="/admin/songs">Canciones</Link>
        </nav>
      </div>
    </header>
  );
}
