import React, { useState } from "react";
import LayoutTemplate from "../templates/LayoutTemplate";
import BarChart from "../components/organisms/BarChart";
import ChartData from "../components/organisms/ChartData";

const BarChartView = () => {
  const array = [
    [12, 20, 21, 28, 36, 26, 47],
    [15, 34, 72, 99, 101, 102],
  ];

  const [data, setData] = useState(array);
  // const [newData, setNewData] = useState([]);
  const [colors, setColors] = useState(["purple", "blue"]);
  const updateData = (evt, newData) => {
    evt.preventDefault();
    console.log("actual data hook passed to the chart", newData);
    // console.log(evt.currentTarget.data.value);
    // const inputData = evt.currentTarget.data.value;
    // let updatedData = inputData.split(",").map(Number);
    // console.log(updatedData);
    setData(newData);
  };

  const updateColors = (color, i) => {
    let updatedColors = [...colors];
    updatedColors[i] = color;
    setColors(updatedColors);
  };

  return (
    <LayoutTemplate chartType="bar">
      <ChartData
        onSubmit={updateData}
        data={data}
        color={colors}
        setColor={updateColors}
      />
      <BarChart data={data} colors={colors} />
    </LayoutTemplate>
  );
};

export default BarChartView;
