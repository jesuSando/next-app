"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button/button";
import TextPressure from "@/components/ui/text/textPressure";

export default function Home() {
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(null);

  const handleLogin = () => {
    setLoadingButton("login");
    router.push("/login");
  }

  const handleMoreInfo = () => {
    setLoadingButton("more");
    router.push("/more");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex items-center min-w-50 h-auto">

          <TextPressure
            text="HOLA"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={100}
          />

        </div>
        <div className="flex space-x-4">
          <Button
            texto={loadingButton === "login" ? "Cargando..." : "Ir a Login"}
            onClick={handleLogin}
            color={"--color-primary"}
            textColor={"--color-text"}
          />
          <Button
            texto={loadingButton === "more" ? "Cargando..." : "Ver Más"}
            onClick={handleMoreInfo}
            color={"--color-success"}
            textColor={"--color-text"}
          />
        </div>
      </div>
    </div>
  );
}
