import React, { useState } from "react";
import LayoutTemplate from "../templates/LayoutTemplate";
import LineChart from "../components/organisms/LineChart";
import ChartData from "../components/organisms/ChartData";

const LineChartView = () => {
  const array = [
    [12, 20, 21, 28, 36, 26, 47],
    [15, 34, 72, 99, 101, 102],
  ];

  const [data, setData] = useState(array);
  const [colors, setColors] = useState([
    "hsl(206, 64%, 63%)",
    "hsl(24, 100%, 67%)",
  ]);

  const updateData = (evt, newData) => {
    evt.preventDefault();
    setData(newData);
  };

  const updateColors = (color, i) => {
    let updatedColors = [...colors];
    updatedColors[i] = color;
    setColors(updatedColors);
  };

  return (
    <LayoutTemplate chartType="line">
      <ChartData
        chartType="line"
        onSubmit={updateData}
        data={data}
        color={colors}
        setColor={updateColors}
      />
      <LineChart data={data} colors={colors} />
    </LayoutTemplate>
  );
};

export default LineChartView;
