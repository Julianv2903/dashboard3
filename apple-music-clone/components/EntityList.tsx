"use client";
import React from "react";

export default function EntityList({ items, onEdit, onDelete, render }: { items:any[], onEdit?: (it:any)=>void, onDelete?: (it:any)=>void, render: (it:any)=>React.ReactNode }) {
  return (
    <div className="space-y-3">
      {items?.length === 0 ? <div className="text-slate-500">No hay items</div> : null}
      {items?.map(item => (
        <div key={item.id} className="flex items-start gap-3 bg-white p-3 rounded shadow">
          <div className="flex-1">{render(item)}</div>
          <div className="flex gap-2">
            {onEdit ? <button onClick={()=>onEdit(item)} className="px-2 py-1 border rounded">Editar</button> : null}
            {onDelete ? <button onClick={()=>onDelete(item)} className="px-2 py-1 border rounded">Eliminar</button> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
