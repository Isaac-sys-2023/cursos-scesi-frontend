export interface RedTutor {
  red: string;
  url: string;
}

export interface RegisterFormData {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  fechaNacimiento: Date;
  rol: "tutor";
  imagen?: File;
  descripcion?: string;
  redes: RedTutor[];
}