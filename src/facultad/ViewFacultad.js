import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance'; // Asegúrate de ajustar la ruta
import { Link } from 'react-router-dom'; 
import Inicio from '../inicionav/nav';

const Facultades = () => {
  const [facultades, setFacultades] = useState([]);

  useEffect(() => {
    cargarFacultades();
  }, []);

  const cargarFacultades = async () => {
    try {
      const response = await axios.get('/facultad');

      // Imprimir el token y id_rol
      const token = localStorage.getItem('token');
      const idRol = localStorage.getItem('id_rol');
      console.log('Token:', token);
      console.log('ID Rol:', idRol);

      setFacultades(response.data);
    } catch (error) {
      console.error('Error al cargar facultades:', error.message);
    }
  };

  const handleEliminarFacultad = async (id, nombreFacultad) => {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la facultad "${nombreFacultad}"?`);
    if (confirmacion) {
      try {
        await axios.delete(`/facultad/${id}`);
        setFacultades(facultades.filter(facultad => facultad.id !== id));
        console.log('Facultad eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar facultad:', error.message);
      }
    }
  };

  return (
    <div>
      <Inicio />
      <div className="container">
        <h1 className="text-center mt-5 mb-4">Lista de Facultades</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ul className="list-group">
              {facultades.map(facultad => (
                <li key={facultad.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">{facultad.name_facultie}</h5>
                  </div>
                  <div>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminarFacultad(facultad.id, facultad.name_facultie)}>Eliminar</button>
                    <Link to={`/facultad/editar/${facultad.id}`} className="btn btn-primary btn-sm">Editar</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facultades;
