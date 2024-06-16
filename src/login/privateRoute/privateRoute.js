// privateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { obtenerRolUsuario } from '/Users/macbookpro/Desktop/front/src/Auth.js'; // Importa la función para obtener el rol del usuario

const PrivateRoute = ({ element, allowedRoles }) => {
  const idRol = obtenerRolUsuario(); // Obtiene el rol del usuario del localStorage

  const hasPermission = () => {
    if (!idRol) {
      console.log('ID Rol no definido');
      return false;
    }

    return allowedRoles.includes(idRol.toString());
  };

  return hasPermission() ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} replace />
  );
};

export default PrivateRoute;
