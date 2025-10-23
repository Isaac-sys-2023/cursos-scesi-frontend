import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Vista para usuario no logeado</p>
      <Link to="/login">Ir a login</Link>
    </div>
  );
};

export default Home;
