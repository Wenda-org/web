// src/hooks/useUserData.ts
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

type User = {
  id: string;
  name: string;
  email: string;
  phone: number;
  profileImageUrl: string;
  address: string;
  // outros campos conforme seu schema
};

export function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${apiUrl}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Erro ao buscar usuário:", err))
      .finally(() => setLoading(false));
  }, []);
  console.log(user);
  console.log(localStorage.getItem("token"));
  
  return { user, loading };
}
