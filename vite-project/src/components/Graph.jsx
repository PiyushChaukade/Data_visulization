// src/Graph.jsx
import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';

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

const Graph = () => {
  const graphRef = useRef(null);

  useEffect(() => {
  
    const nodes = [];
    const edges = [];

    const instruments = ["NIFTY", "DOW JONES", "S&P 500", "NASDAQ"];
    const dates = Object.keys(rawData);

  
    instruments.forEach((inst, index) => {
      nodes.push({ id: index + 1, label: inst, group: 'instruments' });
    });

 
    dates.forEach((date, index) => {
      nodes.push({ id: index + 100, label: date, group: 'dates' });
    });

 
    dates.forEach((date, dateIndex) => {
      rawData[date].forEach((item) => {
        const instrumentIndex = instruments.indexOf(item.instrument) + 1;
        const dateNodeIndex = dateIndex + 100;
        edges.push({
          from: dateNodeIndex,
          to: instrumentIndex,
          label: item.direction === 'up' ? '↑' : '↓',
          color: item.direction === 'up' ? 'green' : 'red',
        });
      });
    });

    // Initialize the network graph
    const data = { nodes, edges };
    const options = {
      groups: {
        instruments: {
          color: { background: 'lightblue' },
        },
        dates: {
          color: { background: 'lightgreen' },
        }
      },
      edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.5 } }
      },
    };

    new Network(graphRef.current, data, options);
  }, []);

  return (
    <div>
      <h2>Market Instrument Movements (Graph View)</h2>
      <div ref={graphRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default Graph;
