import type { EditFormData } from "../types/RegisterFormData";
import type { AnyUser, TutorUser } from "../types/User";

const API_URL = import.meta.env.VITE_API_URL;

export const listUsers = async (token: string): Promise<AnyUser[]> => {
    const res = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })
    if (!res.ok) throw new Error("Fallo al traer los usuarios");
    const data: AnyUser[] = await res.json();
    return data;
}

function isTutor(user: AnyUser): user is TutorUser{
    return user.rol === "tutor"
}

export const listTutors = async (token: string): Promise<TutorUser[]> => {
    const data = await listUsers(token);
    const tutors: TutorUser[] = data.filter(isTutor);
    return tutors;
}

export const updateTutor = async (token: string, form: EditFormData, idUser: string) => {

    console.log(form);

    const formData = new FormData();
    if (idUser) formData.append("_id", idUser);
    if (form.nombre) formData.append("nombre", form.nombre);
    if (form.apellidos) formData.append("apellidos", form.apellidos);
    if (form.email) formData.append("email", form.email);
    if (form.redes) formData.append("redes", JSON.stringify(form.redes));
    if (form.imagen) formData.append("imagen", form.imagen);
    if (form.descripcion) formData.append("descripcion", form.descripcion);

    const response = await fetch(`${API_URL}/users/${idUser}`, {
        method: 'PATCH',
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