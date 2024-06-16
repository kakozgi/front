import React, { useState } from 'react';
import axios from 'axios';
import './formproyect.css'; 
import Inicio from '../inicionav/nav';

const ProyectoForm = () => {
  const [proyectoData, setProyectoData] = useState({
    versionProyect: '',
    name_proyect: '',
    description: '',
    telefono_solicitante: '',
    email_solicitante: '',
    recomendaciones: '',
    restricciones: ''
  });
  const [confirmacion, setConfirmacion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyectoData({ ...proyectoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/proyecto', proyectoData);
      console.log('Proyecto creado exitosamente');
      setConfirmacion(true);

      setProyectoData({
        versionProyect: '',
        name_proyect: '',
        description: '',
        telefono_solicitante: '',
        email_solicitante: '',
        recomendaciones: '',
        restricciones: ''
      });
    } catch (error) {
      console.error('Error al crear proyecto:', error.message);
    }
  };

  return (
    <div>
      <Inicio />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center">Formulario de Proyecto</h2>
            <form className="card-body p-lg-5" onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name_proyect"
                  value={proyectoData.name_proyect}
                  onChange={handleChange}
                  placeholder="Nombre del Proyecto"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="versionProyect"
                  value={proyectoData.versionProyect}
                  onChange={handleChange}
                  placeholder="Versión del Proyecto"
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="description"
                  value={proyectoData.description}
                  onChange={handleChange}
                  placeholder="Descripción del Proyecto"
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
              </div>
              {confirmacion && (
                <div className="alert alert-success" role="alert">
                  ¡Proyecto creado exitosamente!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoForm;
