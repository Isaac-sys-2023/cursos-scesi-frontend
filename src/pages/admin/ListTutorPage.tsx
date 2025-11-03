import { useEffect, useState } from "react";
import { useUser } from "../../context/useUser";
import { listTutors } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import type { TutorUser } from "../../types/User";

const ListTutorPage = () => {
  const [users, setUsers] = useState<TutorUser[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const getUsers = async () => {
      try {
        const data = await listTutors(user.token);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [user]);

  const handleEdit = (tutorItem: TutorUser) => {
    navigate(`/edit-tutor/${tutorItem._id}`, { state: { tutor: tutorItem } });
  };

  return (
    <div>
      {users.map((userItem, index) => (
        <div key={index}>
          <h1>
            {userItem.nombre} {userItem.apellidos}
          </h1>
          {userItem.imagen && (
            <img src={userItem.imagen} alt={userItem.nombre} />
          )}
          <p>{userItem.rol}</p>

          <button type="button" onClick={() => handleEdit(userItem)}>
            Editar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListTutorPage;
