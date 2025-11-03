import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/useUser";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Red } from "../../types/Red";
import { getRedesFetch } from "../../services/redesService";
import type { EditFormData, RedTutor } from "../../types/RegisterFormData";
import type { TutorUser } from "../../types/User";
import { updateTutor } from "../../services/userService";
import { CircularProgress } from "@mui/material";

const EditTutorDataPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tutor: TutorUser = location.state.tutor;

  const redesTutor: RedTutor[] =
    tutor.redes?.map((redUser) => ({
      red: redUser.red._id, // aquí tomas solo el _id del objeto Red
      url: redUser.url,
    })) || [];

  const myFechaNacimiento =
    tutor.fechaNacimiento instanceof Date
      ? tutor.fechaNacimiento.toISOString()
      : tutor.fechaNacimiento;

  const [form, setForm] = useState<EditFormData>({
    nombre: tutor.nombre || "",
    apellidos: tutor.apellidos || "",
    email: tutor.email || "",
    redes: redesTutor,
  });

  const [submmiting, setSubmmiting] = useState<boolean>(false);

  const loadImageAsFile = async (url: string) => {
    if (url) {
      const response = await fetch(url);
      const blob = await response.blob();

      const file = new File([blob], "imagen_original.jpg", {
        type: blob.type,
      });
      setForm((prev) => ({ ...prev, imagen: file }));
    }
  };

  useEffect(() => {
    const myImage = tutor.imagen || null;

    const validateImage = async (myImage: string) => {
      await loadImageAsFile(myImage);
    };

    if (myImage != null) validateImage(myImage);

    const myDescripcion = tutor.descripcion || "";
    setForm({ ...form, descripcion: myDescripcion });
  }, []);

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
    const updatedRedes = [...form.redes ?? []];
    updatedRedes[index].red = redId;
    setForm({ ...form, redes: updatedRedes });
  };

  const handleRedUrlChange = (index: number, url: string) => {
    const updatedRedes = [...form.redes ?? []];
    updatedRedes[index].url = url;
    setForm({ ...form, redes: updatedRedes });
  };

  const addRed = () => {
    // setForm({...form, redes:[...form.redes, {red: redes[0]?._id || "", url: ""}]});
    const misRedes = [...form.redes ?? []];
    misRedes.push({ red: redes[0]?._id || "", url: "" });
    setForm({ ...form, redes: misRedes });
  };

  const handleRedDelete = (index: number) => {
    const misRedes = [...form.redes ?? []];
    misRedes.splice(index, 1);
    setForm({ ...form, redes: misRedes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmmiting(true);

    setMessageErrorBack("");
    setMessageSuccess("");

    //Validar, si el campo esta vacio o que cumpla ciertas reglas

    try {
      if (!user) return;
      const finalForm: EditFormData = form;

      if (form.apellidos === tutor.apellidos) {
        delete form.apellidos;
      }
      if (form.nombre === tutor.nombre) {
        delete form.nombre;
      }
      if (form.email === tutor.email) {
        delete form.email;
      }
      if (form.descripcion === tutor.descripcion) {
        delete form.descripcion;
      }
      if (form.imagen && form.imagen.name === "imagen_original.jpg") {
        delete form.imagen;
      }

      const data = await updateTutor(user.token, finalForm, tutor._id);
      console.log("Registro exitoso:", data);
      setMessageSuccess(data.msg);
      alert(`${data.msg}`);

      navigate("/tutores-lista");
    } catch (error: any) {
      console.error("Error al editar tutor:", error);
      if (error.status) {
        setMessageErrorBack(`Error ${error.status}: ${error.message}`);
      } else {
        setMessageErrorBack(`Error al conectar con el servidor`);
      }
    } finally {
      setSubmmiting(false);
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
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input type="date" value={myFechaNacimiento.split("T")[0]} disabled />

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

        <div>
          {form.imagen ? (
            <>
              <img
                src={URL.createObjectURL(form.imagen)}
                alt="Imagen seleccionada"
                width={100}
                height={100}
              />
              <button
                type="button"
                onClick={async () => {
                  if (tutor.imagen) await loadImageAsFile(tutor.imagen);
                }}
              >
                Resetear
              </button>
            </>
          ) : (
            <p>Sin imagen</p>
          )}{" "}
          {tutor.imagen ? (
            <img
              src={tutor.imagen}
              alt="Imagen actual"
              width={100}
              height={100}
            />
          ) : (
            <p>Sin imagen</p>
          )}
        </div>

        {form.redes && form.redes.length > 0 && form.redes.map((redItem, index) => {
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
                required
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

        <button type="submit">{submmiting && <CircularProgress enableTrackSlot size="30px" />} Actualizar Tutor</button>
      </form>

      {messageErrorBack && <p>{messageErrorBack}</p>}
      {messageSuccess && <p>{messageSuccess}</p>}
    </div>
  );
};

export default EditTutorDataPage;
