// CrearProyecto.jsx
import React, { useState } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';

const CrearProyecto = () => {
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
                  required
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
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="description"
                  value={proyectoData.description}
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
                  value={proyectoData.telefono_solicitante}
                  onChange={handleChange}
                  placeholder="Teléfono del Solicitante"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email_solicitante"
                  value={proyectoData.email_solicitante}
                  onChange={handleChange}
                  placeholder="Correo Electrónico del Solicitante"
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="recomendaciones"
                  value={proyectoData.recomendaciones}
                  onChange={handleChange}
                  placeholder="Recomendaciones"
                ></textarea>
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="restricciones"
                  value={proyectoData.restricciones}
                  onChange={handleChange}
                  placeholder="Restricciones"
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5">Guardar Proyecto</button>
              </div>
              {confirmacion && (
                <div className="alert alert-success mt-3" role="alert">
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

export default CrearProyecto;
