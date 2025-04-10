import { supabase } from "../lib/supabase";
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { nombre, email, productos, total } = await request.json();

    // Guardar pedido en la base de datos
    const { data, error } = await supabase
        .from("pedidos")
        .insert([{ nombre, email, productos, total }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ mensaje: "Pedido guardado", data });
}
