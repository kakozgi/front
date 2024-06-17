
import './paginaInicio.css';
import Inicio from '../inicionav/nav';
import CarouselComponent from './carousel/carrucel';

import GraficoDineroProyectos from '../graficos/DineroProyectos'; // Importa el nuevo componente de gráfico

const Home = () => {
    return (
    <div>
      <Inicio /> 
      <div className="container mt-5">
        <CarouselComponent />
        <GraficoDineroProyectos /> {/* Añadir el componente del gráfico */}
      </div>
    </div>
  );
};

export default Home;
