import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditarProyectoadmin = () => {
  const { id } = useParams();

  // Estado para almacenar los detalles del proyecto
  const [proyecto, setProyecto] = useState({
    name_proyect: '',
    description: '',
    versionProyect: '',
    telefono_solicitante: '',
    email_solicitante: '',
    recomendaciones: '',
    restricciones: '',
    id_solicitante: '',
    id_solicitante_entity: '',
    id_scope: '',
    id_ambit: '',
    id_docenteRevisor: '',
    id_riesgoAsociado: '',
    id_alineamientoFacultad: '',
    id_dificultyNivel: '',
    id_stage: '',
    id_approbation: '',
    id_restriccionesAprobacion: '',
    id_modality: '',
    totalDineroAprobacion: '', // Nuevo campo
    recursosGastados: '', // Nuevo campo
    fechaejecucion: '',
    startDate: '',
    updateDate: '',
    finalDate: '',
    fechaAprobacion: '',
    horaAprobacion: '',
  });

  // Constantes para los valores de los campos foráneos
  const [etapas, setEtapas] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [scopes, setScopes] = useState([]);
  const [ambitos, setAmbitos] = useState([]);
  const [riesgos, setRiesgos] = useState([]);
  const [alineamientos, setAlineamientos] = useState([]);

  // Cargar datos de las constantes desde la API
  useEffect(() => {
    const fetchEtapas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/etapa');
        setEtapas(response.data);
      } catch (error) {
        console.error('Error al cargar etapas:', error.message);
      }
    };

    const fetchModalidades = async () => {
      try {
        const response = await axios.get('http://localhost:3001/modalidad');
        setModalidades(response.data);
      } catch (error) {
        console.error('Error al cargar modalidades:', error.message);
      }
    };

    const fetchScopes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/alcance');
        setScopes(response.data);
      } catch (error) {
        console.error('Error al cargar scopes:', error.message);
      }
    };

    const fetchAmbitos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/ambito');
        setAmbitos(response.data);
      } catch (error) {
        console.error('Error al cargar ámbitos:', error.message);
      }
    };

    const fetchRiesgos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/riesgo');
        setRiesgos(response.data);
      } catch (error) {
        console.error('Error al cargar riesgos:', error.message);
      }
    };

    const fetchAlineamientos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/alineamiento');
        setAlineamientos(response.data);
      } catch (error) {
        console.error('Error al cargar alineamientos:', error.message);
      }
    };

    fetchEtapas();
    fetchModalidades();
    fetchScopes();
    fetchAmbitos();
    fetchRiesgos();
    fetchAlineamientos();
  }, []);

  // Función para cargar el proyecto
  useEffect(() => {
    cargarProyecto();
  }, []);

  const cargarProyecto = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/proyecto/${id}`);
      setProyecto(response.data);
    } catch (error) {
      console.error('Error al cargar el proyecto:', error.message);
    }
  };

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
    if (confirmacion) {
      try {
        await axios.put(`http://localhost:3001/proyecto/${id}`, proyecto);
        console.log('Proyecto actualizado exitosamente');
        window.location = '/proyectos'; // Redirigir a la lista de proyectos
      } catch (error) {
        console.error('Error al actualizar el proyecto:', error.message);
      }
    }
  };

  return (
    <div>
      <Inicio />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center">Editar Proyecto</h2>
            <form className="card-body p-lg-5" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name_proyect"
                  value={proyecto.name_proyect}
                  onChange={handleChange}
                  placeholder="Nombre del Proyecto"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="versionProyect"
                  value={proyecto.versionProyect}
                  onChange={handleChange}
                  placeholder="Versión del Proyecto"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="description"
                  value={proyecto.description}
                  onChange={handleChange}
                  placeholder="Descripción del Proyecto"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="telefono_solicitante"
                  value={proyecto.telefono_solicitante}
                  onChange={handleChange}
                  placeholder="Teléfono del Solicitante"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email_solicitante"
                  value={proyecto.email_solicitante}
                  onChange={handleChange}
                  placeholder="Correo Electrónico del Solicitante"
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="recomendaciones"
                  value={proyecto.recomendaciones}
                  onChange={handleChange}
                  placeholder="Recomendaciones"
                ></textarea>
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="restricciones"
                  value={proyecto.restricciones}
                  onChange={handleChange}
                  placeholder="Restricciones"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="id_scope" className="form-label">Alcance del Proyecto</label>
                <select
                  className="form-control"
                  name="id_scope"
                  value={proyecto.id_scope}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar Ámbito</option>
                  {scopes.map((ambito) => (
                    <option key={ambito.id} value={ambito.id}>{ambito.name_scope}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="id_ambit" className="form-label">Ámbito del Proyecto</label>
                <select
                  className="form-control"
                  name="id_ambit"
                  value={proyecto.id_ambit}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar Ámbito</option>
                  {ambitos.map((ambito) => (
                    <option key={ambito.id} value={ambito.id}>{ambito.name_ambit}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="id_riesgoAsociado" className="form-label">Riesgo Asociado</label>
                <select
                  className="form-control"
                  name="id_riesgoAsociado"
                  value={proyecto.id_riesgoAsociado}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar Riesgo</option>
                  {riesgos.map((riesgo) => (
                    <option key={riesgo.id} value={riesgo.id}>{riesgo.nameRiesgoAsociado}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="id_alineamientoFacultad" className="form-label">Alineamiento con Facultad</label>
                <select
                  className="form-control"
                  name="id_alineamientoFacultad"
                  value={proyecto.id_alineamientoFacultad}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar Alineamiento</option>
                  {alineamientos.map((alineamiento) => (
                    <option key={alineamiento.id} value={alineamiento.id}>{alineamiento.name_alineamiento}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="totalDineroAprobacion"
                  value={proyecto.totalDineroAprobacion}
                  onChange={handleChange}
                  placeholder="Total Dinero Aprobación"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="recursosGastados"
                  value={proyecto.recursosGastados}
                  onChange={handleChange}
                  placeholder="Recursos Gastados"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProyectoadmin;
