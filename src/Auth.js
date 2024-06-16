// auth.js

const TOKEN_KEY = 'user_token';
const AUTH_KEY = 'user_role';

export const guardarToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const obtenerToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const eliminarToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const guardarRolUsuario = (rol) => {
  localStorage.setItem(AUTH_KEY, rol);
};

export const obtenerRolUsuario = () => {
  return localStorage.getItem(AUTH_KEY);
};
export const guardarIdRolUsuario = (idRol) => {
    localStorage.setItem(AUTH_KEY, idRol);
  };
  
  // Función para obtener el ID del rol del usuario desde localStorage
  export const obtenerIdRolUsuario = () => {
    return localStorage.getItem(AUTH_KEY);
  };
  

export const eliminarRolUsuario = () => {
  localStorage.removeItem(AUTH_KEY);
};
