
import './paginaInicio.css';
import Inicio from '../inicionav/nav';

const Home = () => {
    return (
      <div>
        <Inicio /> {/* Renderiza el NavBar en la parte superior */}
        <div className="container">
          <h1 className="mt-5">Bienvenido a la Página de Inicio</h1>
          <h1>¡Hola usuario! Esta es tu página de inicio después de iniciar sesión.</h1>
          {/* Agrega más contenido según sea necesario */}
        </div>
      </div>
    );
  };

export default Home;
