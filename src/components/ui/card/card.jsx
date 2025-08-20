"use client";
import styles from "./card.module.css";

export default function Card({
    img,
    titulo,
    contenido,
    onClick,
    colorCard,
    colorTextCard,
    colorButton,
    textColorButton,
    textoButton
}) {
    return (
        <div
            className={styles.card}
            style={{
                backgroundColor: colorCard ? `var(${colorCard})` : undefined,
                color: colorTextCard ? `var(${colorTextCard})` : undefined
            }}
        >
            <div className={styles.avatar}>
                <img src={img} alt={titulo} className={styles.img} />
            </div>

            <h2 className={styles.titulo}>{titulo}</h2>
            <p className={styles.texto}>{contenido}</p>

            <button
                className={styles.button}
                onClick={onClick}
                style={{
                    backgroundColor: colorButton ? `var(${colorButton})` : undefined,
                    color: textColorButton ? `var(${textColorButton})` : undefined
                }}
            >
                {textoButton}
            </button>
        </div>
    );
}
