import { useState, type ReactNode } from "react";
import type { User } from "../types/User";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const loginUser = (userData: User) =>{
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  const logoutUser = () =>{
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      { children }
    </UserContext.Provider>
  );
};