"use client";
import { useState } from "react";
import { createSong, updateSong } from "@/lib/apiClient";

export default function SongForm({ initial, albumId, artistId, onSaved }: { initial?: any, albumId?: string, artistId?: string, onSaved?: (song:any)=>void }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [duration, setDuration] = useState(initial?.duration?.toString() || "");
  const [audio_url, setAudioUrl] = useState(initial?.audio_url || "");
  const [track_number, setTrackNumber] = useState(initial?.track_number?.toString() || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...(initial || {}),
      title,
      duration: duration ? parseInt(duration, 10) : null,
      audio_url,
      track_number: track_number ? parseInt(track_number, 10) : null,
      album_id: initial?.album_id || albumId,
      artist_id: initial?.artist_id || artistId
    };
    const res = initial?.id ? await updateSong(payload) : await createSong(payload);
    setLoading(false);
    if (res?.error) return alert(res.error);
    onSaved?.(res);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Título canción" className="border p-2 w-full" />
      <input value={track_number} onChange={(e)=>setTrackNumber(e.target.value)} placeholder="Track #" className="border p-2 w-full" />
      <input value={duration} onChange={(e)=>setDuration(e.target.value)} placeholder="Duración (segundos)" className="border p-2 w-full" />
      <input value={audio_url} onChange={(e)=>setAudioUrl(e.target.value)} placeholder="Audio URL (bucket)" className="border p-2 w-full" />
      <button disabled={loading} className="bg-black text-white px-3 py-2 rounded">{loading ? "Guardando..." : (initial?.id ? "Actualizar" : "Crear")}</button>
    </form>
  );
}
