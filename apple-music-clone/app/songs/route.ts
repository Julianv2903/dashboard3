// app/api/songs/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const album_id = searchParams.get("album_id");
  const artist_id = searchParams.get("artist_id");
  const q = searchParams.get("q") || "";

  let query = supabaseAdmin.from("songs").select("*");
  if (album_id) query = query.eq("album_id", album_id);
  if (artist_id) query = query.eq("artist_id", artist_id);
  if (q) query = query.ilike("title", `%${q}%`);
  const { data, error } = await query.order("track_number", { ascending: true }).limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabaseAdmin.from("songs").insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PUT(request: Request) {
  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const { data, error } = await supabaseAdmin.from("songs").update(body).eq("id", body.id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const { error } = await supabaseAdmin.from("songs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
