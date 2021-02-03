import React, { useState } from "react";
import LayoutTemplate from "../templates/LayoutTemplate";
import BarChart from "./../components/organisms/BarChart";
import ChartData from "./../components/organisms/ChartData";

const BarChartView = () => {
  const array = [12, 20, 21, 28, 36, 26, 47];

  const [data, setData] = useState(array);
  const [color, setColor] = useState("purple");

  const updateData = (evt) => {
    evt.preventDefault();
    const inputData = evt.currentTarget.data.value;
    let updatedData = inputData.split(",").map(Number);
    setData(updatedData);
  };

  return (
    <LayoutTemplate chartType="bar">
      <ChartData onSubmit={updateData} color={color} setColor={setColor} />
      <BarChart data={data} color={color} />
    </LayoutTemplate>
  );
};

export default BarChartView;
