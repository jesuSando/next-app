import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // clave secreta en formato Uint8Array
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        // Verifica el token
        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (err) {
        console.error("JWT inválido:", err.message);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
