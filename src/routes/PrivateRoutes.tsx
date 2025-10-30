import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/useUser";

interface PrivateRouteProps {
    children: JSX.Element;
    roles: Array<"admin" | "tutor" | "estudiante">;
}

export const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
    const {user} = useUser();

    if(!user) return <Navigate to="/login" />;
    if(!roles.includes(user.role)) return <Navigate to="/" />;
    return children;
}