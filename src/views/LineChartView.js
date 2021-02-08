import React, { useState } from "react";
import LayoutTemplate from "../templates/LayoutTemplate";
import LineChart from "../components/organisms/LineChart";
import ChartData from "../components/organisms/ChartData";
import DataForm from "../components/molecules/DataForm";

const LineChartView = () => {
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

  // const addData = (evt) => {
  //   evt.preventDefault();
  //   setNewData([...newData, []]);
  // };

  // const handleValueChange = (evt, i) => {
  //   console.log(evt.target.value);
  //   const { value } = evt.target;
  //   const newDataList = [...newData];
  //   newDataList[i] = value;
  //   setNewData(newDataList);
  // };

  return (
    <LayoutTemplate chartType="line">
      <ChartData
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
