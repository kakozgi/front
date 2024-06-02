import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ViewLogin from './login/login';
import './App.css';
import ProyectoForm from './proyectform/formproyect';
import Proyectos from './proyectform/viewproyect';
import EditarProyecto from './proyectform/editproyect';
import Home from './paginaInicio/pagina';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<ViewLogin />} />
          <Route path='/proyect' element={<ProyectoForm />} /> 
          <Route path='/home' element={<Home />} /> 
          <Route path='proyect/view' element={<Proyectos />} />
          <Route path="/editar/:id" element={<EditarProyecto />} />

          <Route path="/" element={<Navigate to="/login" />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
