import React, { useState } from 'react';
import './nav.css';

const Inicio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="app-container" onMouseLeave={() => setSidebarOpen(false)}>
      <div className={`sidebar-menu ${sidebarOpen ? 'open' : ''}`}>
    
      <img src="https://huella.ucm.cl/assets/img/logo_ucm_b.png" alt="Logo" className="logo-img" />

      <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={() => toggleDropdown('direccion')}>Direccion</button>
          {activeDropdown === 'direccion' && (
            <div className="dropdown-menu">
              <a href="/ciudad/view">Ciudades</a>
              <a href="/comuna/view">Comunas</a>
              <a href="/direccion/view">Direcciones</a>
              <a href="/region/view">Regiones</a>        
            </div>
          )}
        </div>
        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={() => toggleDropdown('proyecto')}>Proyecto</button>
          {activeDropdown === 'proyecto' && (
            <div className="dropdown-menu">
              <a href="/actividadcomprometida/view">Actividades Comprometidas</a>
              <a href="/album foto/view">Album Fotos</a>
              <a href="/alcance/view">Alcances</a>
              <a href="/alineamiento/view">Alineamientos</a>
              <a href="/ambito/view">Ámbitos</a>
              <a href="/aprobaciones/view">Aprobaciones</a>
              <a href="/area/view">Areas</a>
              <a href="/dificultad/view">Dificultades</a>
              <a href="/etapa/view">Etapas</a>
              <a href="/fuentefinanciamiento/view">Fuente Financiamiento</a>
              <a href="/modalidad/view">Modalidad</a>
              <a href="/proyect/view">Proyectos</a>
              <a href="/recursoscomprometidos/view">Recursos Comprometidos</a>
              <a href="/restriccionaprobacion/view">Restriccion/Aprobacion</a>
              <a href="/riesgo/view">Riesgos</a>
            </div>
          )}
        </div>
        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={() => toggleDropdown('ucm')}>UCM</button>
          {activeDropdown === 'ucm' && (
            <div className="dropdown-menu">
              <a href="/asignaturaparticipante/view">Asignatura Participante</a>
              <a href="/carrera/view">Carreras</a>
              <a href="/divulgacion/view">Divulgaciones</a>
              <a href="/facultad/view">Facultades</a>
              <a href="/sede/view">Sedes</a>
            </div>
          )}
        </div>

        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={() => toggleDropdown('usuarios')}>Usuarios</button>
          {activeDropdown === 'usuarios' && (
            <div className="dropdown-menu">
              <a href="/alumnoparticipante/view">Alumnos Participante</a>
              <a href="/alumnovoluntario/view">Alumnos Voluntarios</a>
              <a href="/beneficiarios/view">Beneficiarios</a>
              <a href="/colaboradorexterno/view">Colaborador Externo</a>
              <a href="/entidadpostulante/view">Entidad Postulante</a>
              <a href="/profesorparticipante/view">Profesor Participante</a>
              <a href="/rol/view">Roles</a>
              <a href="/usuarios/view">Usuarios</a>
            </div>
          )}
        </div>
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
