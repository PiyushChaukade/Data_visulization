// src/AmChart.jsx
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const rawData = {
  "2025-02-14 00:00:00": [
    { instrument: "NIFTY", direction: "down", value: 1 },
    { instrument: "DOW JONES", direction: "up", value: 1 },
    { instrument: "S&P 500", direction: "up", value: 2 },
    { instrument: "NASDAQ", direction: "up", value: 2 }
  ],
  "2025-03-07 00:00:00": [
    { instrument: "NIFTY", direction: "up", value: 1 },
    { instrument: "DOW JONES", direction: "down", value: 1 },
    { instrument: "S&P 500", direction: "down", value: 1 },
    { instrument: "NASDAQ", direction: "down", value: 1 }
  ],
  "2025-03-21 00:00:00": [
    { instrument: "NIFTY", direction: "up", value: 1 },
    { instrument: "DOW JONES", direction: "up", value: 1 },
    { instrument: "S&P 500", direction: "up", value: 1 },
    { instrument: "NASDAQ", direction: "up", value: 1 }
  ]
};

const instruments = ["NIFTY", "DOW JONES", "S&P 500", "NASDAQ"];
const dates = Object.keys(rawData);

export default function AmChart() {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "date",
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const chartData = dates.map((date) => {
      const entry = { date };
      rawData[date].forEach(({ instrument, direction, value }) => {
        entry[instrument] = direction === "up" ? value : -value;
      });
      return entry;
    });

    instruments.forEach((instrument) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: instrument,
          xAxis,
          yAxis,
          valueYField: instrument,
          categoryXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{name}: {valueY}"
          })
        })
      );
      series.strokes.template.set("strokeWidth", 2);
      series.data.setAll(chartData);
    });

    xAxis.data.setAll(chartData);
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    chart.set("legend", am5.Legend.new(root, {}));

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px", marginTop: "40px" }} />;
}
