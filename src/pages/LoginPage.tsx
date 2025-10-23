import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";
import { useState } from "react";
import { loginFetch } from "../services/authService";

const LoginPage = () =>{
    const {loginUser} = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        try{
            await loginFetch(email, password, loginUser);

            switch(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")!).role){
                case "admin":
                    navigate("/admin");
                    break;
                case "estudiante":
                    navigate("/estudiantes");
                    break;
                case "tutor":
                    navigate("/tutores");
                    break;
                default:
                    navigate("/");
            }
        }catch(error: any){
            console.log(error.message)
        }
            // Aquí iría la llamada al servicio de login
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Correo:
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="correo" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;