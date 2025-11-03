export interface Red {
  _id: string;
  nombre: string;
  img: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;

  __v: number;
}

export interface RedUserItem {
  red: Red; //objeto red completo
  url: string; //url asociada
  _id: string; //id del objeto que contiene
}