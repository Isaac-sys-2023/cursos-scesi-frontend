import { useEffect, useState } from "react";
import type { UserItem } from "../../types/User";
import { useUser } from "../../context/useUser";
import { listUsers } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const ListTutorPage = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const getUsers = async () => {
      try {
        const data = await listUsers(user.token);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [user]);

  const handleEdit = (userItem: UserItem) => {
    navigate("/edit-tutor", { state: { myUser: userItem } });
  };

  return (
    <div>
      {users
        .filter((userItem) => userItem.rol === "tutor")
        .map((userItem, index) => (
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
