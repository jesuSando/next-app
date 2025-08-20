import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { db } from "@/lib/db";

export async function POST(req) {
    const { email, password, rememberMe } = await req.json();

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) return NextResponse.json({ message: "Usuario no encontrado" }, { status: 401 });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });

    // Generar Access Token (1 hora)
    const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Generar Refresh Token (largo)
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

    // Cookies
    const accessCookie = serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        ...(rememberMe ? { maxAge: 60 * 60 * 24 * 365 } : undefined),
    });

    const refreshCookie = serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/api/auth/refresh",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 año
    });

    const decoded = jwt.decode(accessToken);
    
    const response = NextResponse.json({
        message: "Login exitoso",
        user: {
            id: user.id,
            username: user.username
        },
        exp: decoded.exp
    });
    response.headers.set("Set-Cookie", accessCookie);
    response.headers.append("Set-Cookie", refreshCookie);

    return response;
}
