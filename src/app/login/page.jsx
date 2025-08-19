"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { scheduleRefresh } from "@/utils/helper";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });
        try {
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("exp", data.exp);
                scheduleRefresh();
                router.push("/dashboard");
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error("Error parseando JSON:", err);
            setError("Error en el servidor");
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
