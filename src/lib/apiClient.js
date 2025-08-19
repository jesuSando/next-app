export class ApiClient {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl || "";
    }

    async request(path, options = {}) {
        const res = await fetch(`${this.baseUrl}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            credentials: "include", // para enviar cookies automáticamente
        });

        let data;
        try {
            data = await res.json();
        } catch {
            data = null;
        }

        if (!res.ok) {
            const error = data?.message || "Error en la petición";
            throw new Error(error);
        }

        return data;
    }

    get(path) {
        return this.request(path, { method: "GET" });
    }

    post(path, body) {
        return this.request(path, {
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    put(path, body) {
        return this.request(path, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    delete(path) {
        return this.request(path, { method: "DELETE" });
    }
}
