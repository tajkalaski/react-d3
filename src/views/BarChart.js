import React, { useState } from "react";
import LayoutTemplate from "../templates/LayoutTemplate";
import BarChart from "./../components/organisms/BarChart";

const BarChartView = () => {
  const array = [12, 20, 21, 28, 36, 26, 47];

  const [data, setData] = useState(array);
  const [color, setColor] = useState("purple");
  return (
    <LayoutTemplate chartType="bar">
      <BarChart data={data} color={color} />
    </LayoutTemplate>
  );
};

export default BarChartView;
