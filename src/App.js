import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { nest } from "d3-collection";
// import {
//   select,
//   line,
//   curveCardinal,
//   axisBottom,
//   scaleLinear,
//   axisLeft,
//   easeLinear,
//   scaleOrdinal,
//   scaleBand,
//   nest,
// } from "d3";

function App() {
  const array = [
    {
      name: "2020",
      x: "Hello",
      y: 12,
      color: "#999AD7",
    },
    {
      name: "2020",
      x: "its me",
      y: 15,
      color: "#999AD7",
    },
    {
      name: "2020",
      x: "Ive been",
      y: 21,
      color: "#999AD7",
    },
    {
      name: "2020",
      x: "wondering",
      y: 34,
      color: "#999AD7",
    },
    {
      name: "2019",
      x: "Hello",
      y: 9,
      color: "#EB3472",
    },
    {
      name: "2019",
      x: "its me",
      y: 12,
      color: "#EB3472",
    },
    {
      name: "2019",
      x: "Ive been",
      y: 31,
      color: "#EB3472",
    },
    {
      name: "2019",
      x: "wondering",
      y: 44,
      color: "#EB3472",
    },
    {
      name: "2019",
      x: "if",
      y: 61,
      color: "#EB3472",
    },
  ];

  const [data, setData] = useState(array);

  const updateData = (evt) => {
    evt.preventDefault();
    const inputData = evt.currentTarget.data.value;
    let updatedData = inputData.split(";").map((dataset) =>
      dataset.split(",").map((item) => {
        return parseInt(item, 10);
      })
    );
    // let updatedData = inputData.split(',').map((item) => {
    //   return parseInt(item, 10);
    //  });
    console.log(updatedData);
  };
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    let xMax = 0;
    let xMin = 0;
    let yMax = 0;
    let yTicks = 0;
    let xTicks = 0;

    data.forEach((dataSet) => {
      // console.log(dataSet);
      const tempY = dataSet.y;
      // const tempX = Math.max(...dataSet.x);
      // const tempXMin = Math.min(...dataSet.x);
      // const tempYTicks = dataSet.yValues.length;
      // const tempXTicks = dataSet.xValues.length;

      if (tempY > yMax) {
        yMax = tempY;
      }

      // if (tempX > xMax) {
      //   xMax = tempX;
      // }

      // if (tempYTicks > yTicks) {
      //   yTicks = tempYTicks;
      // }

      // if (tempXTicks > xTicks) {
      //   xTicks = tempXTicks;
      // }

      // if (tempXMin > xMin) {
      //   xMin = tempXMin;
      // }
    });

    console.log(yMax);

    const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, 600]); // 0px to 300px

    const xScale2 = d3
      .scaleBand()
      .domain(
        data.map((d) => {
          return d.x;
        })
      )
      .range([0, 600])
      .paddingOuter(0)
      .paddingInner(0.3);

    const xAxis = d3.axisBottom(xScale2).tickSize(0).tickPadding(15);

    svg.select(".x-axis").style("transform", "translateY(300px)").call(xAxis);

    const yScale = d3.scaleLinear().domain([0, yMax]).range([300, 0]);

    const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(15);

    svg.select(".y-axis").call(yAxis);

    console.log(data);

    const chartLine = d3
      .line()
      .x(function (d, index) {
        console.log(xScale2(d.x));
        console.log(xScale2.bandwidth() / 2);
        return xScale2(d.x) + xScale2.bandwidth() / 2;
      })
      .y((d) => {
        return yScale(d.y);
      });

    const entries = nest()
      .key((d) => {
        console.log(d);
        return d.name;
      })
      .entries(data);

    console.log(entries);

    var myColor = d3
      .scaleOrdinal()
      .domain(
        data.map((d) => {
          return d.x;
        })
      )
      .range(d3.schemeSet2);

    const linePath = svg
      .selectAll(".line")
      .data(entries)
      .join("path")
      .attr("d", (d) => {
        console.log(d);
        return chartLine(d.values);
      })
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return myColor(d.key);
      })
      .style("stroke-width", 4);

    const dots = svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(entries)
      .enter()
      .append("g")
      .style("fill", function (d) {
        return myColor(d.key);
      })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function (d) {
        return d.values;
      })
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        console.log(xScale2(d.x) + xScale2.bandwidth() / 2);
        return xScale2(d.x) + xScale2.bandwidth() / 2;
      })
      .attr("cy", function (d) {
        return yScale(d.y);
      })
      .attr("r", 5)
      .attr("stroke", "white");
    // const linePathLength = linePath.node().getTotalLength();

    const bars = svg
      .selectAll("myBars")
      .data(entries)
      .enter()
      .append("g")
      .style("fill", function (d) {
        return myColor(d.key);
      })
      .selectAll("myRects")
      .data(function (d) {
        return d.values;
      })
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale2(d.x))
      .attr("y", (d) => yScale(d.y))
      .attr("height", (d) => {
        console.log(yScale(0) - yScale(d.y));
        return yScale(0) - yScale(d.y);
      })
      .attr("width", xScale2.bandwidth())
      .style("opacity", 0.1);
    // linePath
    //   .attr("stroke-dashoffset", linePathLength)
    //   .attr("stroke-dasharray", linePathLength)
    //   .transition()
    //   .ease(d3.easeLinear)
    //   .duration(2000)
    //   .attr("stroke-dashoffset", 0);

    // const tooltip = d3.select("body").append("div")
    // .attr("class", "tooltip")
    // .style('position', 'absolute')
    // .style("opacity", 0)
    // .style('background-color', 'rgb(248, 248, 248, .75)')
    // .style('padding', '10px')
    // .style('border-radius', '5px')
    // .style('color', '#1D1531')
    // .style('font-size', '11px')

    // svg.selectAll(".dot")
    // .data(data)
    // .join("circle")
    // .attr("class", "dot")
    // .attr("cx", chartLine.x())
    // .attr("cy", chartLine.y())
    // .attr("r", 4.5)
    // .attr('stroke', '#999AD7')
    // .attr("stroke-width", 2)
    // .on('mouseover', (event, d) => {
    //   console.log(d);
    //   tooltip
    //   .transition()
    //   .duration(200)
    //   .style("opacity", .9);

    //   tooltip
    //   .text(`Value: ${d}`)
    //   .style("left", (event.pageX) + "px")
    //   .style("top", (event.pageY) + "px");
    // })
    // .on('mouseout', d => {
    //   tooltip.transition() .duration(500) .style("opacity", 0);
    // });
  }, [data]);
  return (
    <>
      <h1>React D3 Charts</h1>
      <div class="chart-data">
        <h2>Chart Data</h2>
        <form onSubmit={updateData}>
          <label for="data">Data #1</label>
          <input type="text" name="data"></input>
          <button type="submit">Create</button>
        </form>
      </div>
      <br></br>
      <br></br>
      <div className="chart">
        <h2>Chart Preview</h2>
        <svg ref={svgRef}>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </svg>
      </div>
    </>
  );
}

export default App;
