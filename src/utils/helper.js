let refreshTimeout;

export function scheduleRefresh(setSessionExpired) {
  const exp = localStorage.getItem("exp");
  if (!exp) return;

  const expiresAt = parseInt(exp, 10) * 1000;
  const now = Date.now();
  const timeUntilExpire = expiresAt - now;

  const refreshIn = timeUntilExpire - 60 * 1000;

  if (refreshIn > 0) {
    refreshTimeout = setTimeout(async () => {
      const res = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("exp", data.exp);
        scheduleRefresh(setSessionExpired); // volver a agendar
      } else {
        setSessionExpired(true);
      }
    }, refreshIn);
  }
}

export function cancelScheduledRefresh() {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
}
