import React from "react";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "./../atoms/Heading";
import * as d3 from "d3";
import { curveCardinal } from "d3";

const StyledHeading = styled(Heading)`
  text-align: left;
  letter-spacing: -0.5px;
  text-align: left;
  border-bottom: 1px solid #eceded;
  padding: 0px 0px 10px 15px;
`;

const StyledWrapper = styled.div`
  text-align: center;
  width: 700px;
  background: white;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #eceded;
`;

const StyleSVG = styled.svg`
  color: #b9baba;
  width: 600px;
  height: 300px;
  overflow: visible;
  padding: 16px 32px 32px;
  box-sizing: content-box;
`;

const BarChart = ({ data, color }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 600])
      .padding(0.5); // 0px to 300px

    const yMax = Math.max(...data);
    const yScale = d3.scaleLinear().domain([0, yMax]).range([300, 0]);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickSize(0)
      .tickPadding(15);

    svg.select(".x-axis").style("transform", "translateY(300px)").call(xAxis);

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(data.length + 1)
      .tickSize(0)
      .tickPadding(15);

    svg.select(".y-axis").call(yAxis);

    const recs = svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (value, index) => {
        return xScale(index);
      })
      .attr("y", (value) => {
        return yScale(0);
      })
      .attr("height", (d) => {
        return yScale(0) - yScale(0);
      })
      .attr("width", xScale.bandwidth())
      .attr("fill", color)
      .transition()
      .duration(800)
      .attr("y", function (value) {
        return yScale(value);
      })
      .attr("height", function (d) {
        return yScale(0) - yScale(d);
      })
      .delay(function (d, i) {
        console.log(i);
        return i * 100;
      });
  }, [data]);
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
