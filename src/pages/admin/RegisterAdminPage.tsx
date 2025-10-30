import { useEffect, useState, type ChangeEvent } from "react";
import { useUser } from "../../context/useUser";
import { getRedesFetch } from "../../services/redesService";
import type { Red } from "../../types/Red";
import type { RegisterFormData } from "../../types/RegisterFormData";
import { registerTutor } from "../../services/authService";

const RegisterAdminPage = () => {
  const [form, setForm] = useState<RegisterFormData>({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    fechaNacimiento: new Date(),
    rol: "tutor",
    redes: [],
  });

  const [redes, setRedes] = useState<Red[]>([]);
  const { user } = useUser();

  const [messageErrorBack, setMessageErrorBack] = useState<string>("");
  const [messageSuccess, setMessageSuccess] = useState<string>("");


  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const misRedes = await getRedesFetch(user.token);
        setRedes(misRedes);
      } catch (error) {
        console.error("Error al cargar redes:", error);
      }
    };
    fetchData();
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRedChange = (index: number, redId: string) => {
    const updatedRedes = [...form.redes];
    updatedRedes[index].red = redId;
    setForm({ ...form, redes: updatedRedes });
  };

  const handleRedUrlChange = (index: number, url: string) => {
    const updatedRedes = [...form.redes];
    updatedRedes[index].url = url;
    setForm({ ...form, redes: updatedRedes });
  };

  const addRed = () => {
    // setForm({...form, redes:[...form.redes, {red: redes[0]?._id || "", url: ""}]});
    const misRedes = [...form.redes];
    misRedes.push({ red: redes[0]?._id || "", url: "" });
    setForm({ ...form, redes: misRedes });
  };

  const handleRedDelete = (index: number) => {
    const misRedes = [...form.redes];
    misRedes.splice(index, 1);
    setForm({ ...form, redes: misRedes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageErrorBack("");
    setMessageSuccess("");

    //Validar, si el campo esta vacio o que cumpla ciertas reglas

    try {
      if (!user) return;
      const data = await registerTutor(form, user.token);
      console.log("Registro exitoso:",data);
      setMessageSuccess(data.msg);
      alert(`${data.msg}`);
    } catch (error:any) {
      console.error("Error al crear tutor:", error);
      if(error.status){
        setMessageErrorBack(`Error ${error.status}: ${error.message}`);
      }else{
        setMessageErrorBack(`Error al conectar con el servidor`);
      }
    }
  };

  return (
    <div>
      <h1>Registro de Tutor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fechaNacimiento"
          placeholder="Fecha de Nacimiento"
          value={form.fechaNacimiento.toISOString().split("T")[0]}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              fechaNacimiento: new Date(e.target.value),
            }))
          }
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input
          type="file"
          name="imagen"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setForm((prev) => ({ ...prev, imagen: file }));
            }
          }}
          multiple={false}
        />

        {form.redes.map((redItem, index) => {
          const selectedRed = redes.find((r) => r._id === redItem.red);
          return (
            <div key={index}>
              {selectedRed && (
                <img
                  src={selectedRed.img}
                  alt={selectedRed.nombre}
                  width={30}
                  height={30}
                />
              )}

              <select
                value={redItem.red}
                onChange={(e) => handleRedChange(index, e.target.value)}
              >
                {redes.map((red, index) => (
                  <option key={index} value={red._id}>
                    {red.nombre}
                  </option>
                ))}
              </select>

              <input
                type="url"
                placeholder="URL de la red social"
                value={redItem.url}
                onChange={(e) => handleRedUrlChange(index, e.target.value)}
              />

              <button type="button" onClick={() => handleRedDelete(index)}>
                x
              </button>
            </div>
          );
        })}

        <button type="button" onClick={addRed}>
          Agregar Red
        </button>

        <button type="submit">Crear Tutor</button>
      </form>

      {messageErrorBack && (<p>{messageErrorBack}</p>)}
      {messageSuccess && (<p>{messageSuccess}</p>)}
    </div>
  );
};

export default RegisterAdminPage;
