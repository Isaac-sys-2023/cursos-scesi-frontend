import type { Red } from "../types/Red";

export const getRedesFetch = async (token: string): Promise<Red[]> => {
    const response = await fetch(`http://localhost:4000/api/redes`, {
        method: 'GET',
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Fallo al traer las redes sociales");

    const data: Red[] = await response.json();
    return data;
}