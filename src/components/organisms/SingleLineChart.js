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

const SingleLineChart = ({ data, color }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 600]); // 0px to 300px

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

    const chartLine = d3
      .line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    const linePath = svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", chartLine)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 3);

    const linePathLength = linePath.node().getTotalLength();

    linePath
      .attr("stroke-dashoffset", linePathLength)
      .attr("stroke-dasharray", linePathLength)
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("stroke-dashoffset", 0);

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

    svg
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", chartLine.x())
      .attr("cy", chartLine.y())
      .attr("r", 4.5)
      .attr("stroke", color)
      .attr("fill", "white")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
        console.log(d);
        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .text(`Value: ${d}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px");
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(500).style("opacity", 0);
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

export default SingleLineChart;
