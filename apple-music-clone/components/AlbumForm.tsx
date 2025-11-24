"use client";
import { useState } from "react";
import { createAlbum, updateAlbum } from "@/lib/apiClient";

export default function AlbumForm({ initial, artistId, onSaved }: { initial?: any, artistId?: string, onSaved?: (album:any)=>void }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [cover_url, setCoverUrl] = useState(initial?.cover_url || "");
  const [release_date, setReleaseDate] = useState(initial?.release_date || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...(initial || {}), title, cover_url, release_date, artist_id: initial?.artist_id || artistId };
    const res = initial?.id ? await updateAlbum(payload) : await createAlbum(payload);
    setLoading(false);
    if (res?.error) return alert(res.error);
    onSaved?.(res);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Título álbum" className="border p-2 w-full" />
      <input value={cover_url} onChange={(e)=>setCoverUrl(e.target.value)} placeholder="Cover URL" className="border p-2 w-full" />
      <input type="date" value={release_date} onChange={(e)=>setReleaseDate(e.target.value)} className="border p-2 w-full" />
      <button disabled={loading} className="bg-black text-white px-3 py-2 rounded">{loading ? "Guardando..." : (initial?.id ? "Actualizar" : "Crear")}</button>
    </form>
  );
}
