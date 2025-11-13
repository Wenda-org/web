import api from "./config";
import type {
  User,
  PaginatedResponse,
} from "../api.types";

export interface ListUsersParams {
  page?: number;
  perPage?: number;
  q?: string;
  role?: string;
  status?: string;
}

export async function listUsers(params?: ListUsersParams) {
  try {
    const response = await api.get<PaginatedResponse<User>>("/users", {
      params,
    });
    return response.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message || error?.message || "Erro ao listar usuários";
    throw new Error(msg);
  }
}

export async function getUser(id: string) {
  try {
    const response = await api.get<{ data: User }>(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message || error?.message || `Erro ao buscar usuário ${id}`;
    throw new Error(msg);
  }
}

export async function createUser(payload: Partial<User> & { password?: string }) {
  try {
    const response = await api.post<{ data: User }>("/users", payload);
    return response.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message || error?.message || "Erro ao criar usuário";
    throw new Error(msg);
  }
}

export async function updateUser(id: string, payload: Partial<User>) {
  try {
    const response = await api.put<{ data: User }>(`/users/${id}`, payload);
    return response.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message || error?.message || `Erro ao atualizar usuário ${id}`;
    throw new Error(msg);
  }
}

export async function changePassword(id: string, payload: { oldPassword?: string; newPassword: string }) {
  try {
    const response = await api.patch(`/users/${id}/password`, payload);
    return response.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message || error?.message || `Erro ao alterar senha do usuário ${id}`;
    throw new Error(msg);
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await api.delete(`/users/${id}`);
    // backend may return 204 or 200 with { success: true }
    if (response.status === 204) return true;
    if (response.data && response.data.success !== false) return true;
    return false;
  } catch (error: any) {
    const msg = error?.response?.data?.message || error?.message || `Erro ao deletar usuário ${id}`;
    throw new Error(msg);
  }
}

export default {
  listUsers,
  getUser,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
