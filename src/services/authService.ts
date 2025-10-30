import axios from "axios";
import { type User } from "../types/User";
import type { RegisterFormData } from "../types/RegisterFormData";

export const loginFetch = async (email: string, password: string, loginUser: (userData: User) => void) => {
    const response = await fetch(`http://localhost:4000/api/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Failed to login");

    const data = await response.json();
    loginUser({
        nombre: data.nombre,
        email: data.email,
        role: data.role,
        token: data.token,
    });
}

export const loginAxios = async (email: string, password: string, loginUser: (userData: User) => void) => {
    const response = await axios.post(`http://localhost:4000/api/auth/login`, { email, password });

    const data = response.data;
    loginUser({
        nombre: data.nombre,
        email: data.email,
        role: data.role,
        token: data.token,
    });
}

export const registerTutor = async (form: RegisterFormData, token: string) => {

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("apellidos", form.apellidos);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("fechaNacimiento", form.fechaNacimiento.toISOString());
    formData.append("rol", form.rol);
    formData.append("redes", JSON.stringify(form.redes));

    if (form.imagen) formData.append("imagen", form.imagen);
    if (form.descripcion) formData.append("descripcion", form.descripcion);

    const response = await fetch(`http://localhost:4000/api/auth/register`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.msg || "Error desnocido");
        (error as any).status = response.status;
        throw error;
    }

    return data;
}