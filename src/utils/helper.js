export function scheduleRefresh() {
    const exp = localStorage.getItem("exp");
    if (!exp) return;
  
    const expiresAt = parseInt(exp, 10) * 1000; // exp viene en segundos → ms
    const now = Date.now();
    const timeUntilExpire = expiresAt - now;
  
    // refrescar 1 minuto antes de que caduque
    const refreshIn = timeUntilExpire - 60 * 1000;
  
    if (refreshIn > 0) {
      setTimeout(async () => {
        const res = await fetch("/api/auth/refresh", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          // opcional: actualizar exp en localStorage si backend lo devuelve
          localStorage.setItem("exp", data.exp);
          scheduleRefresh(); // volver a agendar el próximo refresh
        } else {
          // refresh falló → redirigir al login
          window.location.href = "/login";
        }
      }, refreshIn);
    }
  }
  