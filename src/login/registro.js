import React, { useState } from 'react';
import axios from 'axios';
import './registro.css'; // Asegúrate de que la ruta sea correcta

const Register = () => {
  const [formData, setFormData] = useState({
    rut: '',
    username: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    primaryEmail: '',
    secundaryEmail: '',
    
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      setConfirmMessage('');
      return;
    }

    try {
      await axios.post('http://localhost:3001/usuario', formData);
      setConfirmMessage('Usuario registrado exitosamente');
      setErrorMessage('');
      setFormData({
        rut: '',
        username: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        primaryEmail: '',
        secundaryEmail: '',
     
      });
    } catch (error) {
      setErrorMessage('Error al registrarte!');
      setConfirmMessage('');
      console.error('Error al registrar usuario:', error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="card-body">
        <div className="text-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Escudo_UCM.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
            width="200px" alt="profile" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="rut"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder="RUT"
            />
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
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Apellido"
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirma Contraseña"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="primaryEmail"
              name="primaryEmail"
              value={formData.primaryEmail}
              onChange={handleChange}
              placeholder="Email Primario"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="secundaryEmail"
              name="secundaryEmail"
              value={formData.secundaryEmail}
              onChange={handleChange}
              placeholder="Email Secundario"
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {confirmMessage && <div className="alert alert-success">{confirmMessage}</div>}
          <div className="text-center">
            <button type="submit" className="btn btn-color px-5 mb-5 w-100">Registrarse</button>
            <div id="emailHelp" className="form-text text-center mb-5 text-dark">¿tienes una cuenta?
              <a href="/login" className="text-dark fw-bold"> Inicia Sesion</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
