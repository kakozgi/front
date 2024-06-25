// EditarProyecto.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditarProyecto = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState({
    name_proyect: '',
    description: '',
    versionProyect: '',
    telefono_solicitante: '',
    email_solicitante: '',
    recomendaciones: '',
    restricciones: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

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

export default EditarProyecto;
