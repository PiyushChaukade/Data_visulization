// src/PieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const rawData = {
  "2025-02-14 00:00:00": [
    { "instrument": "NIFTY", "direction": "down", "value": 1 },
    { "instrument": "DOW JONES", "direction": "up", "value": 1 },
    { "instrument": "S&P 500", "direction": "up", "value": 2 },
    { "instrument": "NASDAQ", "direction": "up", "value": 2 }
  ],
  "2025-03-07 00:00:00": [
    { "instrument": "NIFTY", "direction": "up", "value": 1 },
    { "instrument": "DOW JONES", "direction": "down", "value": 1 },
    { "instrument": "S&P 500", "direction": "down", "value": 1 },
    { "instrument": "NASDAQ", "direction": "down", "value": 1 }
  ],
  "2025-03-21 00:00:00": [
    { "instrument": "NIFTY", "direction": "up", "value": 1 },
    { "instrument": "DOW JONES", "direction": "up", "value": 1 },
    { "instrument": "S&P 500", "direction": "up", "value": 1 },
    { "instrument": "NASDAQ", "direction": "up", "value": 1 }
  ]
};

const PieChart = ({ date }) => {
  const dateData = rawData[date];

  const upValue = dateData.filter(item => item.direction === 'up').reduce((sum, item) => sum + item.value, 0);
  const downValue = dateData.filter(item => item.direction === 'down').reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: ['Up Movement', 'Down Movement'],
    datasets: [
      {
        data: [upValue, downValue],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#2A9DF4', '#FF4F74'],
      },
    ],
  };

  return (
    
    <div style={{ width: '30%', margin: '20px', display: 'inline-block' }}>
      <h4>{date}</h4>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
