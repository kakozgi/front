import React, { useState } from 'react';
import axios from 'axios'; 
import './login.css'; 

const ViewLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      console.log('Usuario autenticado:', response.data);
      window.location.href = '/home';
    } catch (error) {
      setErrorMessage('Nombre de usuario o contraseña incorrectos');
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <div className="container-fluid login-container"> 
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="card-body p-lg-5" onSubmit={handleSubmit}>
            <div className="text-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Escudo_UCM.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile" />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
            </div>
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            <div className="text-center">
              <button type="submit" className="btn btn-color px-5 mb-5 w-100">Ingresar</button>
            </div>
            <div id="emailHelp" className="form-text text-center mb-5 text-dark">¿No tienes una cuenta?
              <a href="/registro" className="text-dark fw-bold"> Crea una cuenta</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewLogin;
