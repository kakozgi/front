import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/login';
import './App.css';
import ProyectoForm from './proyecto/proyectform/formproyect';
import Proyectos from './proyecto/proyectform/viewproyect';
import EditarProyecto from './proyecto/proyectform/editproyect';
import Home from './paginaInicio/pagina';
import Carreras from './ucm/carrera/ViewCarrera';
import Facultades from './proyecto/facultad/ViewFacultad';
import FacultadForm from './proyecto/facultad/PostFacultad';
import EditarFacultad from './proyecto/facultad/EditFacultad';
import SedeForm from './ucm/sede/PostSede';
import Sedes from './ucm/sede/ViewSede';
import EditarSede from './ucm/sede/EditSede';
import Areas from './proyecto/area/ViewArea';
import CrearArea from './proyecto/area/PostArea';
import EditarArea from './proyecto/area/EditArea';
import CrearCarrera from './ucm/carrera/PostCarrera';
import Usuarios from './users/usuario/ViewUsuario';
import EditarUsuario from './users/usuario/EditUsuario';
import CrearUsuario from './users/usuario/PostUsuario';
import Register from './login/registro';
import Roles from './rol/ViewRol';
import CrearRol from './rol/PostRol';
import EditarRol from './rol/EditRol';
import PrivateRoute from './login/privateRoute/privateRoute';
import ViewCiudad from './address/ciudad/ViewCiudad';
import CrearCiudad from './address/ciudad/PostCiudad';
import CrearComuna from './address/comuna/PostComuna';
import Comunas from './address/comuna/ViewComuna';
import EditarComuna from './address/comuna/EditComuna';
import PostAlcance from './proyecto/alcance/PostAlcance';
import ViewAlcance from './proyecto/alcance/ViewAlcance';
import EditarAlcance from './proyecto/alcance/EditAlcance';
import CrearAmbito from './proyecto/ambito/PostAmbito';
import ViewAmbito from './proyecto/ambito/ViewAmbito';
import EditAmbito from './proyecto/ambito/EditAmbito';
import CrearEtapa from './proyecto/etapa/PostEtapa';
import Etapas from './proyecto/etapa/ViewEtapa';
import EditarEtapa from './proyecto/etapa/EditEtapa';
import CrearModalidad from './proyecto/modalidad/PostModalidad';
import Modalidades from './proyecto/modalidad/ViewModalidad';
import EditarModalidad from './proyecto/modalidad/EditModalidad';
import EditarCiudad from './address/ciudad/EditCiudad';
import CrearRegion from './address/region/PostRegion';
import ViewRegion from './address/region/ViewRegion';
import EditRegion from './address/region/EditRegion';
import CrearRiesgo from './proyecto/riesgo/PostRiesgo';
import ViewRiesgo from './proyecto/riesgo/ViewRiesgo';
import EditRiesgo from './proyecto/riesgo/EditRiesgo';
import PostActividadComprometida from './proyecto/actividadComprometida/PostActividadComprometida';
import ViewActividadesComprometidas from './proyecto/actividadComprometida/ViewActividadesComprometidas';
import EditarCarrera from './ucm/carrera/EditCarrera';
import CreateAlineamiento from './proyecto/alineamiento/PostAlieamiento';
import ViewAlineamiento from './proyecto/alineamiento/ViewAlineamiento';
import EditAlineamiento from './proyecto/alineamiento/EditAlineamiento';
import PostAprobacion from './proyecto/aprobacion/PostAprobacion';
import ViewAprobaciones from './proyecto/aprobacion/ViewAprobacion';
import EditAprobacion from './proyecto/aprobacion/EditAprobacion';
import PostFinanciamientoFuente from './proyecto/financiamiento/PostFinanciamiento';
import PostRecursosComprometidos from './proyecto/recursosComprometidos/PostRecursosComprometidos';
import ViewRecursosComprometidos from './proyecto/recursosComprometidos/ViewRecursosComprometidos';
import EditRecursosComprometidos from './proyecto/recursosComprometidos/EditRecursosComprometidos';
import ViewRestriccionesAprobacion from './proyecto/restriccionAprobacion/ViewRestriccionAprobacion';
import PostRestriccionAprobacion from './proyecto/restriccionAprobacion/PostRestriccionAprobacion';
import EditRestriccionAprobacion from './proyecto/restriccionAprobacion/EditRestriccionAprobacion';
import ViewFinanciamientoFuente from './proyecto/financiamiento/ViewFinanciamiento';
import EditFinanciamientoFuente from './proyecto/financiamiento/EditFinanciamiento';
import PostDificultadNivel from './proyecto/dificultad/PostDificultad';
import PostDireccion from './address/direccion/PostDireccion';
import ViewDificultadNivel from './proyecto/dificultad/ViewDificultad';
import EditDificultadNivel from './proyecto/dificultad/EditDificultad';
import EditActividadComprometida from './proyecto/actividadComprometida/EditActividadComprometida';
import ViewDireccion from './address/direccion/ViewDireccion';
import EditDireccion from './address/direccion/EditDireccion';
import DetallesUsuario from './users/usuario/GETIDusuario';
import CrearAsignaturaParticipante from './ucm/asignaturaParticipante/PostAsignaturaParticipante';
import CrearDivulgacion from './ucm/divulgaciones/PostDivulgaciones';
import Divulgaciones from './ucm/divulgaciones/ViewDivulgaciones';
import EditarDivulgacion from './ucm/divulgaciones/EditDivulgaciones';
import PostAlumnoParticipante from './users/alumnosParticipantes/PostAlumnoParticipante';
import PostAlumnoVoluntario from './users/alumnoVoluntario/PostAlumnoVoluntario';
import PostBeneficiario from './users/beneficiario/PostBeneficiario';
import ViewBeneficiarios from './users/beneficiario/ViewBeneficiario';
import EditBeneficiario from './users/beneficiario/EditBeneficiario';
import CrearEntidadPostulante from './users/entidadPostulante/PostEntidadPostulante';
import ViewEntidadesPostulantes from './users/entidadPostulante/ViewEntidadPostulante';
import EditEntidadPostulante from './users/entidadPostulante/EditEntidadPostulante';
import CrearProfesorParticipante from './users/profesorParticipante/PostProfesorParticipante';
import ViewAsignaturaParticipante from './ucm/asignaturaParticipante/ViewAsignaturaParticipante';
import EditarAsignaturaParticipante from './ucm/asignaturaParticipante/EditAsignaturaParticipante';
import ViewAlumnosVoluntarios from './users/alumnoVoluntario/ViewAlumnoVoluntario';
import EditAlumnoVoluntario from './users/alumnoVoluntario/EditAlumnoVoluntario';
import ViewProfesorParticipante from './users/profesorParticipante/ViewProfesorParticipante';
import EditarProfesorParticipante from './users/profesorParticipante/EditProfesorParticipante';
import ViewProyectos from './proyecto/proyectform/viewproyect';
import DetalleProyecto from './proyecto/proyectform/ViewProyectoID';
import CrearProyecto from './proyecto/proyectform/formproyect';
import AlumnoParticipante from './users/alumnosParticipantes/ViewAlumnoParticipante';
import EditarAlumnoParticipante from './users/alumnosParticipantes/EditarAlumnoParticipante';
import EditarProyectoadmin from './proyecto/proyectform/EditProyectADMIN';
import DetalleProyectoadmin from './proyecto/proyectform/ViewProyectIdAdmin';

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

          <Route path="/proyect" element={<PrivateRoute element={CrearProyecto}  />} /> 
          <Route path="/proyecto/detalle/:id" element={<PrivateRoute element={DetalleProyecto}  />} /> 
          <Route path="/proyect/view" element={<PrivateRoute element={ViewProyectos}  />} />
          <Route path="/proyect/edit/:id" element={<PrivateRoute element={EditarProyecto}  />} />

          <Route path="/proyect/editadmin/:id" element={<PrivateRoute element={EditarProyectoadmin}  />} />

          <Route path="/proyecto/detalleadmin/:id" element={<PrivateRoute element={DetalleProyectoadmin}  />} /> 


          <Route path="/carrera/view" element={<PrivateRoute element={Carreras}  />} />
          <Route path="/carrera" element={<PrivateRoute element={CrearCarrera} />} />
          <Route path="/carrera/edit/:id" element={<PrivateRoute element={EditarCarrera}  />} />

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
          <Route path="/usuarios/:id" element={<PrivateRoute element={DetallesUsuario}  />} />

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

          <Route path="/actividadcomprometida" element={<PrivateRoute element={PostActividadComprometida} />}></Route>
          <Route path="/actividadcomprometida/view" element={<PrivateRoute element={ViewActividadesComprometidas} />}></Route>
          <Route path="/actividadcomprometida/edit/:id" element={<PrivateRoute element={EditActividadComprometida} />}></Route>

          <Route path="/alineamiento" element={<PrivateRoute element={CreateAlineamiento} />}></Route>
          <Route path="/alineamiento/view" element={<PrivateRoute element={ViewAlineamiento} />}></Route>
          <Route path="/alineamiento/edit/:id" element={<PrivateRoute element={EditAlineamiento} />}></Route>

          <Route path="/aprobaciones" element={<PrivateRoute element={PostAprobacion} />}></Route>
          <Route path="/aprobaciones/view" element={<PrivateRoute element={ViewAprobaciones} />}></Route>
          <Route path="/aprobacion/edit/:id" element={<PrivateRoute element={EditAprobacion} />}></Route>

          <Route path="/fuentefinanciamiento" element={<PrivateRoute element={PostFinanciamientoFuente} />}></Route>
          <Route path="/fuentefinanciamiento/view" element={<PrivateRoute element={ViewFinanciamientoFuente} />}></Route>
          <Route path="/fuentefinanciamiento/edit/:id" element={<PrivateRoute element={EditFinanciamientoFuente} />}></Route>

          <Route path="/recursoscomprometidos" element={<PrivateRoute element={PostRecursosComprometidos} />}></Route>
          <Route path="/recursoscomprometidos/view" element={<PrivateRoute element={ViewRecursosComprometidos} />}></Route>
          <Route path="/recursoscomprometidos/edit/:id" element={<PrivateRoute element={EditRecursosComprometidos} />}></Route>

          <Route path="/restriccionaprobacion/view" element={<PrivateRoute element={ViewRestriccionesAprobacion} />}></Route>  
          <Route path="/restriccionaprobacion" element={<PrivateRoute element={PostRestriccionAprobacion} />}></Route>
          <Route path="/restriccionaprobacion/edit/:id" element={<PrivateRoute element={EditRestriccionAprobacion} />}></Route>

          <Route path="/dificultad" element={<PrivateRoute element={PostDificultadNivel} />}></Route>
          <Route path="/dificultad/view" element={<PrivateRoute element={ViewDificultadNivel} />}></Route>
          <Route path="/dificultad/edit/:id" element={<PrivateRoute element={EditDificultadNivel} />}></Route>
          
          <Route path="/direccion" element={<PrivateRoute element={PostDireccion} />}></Route>
          <Route path="/direccion/view" element={<PrivateRoute element={ViewDireccion} />}></Route>
          <Route path="/direccion/edit/:id" element={<PrivateRoute element={EditDireccion} />}></Route>

          <Route path="/asignaturaparticipante" element={<PrivateRoute element={CrearAsignaturaParticipante} />}></Route>
          <Route path="/asignaturaparticipante/view" element={<PrivateRoute element={ViewAsignaturaParticipante} />}></Route>
          <Route path="/asignaturaparticipante/edit/:id" element={<PrivateRoute element={EditarAsignaturaParticipante} />}></Route>

          <Route path="/divulgacion" element={<PrivateRoute element={CrearDivulgacion} />}></Route>
          <Route path="/divulgacion/view" element={<PrivateRoute element={Divulgaciones} />}></Route>
          <Route path="/divulgacion/edit/:id" element={<PrivateRoute element={EditarDivulgacion} />}></Route>

          <Route path="/alumnoparticipante" element={<PrivateRoute element={PostAlumnoParticipante} />}></Route>
          <Route path="/alumnoparticipante/view" element={<PrivateRoute element={AlumnoParticipante} />}></Route>
          <Route path="/alumnoparticipante/edit/:id" element={<PrivateRoute element={EditarAlumnoParticipante} />}></Route>

          <Route path="/alumnovoluntario" element={<PrivateRoute element={PostAlumnoVoluntario} />}></Route>
          <Route path="/alumnovoluntario/view" element={<PrivateRoute element={ViewAlumnosVoluntarios} />}></Route>
          <Route path="/alumnovoluntario/edit/:id" element={<PrivateRoute element={EditAlumnoVoluntario} />}></Route>

          <Route path="/beneficiarios" element={<PrivateRoute element={PostBeneficiario} />}></Route>
          <Route path="/beneficiarios/view" element={<PrivateRoute element={ViewBeneficiarios} />}></Route>
          <Route path="/beneficiarios/edit/:id" element={<PrivateRoute element={EditBeneficiario} />}></Route>

          <Route path="/entidadpostulante" element={<PrivateRoute element={CrearEntidadPostulante} />}></Route>
          <Route path="/entidadpostulante/view" element={<PrivateRoute element={ViewEntidadesPostulantes} />}></Route>
          <Route path="/entidadpostulante/edit/:id" element={<PrivateRoute element={EditEntidadPostulante} />}></Route>

          <Route path="/profesorparticipante" element={<PrivateRoute element={CrearProfesorParticipante} />}></Route>
          <Route path="/profesorparticipante/view" element={<PrivateRoute element={ViewProfesorParticipante} />}></Route>
          <Route path="/profesorparticipante/edit/:id" element={<PrivateRoute element={EditarProfesorParticipante} />}></Route>

          <Route path="/not-authorized" element={<div>No autorizado</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
