"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const signup = async (e:any)=>{
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if(error) return alert(error.message);
    router.push("/auth/login");
  };

  return (
    <form onSubmit={signup} className="max-w-md mx-auto mt-10 flex flex-col gap-3">
      <input className="border p-2" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input className="border p-2" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <button className="bg-black text-white py-2 rounded">Crear cuenta</button>
    </form>
  );
}
