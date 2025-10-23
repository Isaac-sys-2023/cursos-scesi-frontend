export interface User {
  token: string;
  nombre: string;
  email: string;
  role: string;
}

export interface UserContextProps {
  user: User | null;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}