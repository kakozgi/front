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
import EditarCiudad from './ciudad/EditCiudad';
import CrearRegion from './region/PostRegion';
import ViewRegion from './region/ViewRegion';
import EditRegion from './region/EditRegion';
import CrearRiesgo from './riesgo/PostRiesgo';
import ViewRiesgo from './riesgo/ViewRiesgo';
import EditRiesgo from './riesgo/EditRiesgo';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/home" element={
            <PrivateRoute element={Home}  />} />

          <Route path="/proyect" element={<PrivateRoute element={ProyectoForm}  />} /> 
          <Route path="/proyect/view" element={<PrivateRoute element={Proyectos}  />} />
          <Route path="/editar/:id" element={<PrivateRoute element={EditarProyecto}  />} />

          <Route path="/carrera/view" element={<PrivateRoute element={Carreras}  />} />
          <Route path="/carrera" element={<PrivateRoute element={CrearCarrera} />} />

          <Route path="/facultad/view" element={<PrivateRoute element={Facultades} />} />
          <Route path="/facultad" element={<PrivateRoute element={FacultadForm}  />} />
          <Route path="/facultad/editar/:id" element={<PrivateRoute element={EditarFacultad} />} />

          <Route path="/sede" element={<PrivateRoute element={SedeForm}  />} />
          <Route path="/sede/view" element={<PrivateRoute element={Sedes}  />} />
          <Route path="/sede/editar/:id" element={<PrivateRoute element={EditarSede}  />} />

          <Route path="/area/view" element={<PrivateRoute element={Areas}  />} />
          <Route path="/area" element={<PrivateRoute element={CrearArea} />} />
          <Route path="/area/editar/:id" element={<PrivateRoute element={EditarArea}  />} />

          <Route path="/usuarios/view" element={<PrivateRoute element={Usuarios}  />} />
          <Route path="/usuarios/editar/:id" element={<PrivateRoute element={EditarUsuario}  />} />
          <Route path="/usuarios" element={<PrivateRoute element={CrearUsuario} />} />

          <Route path="/rol/view" element={<PrivateRoute element={Roles}  />} />
          <Route path="/rol" element={<PrivateRoute element={CrearRol} />} />
          <Route path="/rol/editar/:id" element={<PrivateRoute element={EditarRol} />} />

          <Route path="/ciudad/view" element={<PrivateRoute element={ViewCiudad}  />} />
          <Route path="/ciudad" element={<PrivateRoute element={CrearCiudad}  />} />
          <Route path="/ciudad/edit/:id" element={<PrivateRoute element={EditarCiudad}  />} />

          <Route path="/comuna/view" element={<PrivateRoute element={Comunas}  />} />
          <Route path="/comuna" element={<PrivateRoute element={CrearComuna} />} />
          <Route path="/comuna/editar/:id" element={<PrivateRoute element={EditarComuna}  />} />

          <Route path="/alcance" element={<PrivateRoute element={PostAlcance}  />} />
          <Route path="/alcance/view" element={<PrivateRoute element={ViewAlcance}  />} />
          <Route path="/alcance/edit/:id" element={<PrivateRoute element={EditarAlcance} />} />

          <Route path="/ambito" element={<PrivateRoute element={CrearAmbito} />} />
          <Route path="/ambito/view" element={<PrivateRoute element={ViewAmbito}  />} />
          <Route path="/ambito/edit/:id" element={<PrivateRoute element={EditAmbito} />} />

          <Route path="/etapa" element={<PrivateRoute element={CrearEtapa}/>} />
          <Route path="/etapa/view" element={<PrivateRoute element={Etapas}  />} />
          <Route path="/etapa/edit/:id" element={<PrivateRoute element={EditarEtapa} />} />

          <Route path="/modalidad" element={<PrivateRoute element={CrearModalidad} />} />
          <Route path="/modalidad/view" element={<PrivateRoute element={Modalidades} />} />
          <Route path="/modalidad/edit/:id" element={<PrivateRoute element={EditarModalidad}  />} />

          <Route path="/region" element={<PrivateRoute element={CrearRegion} />}></Route>
          <Route path="/region/view" element={<PrivateRoute element={ViewRegion} />}></Route>
          <Route path="/region/edit/:id" element={<PrivateRoute element={EditRegion} />}></Route>

          <Route path="/riesgo" element={<PrivateRoute element={CrearRiesgo} />}></Route>
          <Route path="/riesgo/view" element={<PrivateRoute element={ViewRiesgo} />}></Route>
          <Route path="/riesgo/edit/:id" element={<PrivateRoute element={EditRiesgo} />}></Route>
          
          <Route path="/not-authorized" element={<div>No autorizado</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
