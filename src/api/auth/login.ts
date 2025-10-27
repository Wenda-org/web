import api from "../config"

export async function apiLogin(data: { emil: String, password: String }) {
    try {
        const response = await api.post<any>('/auth/login', data);
        const { token, message, user } = response.data;
        if (token && user.role) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("role", user.role);
        }
        localStorage.setItem("user", JSON.stringify(user));
        return ({
            message: message || 'Login feito com sucesso',
            user: user, 
        })
    } catch (error: any) {
        const errorMessage = 'Erro ao fazer login';
        throw new Error(errorMessage);
    }
}