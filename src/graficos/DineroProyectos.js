import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const GraficoDineroProyectos = () => {
  const data = {
    labels: ['IECI', 'ICI', 'ING CIVIL', 'ING INDUSTRIAL'], // Nombres de las carreras
    datasets: [
      {
        label: 'Dinero ingresado ($)',
        data: [50000, 75000, 30000, 95000], // Datos de muestra de dinero ingresado
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Cantidad de Dinero Ingresado a los Proyectos por Carreras</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoDineroProyectos;
