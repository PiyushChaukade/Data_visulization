import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';
import AmChart from './components/AmCharts';
import PlotChart from './components/PlotCharts';
import Graph from './components/Graph';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);
import PieChart from './components/PieChart';

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

const instruments = ["NIFTY", "DOW JONES", "S&P 500", "NASDAQ"];
const dates = Object.keys(rawData);

const transformValue = ({ direction, value }) =>
  direction === "up" ? value : -value;

const colors = {
  "NIFTY": "red",
  "DOW JONES": "blue",
  "S&P 500": "green",
  "NASDAQ": "purple"
};

const datasets = instruments.map((instrument) => ({
  label: instrument,
  data: dates.map((date) => {
    const entry = rawData[date].find(item => item.instrument === instrument);
    return transformValue(entry);
  }),
  borderColor: colors[instrument],
  backgroundColor: colors[instrument],
  tension: 0.3,
  fill: false
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
      title: {
        display: true,
        text: 'Direction Value'
      }
    }
  }
};

export default function App() {
  return (
    <div style={{ width: '80%', margin: '40px auto' }}>
      <h2>📈 Chart.js Line Chart</h2>
      <Line data={chartData} options={options} />

      <h2 style={{ marginTop: '60px' }}>📊 amCharts 5 Visualization</h2>
      <AmChart />
      <PlotChart/>
      <Graph/>
      <h2>📊 Market Movement (Pie Chart)</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {dates.map((date) => (
          <PieChart key={date} date={date} />
        ))}
      </div>
    </div>
  );
}
