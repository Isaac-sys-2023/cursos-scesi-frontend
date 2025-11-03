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

export type UserDefault = {
  _id: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  fechaNacimiento: Date | string;
  rol: "admin" | "tutor" | "estudiante";
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type AdminAttributes = {
  imagen?: string;
}

export type AdminUser = UserDefault & AdminAttributes;

export type TutorAttributes = {
  descripcion?: string;
  imagen?: string;
  redes: RedUserItem[];
}

export type TutorUser = UserDefault & TutorAttributes;

export type EstudianteAttributes = {
  imagen?: string;
  tareasUrl?: string,
  tipoEstudiante: "externo" | "scesi" | "umss";
  redes?: RedUserItem[];
}

export type EstudianteUser = UserDefault & EstudianteAttributes;


export type AnyUser = AdminUser | TutorUser | EstudianteUser;