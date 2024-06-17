import React, { useState } from 'react';
import axios from '../axiosInstance';
import Inicio from '../inicionav/nav';

const SedeForm = () => {
  const [sedeData, setSedeData] = useState({
    name_headquarter: '',
  });
  const [confirmacion, setConfirmacion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSedeData({ ...sedeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/sede', sedeData);
      console.log('Sede creada exitosamente');
      setConfirmacion(true);

      setSedeData({
        name_headquarter: '',
      });
    } catch (error) {
      console.error('Error al crear sede:', error.message);
    }
  };

  return (
    <div>
      <Inicio />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center">Formulario de Sede</h2>
            <form className="card-body p-lg-5" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name_headquarter"
                  value={sedeData.name_headquarter}
                  onChange={handleChange}
                  placeholder="Nombre de la Sede"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-color px-5 mb-5">Guardar</button>
              </div>
              {confirmacion && (
                <div className="alert alert-success" role="alert">
                  ¡Sede creada exitosamente!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SedeForm;
