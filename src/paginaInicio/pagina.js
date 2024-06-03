import React from 'react';
import './paginaInicio.css';
import Inicio from '../inicionav/nav';
import CarouselComponent from './carousel/carrucel';

const Home = () => {
  return (
    <div>
      <Inicio /> {/* Renderiza el NavBar en la parte superior */}
      <div className="container mt-5">

      <CarouselComponent />
      
        <h1>Bienvenido a la Página de Inicio</h1>
        <h1>¡Hola usuario! Esta es tu página de inicio después de iniciar sesión.</h1>
        
      </div>
    </div>
  );
};

export default Home;