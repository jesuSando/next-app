import styles from "./navbar.module.css";
import Link from "next/link"

export default function Navbar({ onClick }) {
    return (
        <nav className={styles.navbar}>
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="#" className="flex items-center space-x-2">
                        <span className="text-[var(--color-primary)] font-bold text-3xl">Logo</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="#" >
                            <p className="text-[var(--color-text)] hover:text-foreground transition-colors">
                                Inicio
                            </p>

                        </Link>
                        <Link href="#">
                            <p className="text-[var(--color-text)] hover:text-foreground transition-colors">
                                Acerca de
                            </p>
                        </Link>
                        <Link href="#">
                            <p className="text-[var(--color-text)] hover:text-foreground transition-colors">
                                Servicios
                            </p>
                        </Link>
                        <Link href="#">
                            <p className="text-[var(--color-text)] hover:text-foreground transition-colors">
                                Contacto
                            </p>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onClick}
                            className={styles.button}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
