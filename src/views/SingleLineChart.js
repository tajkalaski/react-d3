import React, { useState } from "react";
import SingleLineChart from "./../components/organisms/SingleLineChart";
import LayoutTemplate from "./../templates/LayoutTemplate";
import ChartData from "./../components/organisms/ChartData";

const SingleLineChartView = () => {
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
    <LayoutTemplate chartType="singleline">
      <ChartData onSubmit={updateData} color={color} setColor={setColor} />
      <SingleLineChart data={data} color={color}></SingleLineChart>
    </LayoutTemplate>
  );
};

export default SingleLineChartView;
