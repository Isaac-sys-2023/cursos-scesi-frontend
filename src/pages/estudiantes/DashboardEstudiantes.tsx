import { useUser } from "../../context/useUser";

const DashboardEstudiantes = () => {
  const { user } = useUser();
  return (
    <h1>
      Hola Estudiante {user ? user.nombre : "Sin nombre"} con el email{" "}
      {user ? user.email : "Sin email"} con el rol{" "}
      {user ? user.role : "Rol desconocido"}
    </h1>
  );
};

export default DashboardEstudiantes;
