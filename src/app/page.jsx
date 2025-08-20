"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button/button";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
      HOLA
        <Button 
          texto={loading ? "Cargando..." : "Ir a Login"} 
          onClick={handleLogin}
          color={"--color-primary"}
          textColor={"--color-text"}
        />
      </div>

    </div>
  );
}
