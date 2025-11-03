export interface RedTutor {
  red: string; //id de la red
  url: string; //url que agarra del input
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

export interface EditFormData {
  nombre?: string;
  apellidos?: string;
  email?: string;
  imagen?: File;
  descripcion?: string;
  redes?: RedTutor[];
}