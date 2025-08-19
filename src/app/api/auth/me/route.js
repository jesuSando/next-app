// src/app/api/auth/me/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const token = req.cookies.get("accessToken")?.value;
        if (!token) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.json({
            id: payload.id,
            username: payload.username
        });
    } catch (err) {
        return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }
}
