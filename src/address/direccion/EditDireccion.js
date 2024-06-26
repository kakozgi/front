import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useParams} from 'react-router-dom';
import Inicio from '../../inicionav/nav';

const EditDireccion = () => {
  const { id } = useParams();

  const [direccionData, setDireccionData] = useState({
    street: '',
    departament: '',
    house_nunber: '',
    description: '',
    id_region: '',
    id_city: '',
    id_commune: '',
  });

  const [regiones, setRegiones] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [confirmacion, setConfirmacion] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDireccion();
    cargarRegiones();

    // eslint-disable-next-line
  }, [id]);

  const cargarDireccion = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/direccion/${id}`);
      setDireccionData(response.data);
      cargarCiudades(response.data.id_region);
      cargarComunas(response.data.id_city);
    } catch (error) {
      console.error('Error al cargar la dirección:', error.message);
      setError('Error al cargar la dirección. Inténtalo de nuevo más tarde.');
    }
  };

  const cargarRegiones = async () => {
    try {
      const response = await axios.get('http://localhost:3001/region');
      setRegiones(response.data);
    } catch (error) {
      console.error('Error al cargar regiones:', error.message);
      setError('Error al cargar regiones. Inténtalo de nuevo más tarde.');
    }
  };

  const cargarCiudades = async (regionId) => {
    try {
      const response = await axios.get(`http://localhost:3001/ciudad?regionId=${regionId}`);
      setCiudades(response.data);
    } catch (error) {
      console.error('Error al cargar ciudades:', error.message);
      setError('Error al cargar ciudades. Inténtalo de nuevo más tarde.');
    }
  };

  const cargarComunas = async (ciudadId) => {
    try {
      const response = await axios.get(`http://localhost:3001/comuna?ciudadId=${ciudadId}`);
      setComunas(response.data);
    } catch (error) {
      console.error('Error al cargar comunas:', error.message);
      setError('Error al cargar comunas. Inténtalo de nuevo más tarde.');
    }
  };

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setDireccionData({ ...direccionData, id_region: regionId, id_city: '', id_commune: '' });
    cargarCiudades(regionId);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setDireccionData({ ...direccionData, id_city: cityId, id_commune: '' });
    cargarComunas(cityId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDireccionData({ ...direccionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/direccion/${id}`, direccionData);
      console.log('Dirección actualizada exitosamente');
      setConfirmacion(true);
      setTimeout(() => {
        setConfirmacion(false);
        window.location=('/direccion/view');
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar la dirección:', error.message);
      setError('Error al actualizar la dirección. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      <Inicio />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center">Editar Dirección</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form className="card-body p-lg-5" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={direccionData.street}
                  onChange={handleChange}
                  placeholder="Calle"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="departament"
                  value={direccionData.departament}
                  onChange={handleChange}
                  placeholder="Departamento"
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="house_nunber"
                  value={direccionData.house_nunber}
                  onChange={handleChange}
                  placeholder="Número de Casa"
                  required
                  min="0"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={direccionData.description}
                  onChange={handleChange}
                  placeholder="Descripción"
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-control"
                  name="id_region"
                  value={direccionData.id_region}
                  onChange={handleRegionChange}
                  required
                >
                  <option value="">Seleccionar Región</option>
                  {regiones.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name_region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <select
                  className="form-control"
                  name="id_city"
                  value={direccionData.id_city}
                  onChange={handleCityChange}
                  required
                  disabled={!direccionData.id_region}
                >
                  <option value="">Seleccionar Ciudad</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad.id} value={ciudad.id}>
                      {ciudad.name_city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <select
                  className="form-control"
                  name="id_commune"
                  value={direccionData.id_commune}
                  onChange={handleChange}
                  required
                  disabled={!direccionData.id_city}
                >
                  <option value="">Seleccionar Comuna</option>
                  {comunas.map((comuna) => (
                    <option key={comuna.id} value={comuna.id}>
                      {comuna.name_commune}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5 mb-5">Guardar</button>
              </div>
              {confirmacion && (
                <div className="alert alert-success" role="alert">
                  ¡Dirección actualizada exitosamente!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDireccion;
