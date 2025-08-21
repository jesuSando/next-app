// src/app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
        }

        // Verificar si ya existe el usuario
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length > 0) {
            return NextResponse.json({ message: "El email ya está registrado" }, { status: 400 });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la DB
        await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        // Devolver respuesta simple
        return NextResponse.json({
            message: "Usuario registrado con éxito, ahora puedes iniciar sesión"
        }, { status: 201 });

    } catch (err) {
        console.error("Error en register:", err);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}
