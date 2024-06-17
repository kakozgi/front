import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/login';
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
import PrivateRoute from './login/privateRoute/privateRoute';
import ViewCiudad from './ciudad/ViewCiudad';
import CrearCiudad from './ciudad/PostCiudad';
import CrearComuna from './comuna/PostComuna';
import Comunas from './comuna/ViewComuna';
import EditarComuna from './comuna/EditComuna';
import PostAlcance from './alcance/PostAlcance';
import ViewAlcance from './alcance/ViewAlcance';
import EditarAlcance from './alcance/EditAlcance';
import CrearAmbito from './ambito/PostAmbito';
import ViewAmbito from './ambito/ViewAmbito';
import EditAmbito from './ambito/EditAmbito';
import CrearEtapa from './etapa/PostEtapa';
import Etapas from './etapa/ViewEtapa';
import EditarEtapa from './etapa/EditEtapa';
import CrearModalidad from './modalidad/PostModalidad';
import Modalidades from './modalidad/ViewModalidad';
import EditarModalidad from './modalidad/EditModalidad';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/home" element={
            <PrivateRoute element={Home} allowedRoles={['1', '2', '3']} />} />
            
          <Route path="/proyect" element={<PrivateRoute element={ProyectoForm} allowedRoles={['1', '2', '3']} />} /> 
          <Route path="/proyect/view" element={<PrivateRoute element={Proyectos} allowedRoles={['1', '2', '3']} />} />
          <Route path="/editar/:id" element={<PrivateRoute element={EditarProyecto} allowedRoles={['1', '2', '3']} />} />

          <Route path="/carrera/view" element={<PrivateRoute element={Carreras} allowedRoles={['1', '2', '3']} />} />
          <Route path="/carrera" element={<PrivateRoute element={CrearCarrera} allowedRoles={['1', '2', '3']} />} />

          <Route path="/facultad/view" element={<PrivateRoute element={Facultades} allowedRoles={['1', '2', '3']} />} />
          <Route path="/facultad" element={<PrivateRoute element={FacultadForm} allowedRoles={['1', '2', '3']} />} />
          <Route path="/facultad/editar/:id" element={<PrivateRoute element={EditarFacultad} allowedRoles={['1', '2', '3']} />} />

          <Route path="/sede" element={<PrivateRoute element={SedeForm} allowedRoles={['1', '2', '3']} />} />
          <Route path="/sede/view" element={<PrivateRoute element={Sedes} allowedRoles={['1', '2', '3']} />} />
          <Route path="/sede/editar/:id" element={<PrivateRoute element={EditarSede} allowedRoles={['1', '2', '3']} />} />

          <Route path="/area/view" element={<PrivateRoute element={Areas} allowedRoles={['1', '2', '3']} />} />
          <Route path="/area" element={<PrivateRoute element={CrearArea} allowedRoles={['1', '2', '3']} />} />
          <Route path="/area/editar/:id" element={<PrivateRoute element={EditarArea} allowedRoles={['1', '2', '3']} />} />

          <Route path="/usuarios/view" element={<PrivateRoute element={Usuarios} allowedRoles={['1', '2', '3']} />} />
          <Route path="/usuarios/editar/:id" element={<PrivateRoute element={EditarUsuario} allowedRoles={['1', '2', '3']} />} />
          <Route path="/usuarios" element={<PrivateRoute element={CrearUsuario} allowedRoles={['1', '2', '3']} />} />

          <Route path="/rol/view" element={<PrivateRoute element={Roles} allowedRoles={['1', '2', '3']} />} />
          <Route path="/rol" element={<PrivateRoute element={CrearRol} allowedRoles={['1', '2', '3']} />} />
          <Route path="/rol/editar/:id" element={<PrivateRoute element={EditarRol} allowedRoles={['1', '2', '3']} />} />

          <Route path="/ciudad/view" element={<PrivateRoute element={ViewCiudad} allowedRoles={['1', '2', '3']} />} />
          <Route path="/ciudad" element={<PrivateRoute element={CrearCiudad} allowedRoles={['1', '2', '3']} />} />

          <Route path="/comuna/view" element={<PrivateRoute element={Comunas} allowedRoles={['1', '2', '3']} />} />
          <Route path="/comuna" element={<PrivateRoute element={CrearComuna} allowedRoles={['1', '2', '3']} />} />
          <Route path="/comuna/editar/:id" element={<PrivateRoute element={EditarComuna} allowedRoles={['1', '2', '3']} />} />

          <Route path="/alcance" element={<PrivateRoute element={PostAlcance} allowedRoles={['1', '2', '3']} />} />
          <Route path="/alcance/view" element={<PrivateRoute element={ViewAlcance} allowedRoles={['1', '2', '3']} />} />
          <Route path="/alcance/edit/:id" element={<PrivateRoute element={EditarAlcance} allowedRoles={['1', '2', '3']} />} />

          <Route path="/ambito" element={<PrivateRoute element={CrearAmbito} allowedRoles={['1', '2', '3']} />} />
          <Route path="/ambito/view" element={<PrivateRoute element={ViewAmbito} allowedRoles={['1', '2', '3']} />} />
          <Route path="/ambito/edit/:id" element={<PrivateRoute element={EditAmbito} allowedRoles={['1', '2', '3']} />} />

          <Route path="/etapa" element={<PrivateRoute element={CrearEtapa} allowedRoles={['1', '2', '3']} />} />
          <Route path="/etapa/view" element={<PrivateRoute element={Etapas} allowedRoles={['1', '2', '3']} />} />
          <Route path="/etapa/edit/:id" element={<PrivateRoute element={EditarEtapa} allowedRoles={['1', '2', '3']} />} />

          <Route path="/modalidad" element={<PrivateRoute element={CrearModalidad} allowedRoles={['1', '2', '3']} />} />
          <Route path="/modalidad/view" element={<PrivateRoute element={Modalidades} allowedRoles={['1', '2', '3']} />} />
          <Route path="/modalidad/edit/:id" element={<PrivateRoute element={EditarModalidad} allowedRoles={['1', '2', '3']} />} />
          
          {/* Ruta de no autorizado */}
          <Route path="/not-authorized" element={<div>No autorizado</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
