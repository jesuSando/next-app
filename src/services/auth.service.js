import { ApiClient } from "@/lib/apiClient";

const api = new ApiClient({ baseUrl: "/api/auth" });

export const authService = {
    login: (credentials) => api.post("/login", credentials),
    logout: () => api.post("/logout"),
    refresh: () => api.post("/refresh"),
    me: () => api.get("/me"),
    register: (data) => api.post("/register", data),
};
