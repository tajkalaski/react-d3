import React from "react";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import Heading from "../atoms/Heading";
import * as d3 from "d3";
import { curveCardinal } from "d3";
import expandIcon from "./../../assets/expand.svg";
import minimizeIcon from "./../../assets/minimize.svg";
import ButtonIcon from "./../atoms/ButtonIcon";

const StyledHeading = styled(Heading)`
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

const StyledHeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eceded;
`;
const StyledIcon = styled(ButtonIcon)`
  background-color: white;
`;

const StyleSVG = styled.svg`
  color: #b9baba;
  width: 800px;
  height: 450px;
  overflow: visible;
  padding: 32px 32px 48px 32px;
  box-sizing: content-box;
`;

const LineChart = ({ data, colors, show, onShow, onHide, name }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    console.log(show);

    d3.select("svg").selectAll("*").remove();

    console.log(svgRef);

    let yMax = 0;
    let xTicks = 0;

    data.forEach((dataSet) => {
      const tempY = Math.max(...dataSet);
      const tempXTicks = dataSet.length - 1;

      if (tempY > yMax) yMax = tempY;
      if (tempXTicks > xTicks) xTicks = tempXTicks;
    });

    const xScale = d3.scaleLinear().domain([0, xTicks]).range([0, 800]);
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

    const chartLine = d3
      .line()
      .x((value, index) => {
        return xScale(index);
      })
      .y(yScale)
      .curve(curveCardinal);

    data.forEach((dataSet, index) => {
      const linePath = svg
        .selectAll(".line")
        .data([dataSet])
        .join("path")
        .attr("d", chartLine)
        .attr("class", `line${index}`)
        .attr("fill", "none")
        .attr("stroke", colors[index])
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
        .data(dataSet)
        .join("circle")
        .attr("class", `dots${index}`)
        .attr("cx", chartLine.x())
        .attr("cy", chartLine.y())
        .attr("r", 4.5)
        .attr("stroke", colors[index])
        .attr("fill", "white")
        .attr("stroke-width", 2)
        .on("mouseover", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .text(`Value: ${d}`)
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");
        })
        .on("mouseout", (d) => {
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });
  }, [data, colors]);
  return (
    <>
      <StyledWrapper>
        <StyledHeadingWrapper>
          <StyledHeading>Chart Preview</StyledHeading>
          <StyledIcon
            onClick={show ? onHide : onShow}
            icon={show ? minimizeIcon : expandIcon}
          />
        </StyledHeadingWrapper>
        <StyleSVG ref={svgRef}>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </StyleSVG>
      </StyledWrapper>
    </>
  );
};

export default LineChart;
