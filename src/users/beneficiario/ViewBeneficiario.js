import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import Inicio from '../../inicionav/nav';
import { Link } from 'react-router-dom';

const ViewBeneficiarios = () => {
    const [beneficiarios, setBeneficiarios] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarBeneficiarios();
    }, []);

    const cargarBeneficiarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/beneficiarios'); // Ajusta la URL según tu backend
            setBeneficiarios(response.data);
        } catch (error) {
            console.error('Error al cargar beneficiarios:', error.message);
            setError('Error al cargar beneficiarios. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEliminarBeneficiario = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este beneficiario?');
        if (confirmacion) {
            try {
                await axios.delete(`http://localhost:3001/beneficiarios/${id}`); // Ajusta la URL según tu backend
                setBeneficiarios(beneficiarios.filter(beneficiario => beneficiario.id !== id));
            } catch (error) {
                console.error('Error al eliminar beneficiario:', error.message);
                setError('Error al eliminar beneficiario. Inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div>
            <Inicio />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Lista de Beneficiarios</h2>
                        <div className="text-end mb-3">
                            <Link to="/beneficiarios" className="btn btn-success">Nuevo Beneficiario</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>RUT</th>
                                    <th>Sexo</th>
                                    <th>Proyecto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {beneficiarios.map(beneficiario => (
                                    <tr key={beneficiario.id}>
                                        <td>{beneficiario.name_beneficiario}</td>
                                        <td>{beneficiario.age}</td>
                                        <td>{beneficiario.rut}</td>
                                        <td>{beneficiario.sexo}</td>
                                        <td>{beneficiario.Proyecto?.name_proyect}</td>
                                        <td>
                                            <Link to={`/beneficiarios/edit/${beneficiario.id}`} className="btn btn-primary btn-sm">Editar</Link>
                                            <button onClick={() => handleEliminarBeneficiario(beneficiario.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBeneficiarios;
