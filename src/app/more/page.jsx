"use client";
import Link from "next/link";

import AnimatedList from "@/components/ui/animatedList/animatedList";

export default function morePage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#060010]">
            <AnimatedList
                items={[
                    { label: "Inicio", href: "/" },
                    { label: "target cursor", href: "/more/targetCursor" },
                    "Solo texto",
                    { label: "Blog", href: "/blog" },
                ]}
                onItemSelect={(item, index) => {
                    alert(`Seleccionaste: ${item.label || item} (index ${index})`);
                }}
                showGradients={true}          // Gradientes arriba/abajo
                enableArrowNavigation={true}  // Navegación con ↑ ↓ Enter
                displayScrollbar={true}       // Muestra el scrollbar
                initialSelectedIndex={-1}     // Ninguno seleccionado al inicio
            />
        </main>
    )
}