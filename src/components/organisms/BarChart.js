import React from "react";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import Heading from "./../atoms/Heading";
import * as d3 from "d3";

const StyledHeading = styled(Heading)`
  border-bottom: 1px solid #eceded;
  text-align: left;
`;

const StyledWrapper = styled.div`
  text-align: center;
  width: 75%;
  min-width: 900px;
  background: white;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #eceded;
`;

const StyleSVG = styled.svg`
  color: #b9baba;
  width: 800px;
  height: 450px;
  overflow: visible;
  padding: 32px 32px 48px 32px;
  box-sizing: content-box;
`;

const BarChart = ({ data, colors }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    d3.select("svg").selectAll("*").remove();

    let yMax = 0;
    let xMax = [];
    let xTicks = 0;
    const setNr = data.length;

    data.forEach((dataSet) => {
      const tempY = Math.max(...dataSet);
      const tempXTicks = dataSet.length - 1;

      const tempX = dataSet.map((n, i) => {
        return i;
      });

      if (tempX.length > xMax.length) xMax = tempX;
      if (tempY > yMax) yMax = tempY;
      if (tempXTicks > xTicks) xTicks = tempXTicks;
    });

    const xScale = d3.scaleBand().domain(xMax).range([0, 800]).padding(0.5); // 0px to 300px

    const yScale = d3
      .scaleLinear()
      .domain([0, yMax + 5])
      .range([450, 0]);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(xTicks)
      .tickSize(0)
      .tickPadding(15);

    svg
      .append("g")
      .attr("class", "x axis")
      .style("transform", "translateY(450px)")
      .call(xAxis);

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(xTicks + 1)
      .tickSize(0)
      .tickPadding(15);

    svg.append("g").attr("class", "y axis").call(yAxis);

    data.forEach((dataSet, i) => {
      const recs = svg
        .selectAll(".bar")
        .data(dataSet)
        .join("rect")
        .attr("class", `bar${i}`)
        .attr("x", (value, index) => {
          return xScale(index) + (xScale.bandwidth() / setNr) * i;
        })
        .attr("y", yScale(0))
        .attr("height", (d) => {
          return yScale(0) - yScale(0);
        })
        .attr("width", xScale.bandwidth() / setNr)
        .attr("fill", colors[i])
        .on("mouseover", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .text(`Value: ${d}`)
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");
        })
        .on("mouseout", (d) => {
          tooltip.transition().duration(500).style("opacity", 0);
        })
        .transition()
        .duration(800)
        .attr("y", function (value) {
          return yScale(value);
        })
        .attr("height", function (d) {
          return yScale(0) - yScale(d);
        })
        .delay(function (d, i) {
          return i * 100;
        });

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("opacity", 0)
        .style("background-color", "rgb(248, 248, 248, .75)")
        .style("padding", "10px")
        .style("border-radius", "5px")
        .style("color", "#1D1531")
        .style("font-size", "11px");
    });
  }, [data, colors]);
  return (
    <>
      <StyledWrapper>
        <StyledHeading>Chart Preview</StyledHeading>
        <StyleSVG ref={svgRef}>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </StyleSVG>
      </StyledWrapper>
    </>
  );
};

export default BarChart;
