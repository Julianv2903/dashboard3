// app/admin/songs/page.tsx
import SongForm from "@/components/SongForm";
import EntityList from "@/components/EntityList";
import { fetchSongs as fetchSongsServer, fetchAlbums as fetchAlbumsServer, fetchArtists as fetchArtistsServer } from "@/lib/serverHelpers";
import { useState } from "react";

export default async function SongsPage() {
  const songs = await fetchSongsServer();
  const albums = await fetchAlbumsServer();
  const artists = await fetchArtistsServer();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Canciones</h1>
      <SongsManager initial={songs || []} albums={albums || []} artists={artists || []} />
    </div>
  );
}

function SongsManager({ initial, albums, artists }: { initial:any[], albums:any[], artists:any[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<any|null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string|undefined>(albums[0]?.id);
  const [selectedArtist, setSelectedArtist] = useState<string|undefined>(artists[0]?.id);

  const refresh = async () => {
    const res = await fetch("/api/songs");
    const data = await res.json();
    setItems(data);
  };

  const handleSaved = (song:any) => {
    refresh();
    setEditing(null);
  };

  const handleDelete = async (it:any) => {
    if (!confirm("Eliminar canción?")) return;
    await fetch(`/api/songs?id=${it.id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold">Crear / Editar</h2>
        <div className="flex gap-4 mb-3">
          <div>
            <label className="block text-sm">Álbum</label>
            <select value={selectedAlbum} onChange={(e)=>setSelectedAlbum(e.target.value)} className="border p-2">
              {albums.map(a=> <option value={a.id} key={a.id}>{a.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm">Artista</label>
            <select value={selectedArtist} onChange={(e)=>setSelectedArtist(e.target.value)} className="border p-2">
              {artists.map(a=> <option value={a.id} key={a.id}>{a.name}</option>)}
            </select>
          </div>
        </div>

        <SongForm initial={editing || undefined} albumId={selectedAlbum} artistId={selectedArtist} onSaved={handleSaved} />
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
              <div className="text-sm text-slate-500">Album: {it.album_id} • Track: {it.track_number}</div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
