// app/admin/artists/page.tsx
import ArtistForm from "@/components/ArtistForm";
import EntityList from "@/components/EntityList";
import { fetchArtists as fetchArtistsServer } from "@/lib/serverHelpers";
import { useState } from "react";

export default async function ArtistsPage() {
  // Esta es server-side fetch inicial
  const artists = await fetchArtistsServer();
  // NOTE: no podemos usar hooks en Server Component; para interactividad usamos client components abajo.
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Artistas</h1>
      {/* Client component que obtiene y refresca datos */}
      <ArtistsManager initial={artists || []} />
    </div>
  );
}

// Client wrapper
function ArtistsManager({ initial }: { initial:any[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<any|null>(null);

  const refresh = async () => {
    const res = await fetch("/api/artists");
    const data = await res.json();
    setItems(data);
  };

  const handleSaved = (artist:any) => {
    refresh();
    setEditing(null);
  };

  const handleDelete = async (it:any) => {
    if (!confirm("Eliminar artista?")) return;
    await fetch(`/api/artists?id=${it.id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold">Crear / Editar</h2>
        <ArtistForm initial={editing || undefined} onSaved={handleSaved} />
      </div>

      <div>
        <h2 className="font-semibold">List</h2>
        <EntityList
          items={items}
          onEdit={(it)=>setEditing(it)}
          onDelete={handleDelete}
          render={(it)=>(
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-slate-500">{it.bio}</div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
