"use client";

import styles from "./card.module.css";
import Button from "@/components/ui/button/button";

export default function Card({ img, titulo, contenido }) {
    return (
        <div className={styles.card}>
            <div className={styles.avatar}>
                <img src={img} alt={titulo} className={styles.img} />
            </div>

            <h2 className={styles.titulo}>{titulo}</h2>
            <p className={styles.texto}>{contenido}</p>
            <Button
                texto="Leer más"
                onClick={() => alert("Botón clickeado")}
                color={"--color-secondary"}
                textColor={"--color-background"}
            />
        </div>
    )
}