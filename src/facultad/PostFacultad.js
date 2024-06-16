import React, { useState } from 'react';
import axios from 'axios';
import Inicio from '../inicionav/nav';

const FacultadForm = () => {
  const [facultadData, setFacultadData] = useState({
    name_facultie: '',
  });
  const [confirmacion, setConfirmacion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultadData({ ...facultadData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/facultad', facultadData);
      console.log('Facultad creada exitosamente');
      setConfirmacion(true);

      setFacultadData({
        name_facultie: '',
      });
    } catch (error) {
      console.error('Error al crear facultad:', error.message);
    }
  };

  return (
    <div>
      <Inicio />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center">Ingresa una Facultad</h2>
            <form className="card-body p-lg-5" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name_facultie"
                  value={facultadData.name_facultie}
                  onChange={handleChange}
                  placeholder="Nombre de la Facultad"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
              </div>
              {confirmacion && (
                <div className="alert alert-success" role="alert">
                  ¡Facultad creada exitosamente!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultadForm;
