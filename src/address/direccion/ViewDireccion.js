import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const ViewDireccion = () => {
  const [direcciones, setDirecciones] = useState([]);
  const [regiones, setRegiones] = useState({});
  const [ciudades, setCiudades] = useState({});
  const [comunas, setComunas] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDirecciones();
    cargarRegiones();
    cargarCiudades();
    cargarComunas();
  }, []);

  const cargarDirecciones = async () => {
    try {
      const response = await axios.get('http://localhost:3001/direccion');
      setDirecciones(response.data);
    } catch (error) {
      console.error('Error al cargar direcciones:', error.message);
      setError('Error al cargar direcciones. Inténtalo de nuevo más tarde.');
    }
  };

  const cargarRegiones = async () => {
    try {
      const response = await axios.get('http://localhost:3001/region');
      const regionesMap = response.data.reduce((map, region) => {
        map[region.id] = region.name_region;
        return map;
      }, {});
      setRegiones(regionesMap);
    } catch (error) {
      console.error('Error al cargar regiones:', error.message);
      setError('Error al cargar regiones. Inténtalo de nuevo más tarde.');
    }
  };

  const cargarCiudades = async () => {
    try {
      const response = await axios.get('http://localhost:3001/ciudad');
      const ciudadesMap = response.data.reduce((map, ciudad) => {
        map[ciudad.id] = ciudad.name_city;
        return map;
      }, {});
      setCiudades(ciudadesMap);
    } catch (error) {
      console.error('Error al cargar ciudades:', error.message);
      setError('Error al cargar ciudades. Inténtalo de nuevo más tarde.');
    }
  };

  const cargarComunas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/comuna');
      const comunasMap = response.data.reduce((map, comuna) => {
        map[comuna.id] = comuna.name_commune;
        return map;
      }, {});
      setComunas(comunasMap);
    } catch (error) {
      console.error('Error al cargar comunas:', error.message);
      setError('Error al cargar comunas. Inténtalo de nuevo más tarde.');
    }
  };

  const handleEliminarDireccion = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta dirección?');
    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:3001/direccion/${id}`);
        setDirecciones(direcciones.filter(direccion => direccion.id !== id));
        console.log('Dirección eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar dirección:', error.message);
        setError('Error al eliminar dirección. Inténtalo de nuevo más tarde.');
      }
    }
  };

  return (
    <div>
      <Inicio />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2 className="text-center">Lista de Direcciones</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="text-end mb-3">
              <Link to="/direccion" className="btn btn-success">Nueva Dirección</Link>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Calle</th>
                  <th>Departamento</th>
                  <th>Número de Casa</th>
                  <th>Descripción</th>
                  <th>Región</th>
                  <th>Ciudad</th>
                  <th>Comuna</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {direcciones.map(direccion => (
                  <tr key={direccion.id}>
                    <td>{direccion.street}</td>
                    <td>{direccion.departament}</td>
                    <td>{direccion.house_number}</td>
                    <td>{direccion.description}</td>
                    <td>{regiones[direccion.id_region]}</td>
                    <td>{ciudades[direccion.id_city]}</td>
                    <td>{comunas[direccion.id_commune]}</td>
                    <td>
                      <Link to={`/direccion/edit/${direccion.id}`} className="btn btn-primary btn-sm">Editar</Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminarDireccion(direccion.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDireccion;
