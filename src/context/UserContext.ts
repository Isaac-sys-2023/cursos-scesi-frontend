import { createContext } from "react";
import type { UserContextProps } from "../types/User";

export const UserContext = createContext<UserContextProps | undefined>(undefined);