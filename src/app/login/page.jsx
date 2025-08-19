"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import { scheduleRefresh } from "@/utils/helper";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await authService.login({ username, password });
            localStorage.setItem("exp", data.exp);
            scheduleRefresh();
            router.push("/dashboard");
        } catch (err) {
            console.error("Error en login:", err);
            setError(err.message || "Error en el servidor");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: "block", width: "100%", marginBottom: "1rem" }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: "block", width: "100%", marginBottom: "1rem" }}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
