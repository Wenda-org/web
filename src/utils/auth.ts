// src/utils/auth.ts

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
}
