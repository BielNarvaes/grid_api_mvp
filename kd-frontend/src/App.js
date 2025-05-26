import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registro necessário para evitar erro de escala
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [kdData, setKdData] = useState([]);

  useEffect(() => {
    axios
      .get('https://sturdy-journey-9p97qg95j66hpp6j-4000.app.github.dev/kd/8b3db2d7-bf2a-4a18-88ae-b7f6744569cb')
      .then(res => setKdData(res.data))
      .catch(err => console.error('Erro ao buscar dados:', err));
  }, []);

  const chartData = {
    labels: kdData.map(p => p.name),
    datasets: [
      {
        label: 'K/D',
        data: kdData.map(p => p.kd),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 5,
      },
    ],
  };

  return (
    <div style={{ width: '60%', margin: '50px auto' }}>
      <h2>Gráfico de K/D</h2>
      <Bar key={JSON.stringify(chartData)} data={chartData} />
    </div>
  );
}

export default App;
