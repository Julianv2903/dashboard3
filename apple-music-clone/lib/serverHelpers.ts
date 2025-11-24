// lib/serverHelpers.ts
import { supabaseAdmin } from "./supabaseClient";

export async function fetchArtists() {
  const { data } = await supabaseAdmin.from("artists").select("*").order("name", { ascending: true }).limit(1000);
  return data || [];
}

export async function fetchAlbums(artist_id?: string) {
  let q = supabaseAdmin.from("albums").select("*").order("created_at", { ascending: false }).limit(1000);
  if (artist_id) q = q.eq("artist_id", artist_id);
  const { data } = await q;
  return data || [];
}

export async function fetchSongs(album_id?: string) {
  let q = supabaseAdmin.from("songs").select("*").order("track_number", { ascending: true }).limit(1000);
  if (album_id) q = q.eq("album_id", album_id);
  const { data } = await q;
  return data || [];
}
