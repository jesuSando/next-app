import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
    const response = NextResponse.json({ message: "Logout exitoso" });

    // Borrar accessToken y refreshToken
    response.headers.set("Set-Cookie", serialize("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1,
        path: "/",
        sameSite: "lax",
    }));
    response.headers.append("Set-Cookie", serialize("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1,
        path: "/api/auth/refresh",
        sameSite: "lax",
    }));

    return response;
}
