// app/admin/albums/page.tsx
import AlbumForm from "@/components/AlbumForm";
import EntityList from "@/components/EntityList";
import { fetchAlbums as fetchAlbumsServer, fetchArtists as fetchArtistsServer } from "@/lib/serverHelpers";
import { useState } from "react";

export default async function AlbumsPage() {
  const albums = await fetchAlbumsServer();
  const artists = await fetchArtistsServer();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Álbumes</h1>
      <AlbumsManager initialAlbums={albums || []} artists={artists || []} />
    </div>
  );
}

function AlbumsManager({ initialAlbums, artists }: { initialAlbums:any[], artists:any[] }) {
  const [items, setItems] = useState(initialAlbums);
  const [editing, setEditing] = useState<any|null>(null);
  const [selectedArtist, setSelectedArtist] = useState<string|undefined>(artists[0]?.id);

  const refresh = async () => {
    const res = await fetch("/api/albums");
    const data = await res.json();
    setItems(data);
  };

  const handleSaved = (album:any) => {
    refresh();
    setEditing(null);
  };

  const handleDelete = async (it:any) => {
    if (!confirm("Eliminar álbum?")) return;
    await fetch(`/api/albums?id=${it.id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold">Crear / Editar</h2>
        <div className="mb-3">
          <label className="block text-sm">Seleccionar artista</label>
          <select value={selectedArtist} onChange={(e)=>setSelectedArtist(e.target.value)} className="border p-2">
            {artists.map(a => <option value={a.id} key={a.id}>{a.name}</option>)}
          </select>
        </div>
        <AlbumForm initial={editing || undefined} artistId={selectedArtist} onSaved={handleSaved} />
      </div>

      <div>
        <h2 className="font-semibold">List</h2>
        <EntityList
          items={items}
          onEdit={(it)=>setEditing(it)}
          onDelete={handleDelete}
          render={(it)=>(
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-slate-500">Artist id: {it.artist_id}</div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
