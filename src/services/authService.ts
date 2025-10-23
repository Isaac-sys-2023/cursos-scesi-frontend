import axios from "axios";
import { type User } from "../types/User";

export const loginFetch = async (email: string, password:string, loginUser: (userData: User)=>void)=> {
    const response = await fetch(`http://localhost:4000/api/auth/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    });

    if(!response.ok) throw new Error("Failed to login");

    const data = await response.json();
    loginUser({
        nombre: data.nombre,
        email: data.email,
        role: data.role,
        token: data.token,
    });
}

export const loginAxios = async (email: string, password:string, loginUser: (userData: User)=>void)=>{
    const response = await axios.post(`http://localhost:4000/api/auth/login`, {email, password});

    const data = response.data;
    loginUser({
        nombre: data.nombre,
        email: data.email,
        role: data.role,
        token: data.token,
    });
}