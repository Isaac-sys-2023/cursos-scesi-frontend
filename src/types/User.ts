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