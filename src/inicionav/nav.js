import React, { useState } from 'react';
import './nav.css';

const Inicio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="app-container" onMouseLeave={() => setSidebarOpen(false)}>
      <div className={`sidebar-menu ${sidebarOpen ? 'open' : ''}`}>
        <a href="/proyect">Presentar Proyecto</a>
        <a href="/proyect/view">Proyectos</a>
        <a href="/carrera/view">Carreras</a>
        <a href="/facultad/view">Facultades</a>
        <a href="/sede/view">Sedes</a>
        <a href="/area/view">Areas</a>
        <a href="/usuarios/view">Usuarios</a>
        <a href="/rol/view">Roles</a>
        <a href="/ciudad/view">Ciudades</a>
        <a href="/comuna/view">Comunas</a>
        <a href="/alcance/view">Alcances</a>
        <a href="/ambito/view">Ámbitos</a>
        <a href="/etapa/view">Etapas</a>
        <a href="/modalidad/view">Modalidades</a>
      </div>

      <div className="navbar">
        <div className="menu-btn-container"> </div>
        <div className="logo-btn-container" onMouseEnter={() => setSidebarOpen(true)}>
          <img src="https://huella.ucm.cl/assets/img/logo_ucm_b.png" alt="Logo" className="logo-img" />
        </div>
        <div className="logout-btn-container">
          <a href="/home" className="btn">Inicio</a>
          <button className="btn logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
