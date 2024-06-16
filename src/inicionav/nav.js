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
        <a href="/carrera">Carreras</a>
        <a href="/facultad/view">Facultades</a>
        <a href="/facultad">Ingresar Facultad</a>
        <a href="/sede/view">Sedes</a>
        <a href="/sede">Ingresar Sede</a>
        <a href="/area/view">Areas</a>
        <a href="/area">Ingresar Area</a>
        <a href="/usuarios/view">Usuarios</a>
        <a href="/usuarios">Ingresar Usuarios</a>
        <a href="/rol/view">Roles</a>
        <a href="/rol">Ingresar Roles</a>
        <a href="/ciudad/view">Ciudades</a>
        <a href="/ciudad">Ingresar Ciudad</a>
        <a href="/comuna/view">Comunas</a>
        <a href="/comuna">Ingresar Comuna</a>
        <a href="/alcance">Alcances</a>
        <a href="/alcance/view">Ver Alcances</a>
        <a href="/ambito">Ámbitos</a>
        <a href="/ambito/view">Ver Ámbitos</a>
        <a href="/etapa">Etapas</a>
        <a href="/etapa/view">Ver Etapas</a>
        <a href="/modalidad">Modalidades</a>
        <a href="/modalidad/view">Ver Modalidades</a>
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
