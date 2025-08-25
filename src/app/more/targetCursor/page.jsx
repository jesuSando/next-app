"use client";

import { useState } from "react";
import TargetCursor from "@/components/ui/cursorTarget/cursorTarget";

export default function cursorPage() {
    const [spin, setSpin] = useState(2);
    const [hideDefault, setHideDefault] = useState(true);
    const [selector, setSelector] = useState(".cursor-target");

    return (
        <main className="min-h-screen bg-neutral-900 text-white">
            {/* Cursor personalizado */}
            <TargetCursor
                spinDuration={spin}
                hideDefaultCursor={hideDefault}
                targetSelector={selector}
            />

            <div className="mx-auto max-w-5xl p-6 space-y-10">
                {/* Encabezado */}
                <header className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">Demo TargetCursor</h1>
                    <div className="flex items-center gap-3">
                        {/* Selector del target */}
                        <select
                            value={selector}
                            onChange={(e) => setSelector(e.target.value)}
                            className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1"
                            title="Selector de objetivo"
                        >
                            <option value=".cursor-target">.cursor-target (clase)</option>
                            <option value='[data-cursor-target]'>[data-cursor-target] (atributo)</option>
                        </select>

                        {/* Velocidad de giro */}
                        <label className="flex items-center gap-2">
                            <span className="text-sm text-neutral-300">Giro:</span>
                            <input
                                type="range"
                                min="0.5"
                                max="8"
                                step="0.5"
                                value={spin}
                                onChange={(e) => setSpin(Number(e.target.value))}
                            />
                            <span className="text-sm tabular-nums">{spin.toFixed(1)}s</span>
                        </label>

                        {/* Mostrar/ocultar cursor nativo */}
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={hideDefault}
                                onChange={(e) => setHideDefault(e.target.checked)}
                            />
                            Ocultar cursor nativo
                        </label>
                    </div>
                </header>

                {/* Botones */}
                <section>
                    <h2 className="text-lg font-medium mb-3">Botones</h2>
                    <div className="flex flex-wrap gap-3">
                        <button className="cursor-target px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">
                            Primario
                        </button>
                        <button className="cursor-target px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600">
                            Éxito
                        </button>
                        <button className="cursor-target px-4 py-2 rounded bg-amber-500 hover:bg-amber-600">
                            Advertencia
                        </button>
                        <button className="cursor-target px-4 py-2 rounded bg-rose-500 hover:bg-rose-600">
                            Peligro
                        </button>
                        <button
                            className="cursor-target px-4 py-2 rounded border border-neutral-600 hover:bg-neutral-800"
                            data-cursor-target
                        >
                            Borde (data-attr también)
                        </button>
                    </div>
                </section>

                {/* Enlaces / texto interactivo */}
                <section>
                    <h2 className="text-lg font-medium mb-3">Enlaces</h2>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#"
                            className="cursor-target underline underline-offset-4 hover:no-underline"
                        >
                            Enlace simple
                        </a>
                        <a
                            href="#"
                            className="cursor-target inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700"
                        >
                            Enlace botón
                            <span aria-hidden>→</span>
                        </a>
                    </div>
                </section>

                {/* Formularios */}
                <section>
                    <h2 className="text-lg font-medium mb-3">Formulario</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <input
                            className="cursor-target w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2"
                            placeholder="Input de texto"
                        />
                        <select className="cursor-target w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2">
                            <option>Opción A</option>
                            <option>Opción B</option>
                            <option>Opción C</option>
                        </select>
                        <textarea
                            className="cursor-target sm:col-span-2 w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2"
                            rows={3}
                            placeholder="Textarea…"
                        />
                    </div>
                </section>

                {/* Cards */}
                <section>
                    <h2 className="text-lg font-medium mb-3">Cards</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <article
                                key={i}
                                className="cursor-target rounded-xl border border-neutral-800 overflow-hidden hover:border-neutral-700 transition"
                                data-cursor-target
                            >
                                <div className="aspect-video bg-neutral-800" />
                                <div className="p-4 space-y-2">
                                    <h3 className="font-semibold">Card #{i}</h3>
                                    <p className="text-sm text-neutral-300">
                                        Descripción corta para probar el cursor sobre contenedores.
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="cursor-target px-3 py-1 rounded bg-blue-500 hover:bg-blue-600">
                                            Acción
                                        </button>
                                        <a href="#" className="cursor-target underline">
                                            Detalles
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Imagen */}
                <section>
                    <h2 className="text-lg font-medium mb-3">Imagen</h2>
                    <img
                        className="cursor-target w-64 h-40 object-cover rounded-lg border border-neutral-800"
                        src="https://picsum.photos/640/400"
                        alt="Ejemplo"
                        loading="lazy"
                    />
                </section>

                {/* Caja grande */}
                <section>
                    <h2 className="text-lg font-medium mb-3">Área amplia</h2>
                    <div className="cursor-target h-40 rounded-xl border-2 border-dashed border-neutral-700 flex items-center justify-center">
                        Pasa el cursor por aquí
                    </div>
                </section>
            </div>
        </main>
    );
}
