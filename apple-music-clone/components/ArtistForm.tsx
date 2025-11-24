"use client";
import { useState } from "react";
import { createArtist, updateArtist } from "@/lib/apiClient";

export default function ArtistForm({ initial, onSaved }: { initial?: any, onSaved?: (artist:any)=>void }) {
  const [name, setName] = useState(initial?.name || "");
  const [bio, setBio] = useState(initial?.bio || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...(initial || {}), name, bio };
    const res = initial?.id ? await updateArtist(payload) : await createArtist(payload);
    setLoading(false);
    if (res?.error) return alert(res.error);
    onSaved?.(res);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nombre artista" className="border p-2 w-full" />
      <textarea value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="Bio" className="border p-2 w-full"></textarea>
      <button disabled={loading} className="bg-black text-white px-3 py-2 rounded">
        {loading ? "Guardando..." : (initial?.id ? "Actualizar" : "Crear")}
      </button>
    </form>
  );
}
