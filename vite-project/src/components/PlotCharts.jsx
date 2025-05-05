// src/PlotChart.jsx
import React from 'react';
import Plot from 'react-plotly.js';

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

const dates = Object.keys(rawData);
const instruments = ["NIFTY", "DOW JONES", "S&P 500", "NASDAQ"];

const traces = instruments.map(inst => ({
  x: dates,
  y: dates.map(date => {
    const item = rawData[date].find(d => d.instrument === inst);
    return item.direction === 'up' ? item.value : -item.value;
  }),
  type: 'scatter',
  mode: 'lines+markers',
  name: inst
}));

export default function PlotChart() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>📊 Plotly Line Chart</h2>
      <Plot
        data={traces}
        layout={{
          title: 'Market Movement',
          yaxis: { title: 'Value' },
          xaxis: { title: 'Date' }
        }}
      />
    </div>
  );
}
