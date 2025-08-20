"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { scheduleRefresh, cancelScheduledRefresh } from "@/utils/helper";
import { authService } from "@/services/auth.service";

import Button from "@/components/ui/button/button";

export default function Dashboard() {
    const [sessionExpired, setSessionExpired] = useState(false);
    const [nombre, setNombre] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        scheduleRefresh(setSessionExpired);
        handleUser();
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
            localStorage.removeItem("user");
            router.push("/login");
            router.refresh();
        } catch (err) {
            setError(err.message || "Error al hacer logout");
            console.error("Error al hacer logout:", err);
        }
    };

    // Obtener usuario
    const handleUser = async () => {
        try {
            const user = await authService.me();
            localStorage.setItem("user", JSON.stringify(user));
            console.log("Usuario obtenido:", user.username);
            setNombre(user.username);
        } catch (err) {
            setError(err.message || "Error al obtener usuario");
            console.error("Error al obtener usuario:", err);
        }
    };

    // Mostrar “cargando” mientras llega el nombre
    if (error) {
        return <p className="p-6 text-red-500">Error: {error}</p>;
    }

    if (!nombre) {
        return <p className="p-6">Cargando información del usuario...</p>;
    }

    return (
        <div className="p-6 space-y-4">
            <h1>Bienvenido al Dashboard 🔒, <span className="text-blue-400">{nombre}</span></h1>
            <p>Solo accesible si estás logueado.</p>

            <div className="flex gap-4">
                <Button 
                    texto={"Log out"}
                    onClick={handleLogout}
                    color={"--color-primary"}
                    textColor={"--color-text"}
                />
            </div>
        </div>
    );
}
