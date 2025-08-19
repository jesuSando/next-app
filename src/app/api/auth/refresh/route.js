import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
    try {
        const refreshToken = req.cookies.get("refreshToken")?.value;
        if (!refreshToken) return NextResponse.json({ message: "No refresh token" }, { status: 401 });

        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Generar nuevo access token
        const accessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: "1h" });


        const accessCookie = serialize("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        const decoded = jwt.decode(accessToken);
        const response = NextResponse.json({
            message: "Token renovado",
            exp: decoded.exp
        });
        
        response.headers.set("Set-Cookie", accessCookie);
        return response;
    } catch (err) {
        return NextResponse.json({ message: "Refresh token inválido" }, { status: 403 });
    }
}
