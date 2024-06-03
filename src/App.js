import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ViewLogin from './login/login';
import './App.css';
import ProyectoForm from './proyectform/formproyect';
import Proyectos from './proyectform/viewproyect';
import EditarProyecto from './proyectform/editproyect';
import Home from './paginaInicio/pagina';
import Carreras from './carrera/ViewCarrera';
import Facultades from './facultad/ViewFacultad';
import FacultadForm from './facultad/PostFacultad';
import EditarFacultad from './facultad/EditFacultad';
import SedeForm from './sede/PostSede';
import Sedes from './sede/ViewSede';
import EditarSede from './sede/EditSede';
import Areas from './area/ViewArea';
import CrearArea from './area/PostArea';
import EditarArea from './area/EditArea';
import CrearCarrera from './carrera/PostCarrera';
import Usuarios from './usuario/ViewUsuario';
import EditarUsuario from './usuario/EditUsuario';
import CrearUsuario from './usuario/PostUsuario';
import Register from './login/registro';
import Roles from './rol/ViewRol';
import CrearRol from './rol/PostRol';
import EditarRol from './rol/EditRol';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<ViewLogin />} />
          <Route path='/proyect' element={<ProyectoForm />} /> 
          <Route path='/home' element={<Home />} /> 
          <Route path='proyect/view' element={<Proyectos />} />
          <Route path="/editar/:id" element={<EditarProyecto />} />


          <Route path="/carrera/view" element={<Carreras />} />
          <Route path="/carrera" element={<CrearCarrera />} />


          <Route path="/facultad/view" element={<Facultades />} />
          <Route path="/facultad" element={<FacultadForm />} />
          <Route path="/facultad/editar/:id" element={<EditarFacultad />} />

          <Route path="/sede" element={<SedeForm />} />
          <Route path="/sede/view" element={<Sedes />} />
          <Route path="/sede/editar/:id" element={<EditarSede />} />

          <Route path="/area/view" element={<Areas />} />
          <Route path="/area" element={<CrearArea />} />
          <Route path="/area/editar/:id" element={<EditarArea />} />

          <Route path="/usuarios/view" element={<Usuarios/>} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario/>} />
          <Route path="/usuarios" element={<CrearUsuario/>} />

          <Route path="/rol/view" element={<Roles />} />
          <Route path="/rol" element={<CrearRol/>} />
          <Route path="/rol/editar/:id" element={<EditarRol/>} />



          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/registro" element={<Register/>} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
