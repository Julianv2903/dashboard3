// lib/apiClient.ts
export async function fetchArtists(q = "") {
  const res = await fetch(`/api/artists?q=${encodeURIComponent(q)}`, { cache: "no-store" });
  return res.json();
}

export async function createArtist(payload: any) {
  const res = await fetch("/api/artists", { method: "POST", body: JSON.stringify(payload) });
  return res.json();
}

export async function updateArtist(payload: any) {
  const res = await fetch("/api/artists", { method: "PUT", body: JSON.stringify(payload) });
  return res.json();
}

export async function deleteArtist(id: string) {
  const res = await fetch(`/api/artists?id=${id}`, { method: "DELETE" });
  return res.json();
}

// Albums
export async function fetchAlbums(artist_id?: string) {
  const q = artist_id ? `?artist_id=${encodeURIComponent(artist_id)}` : "";
  const res = await fetch(`/api/albums${q}`, { cache: "no-store" });
  return res.json();
}
export async function createAlbum(payload: any) {
  const res = await fetch("/api/albums", { method: "POST", body: JSON.stringify(payload) });
  return res.json();
}
export async function updateAlbum(payload: any) {
  const res = await fetch("/api/albums", { method: "PUT", body: JSON.stringify(payload) });
  return res.json();
}
export async function deleteAlbum(id: string) {
  const res = await fetch(`/api/albums?id=${id}`, { method: "DELETE" });
  return res.json();
}

// Songs
export async function fetchSongs(params: Record<string,string>|undefined) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : "";
  const res = await fetch(`/api/songs${qs}`, { cache: "no-store" });
  return res.json();
}
export async function createSong(payload: any) {
  const res = await fetch("/api/songs", { method: "POST", body: JSON.stringify(payload) });
  return res.json();
}
export async function updateSong(payload: any) {
  const res = await fetch("/api/songs", { method: "PUT", body: JSON.stringify(payload) });
  return res.json();
}
export async function deleteSong(id: string) {
  const res = await fetch(`/api/songs?id=${id}`, { method: "DELETE" });
  return res.json();
}
