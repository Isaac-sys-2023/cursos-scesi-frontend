import type { EditFormData } from "../types/RegisterFormData";
import type { UserItem } from "../types/User";

export const listUsers = async (token: string): Promise<UserItem[]> => {
    const res = await fetch(`http://localhost:4000/api/users`, {
        method: 'GET',
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })
    if (!res.ok) throw new Error("Fallo al traer los usuarios");
    const data: UserItem[] = await res.json();
    return data;
}

export const updateTutor = async (token:string, form: EditFormData, idUser: string) => {

    console.log(form);

    const formData = new FormData();
    if (idUser) formData.append("_id", idUser);
    if (form.nombre) formData.append("nombre", form.nombre);
    if (form.apellidos) formData.append("apellidos", form.apellidos);
    if (form.email) formData.append("email", form.email);
    if (form.redes) formData.append("redes", JSON.stringify(form.redes));
    if (form.imagen) formData.append("imagen", form.imagen);
    if (form.descripcion) formData.append("descripcion", form.descripcion);

    const response = await fetch(`http://localhost:4000/api/users/${idUser}`, {
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