import React from 'react';
import './nav.css'; // Importa los estilos CSS para el NavBar
import { Dropdown } from 'react-bootstrap';

const Inicio = () => {
  return (
    <nav className="navbar">
      <div className="logo-btn-container">
        <img src="https://huella.ucm.cl/assets/img/logo_ucm_b.png" alt="Logo" className="logo-img" />
        <a href="/home" className="btn">Inicio</a>
        <Dropdown className="dropdown">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">Options</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/proyect">Presentar Proyecto</Dropdown.Item>
            <Dropdown.Item href="/proyect/view">Proyectos</Dropdown.Item>
            <Dropdown.Item href="3">uwu</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};
  
export default Inicio;
