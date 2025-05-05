// src/BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const rawData = {
  "2025-02-14 00:00:00": [
    { instrument: "NIFTY", direction: "down", value: 1 },
    { instrument: "DOW JONES", direction: "up", value: 1 },
    { instrument: "S&P 500", direction: "up", value: 2 },
    { instrument: "NASDAQ", direction: "up", value: 2 },
  ],
  "2025-03-07 00:00:00": [
    { instrument: "NIFTY", direction: "up", value: 1 },
    { instrument: "DOW JONES", direction: "down", value: 1 },
    { instrument: "S&P 500", direction: "down", value: 1 },
    { instrument: "NASDAQ", direction: "down", value: 1 },
  ],
  "2025-03-21 00:00:00": [
    { instrument: "NIFTY", direction: "up", value: 1 },
    { instrument: "DOW JONES", direction: "up", value: 1 },
    { instrument: "S&P 500", direction: "up", value: 1 },
    { instrument: "NASDAQ", direction: "up", value: 1 },
  ],
};

const colors = {
  "NIFTY": "#FF6384",
  "DOW JONES": "#36A2EB",
  "S&P 500": "#4BC0C0",
  "NASDAQ": "#9966FF"
};

const instruments = ["NIFTY", "DOW JONES", "S&P 500", "NASDAQ"];
const dates = Object.keys(rawData);

const BarChart = () => {
  const datasets = instruments.map((inst) => ({
    label: inst,
    data: dates.map((date) => {
      const item = rawData[date].find(d => d.instrument === inst);
      return item.direction === 'up' ? item.value : -item.value;
    }),
    backgroundColor: colors[inst],
  }));

  const chartData = {
    labels: dates,
    datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.parsed.y;
            return `${context.dataset.label}: ${val > 0 ? '↑' : '↓'} ${Math.abs(val)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Direction Value'
        }
      }
    }
  };

  return (
    <div style={{ width: '90%', margin: '40px auto' }}>
      <h2>📊 Market Direction (Bar Graph)</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
