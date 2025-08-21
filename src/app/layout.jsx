import "@/styles/globals.css";

import { outfit } from "@/fonts/fonts";

export const metadata = {
  title: "Pagina de Ejemplo",
  description: "Esta es una pagina de ejemplo para Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className}`}
      >
        {children}
      </body>
    </html>
  );
}
