"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { scheduleRefresh, cancelScheduledRefresh } from "@/utils/helper";
import { authService } from "@/services/auth.service";

export default function Dashboard() {
    const [sessionExpired, setSessionExpired] = useState(false);
    const router = useRouter();

    useEffect(() => {
        scheduleRefresh(setSessionExpired);
    }, []);

    useEffect(() => {
        if (sessionExpired) {
            alert("Tu sesión expiró. Por favor inicia sesión de nuevo.");
            router.replace("/login");
        }
    }, [sessionExpired]);
    const handleLogout = async () => {
        try {
            await authService.logout();
            cancelScheduledRefresh();
            localStorage.removeItem("exp");
            router.push("/login");
        } catch (err) {
            console.error("Error al hacer logout:", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Bienvenido al Dashboard 🔒</h1>
            <p>Solo accesible si estás logueado.</p>
            <button
                onClick={handleLogout}
                style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
            >
                Logout
            </button>
        </div>
    );
}
