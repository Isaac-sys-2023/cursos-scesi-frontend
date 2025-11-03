import type { Red } from "../types/Red";

const API_URL = import.meta.env.VITE_API_URL;

export const getRedesFetch = async (token: string): Promise<Red[]> => {
    const response = await fetch(`${API_URL}/redes`, {
        method: 'GET',
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Fallo al traer las redes sociales");

    const data: Red[] = await response.json();
    return data;
}