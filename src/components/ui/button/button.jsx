"use client";
import styles from "./button.module.css";

export default function Button({ texto, onClick, color, textColor }) {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{ 
                backgroundColor: color ? `var(${color})` : undefined,
                color: textColor ? `var(${textColor})` : undefined
                }}
        >
            {texto}
        </button>
    );
}
