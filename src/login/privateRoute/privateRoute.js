import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" />;
  }

  return <Component />;
};

export default PrivateRoute;
