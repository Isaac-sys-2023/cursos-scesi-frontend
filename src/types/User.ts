import type { RedUserItem } from "./Red";

export interface User {
  token: string;
  nombre: string;
  email: string;
  role: "admin" | "tutor" | "estudiante";
}

export interface UserContextProps {
  user: User | null;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

export interface UserItem {
  _id: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  fechaNacimiento: Date | string;
  descripcion?: string;
  imagen?: string;
  rol: "admin" | "tutor" | "estudiante";
  tareasUrl?: string,
  tipoEstudiante?: "externo" | "scesi" | "umss";
  redes?: RedUserItem[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
