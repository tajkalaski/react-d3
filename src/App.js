import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import Heading from "./components/atoms/Heading";
import Paragraph from "./components/atoms/Paragraph";
import Button from "./components/atoms/Button";
import DataInput from "./components/atoms/DataInput";
import ColorListItem from "./components/atoms/ColorListItem";
import GlobalStyle from "./theme/GlobalStyle";
import styled from "styled-components";
import checkedIcon from "./assets/tick.svg";
import * as d3 from "d3";
import { curveCardinal } from "d3";

const StyledHeading = styled(Heading)`
  text-align: left;
  letter-spacing: -0.5px;
  text-align: left;
  border-bottom: 1px solid #eceded;
  padding: 0px 0px 10px 15px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled(DataInput)`
  width: 75%;
`;

function App() {
  const array = [12, 20, 21, 28, 36, 26, 47];

  const [data, setData] = useState(array);
  const [color, setColor] = useState("purple");

  const updateData = (evt) => {
    evt.preventDefault();
    console.log(evt.currentTarget.data.value);
    const inputData = evt.currentTarget.data.value;
    let updatedData = inputData.split(",").map(Number);
    console.log(updatedData);

    setData(updatedData);
  };

  const handleColorChange = (event, color) => {
    // console.log(event);
    event.target.classList.add("active");
    setColor(theme[color].normal);
  };
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
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Heading big>Charts</Heading>
        <div className="chart-data">
          <StyledHeading>Chart Data</StyledHeading>
          <form className="data-form" onSubmit={updateData}>
            <Paragraph>Values...</Paragraph>
            <StyledInputWrapper>
              <StyledInput
                placeholder="Type your values..."
                type="text"
                name="data"
              ></StyledInput>
              <div className="color-input">
                <ul class="colors">
                  <ColorListItem
                    color="blue"
                    icon={checkedIcon}
                    onClick={(e) => handleColorChange(e, "blue")}
                    className={color === theme.blue.normal ? "active" : ""}
                  ></ColorListItem>
                  <ColorListItem
                    color="orange"
                    icon={checkedIcon}
                    onClick={(e) => handleColorChange(e, "orange")}
                    className={color === theme.orange.normal ? "active" : ""}
                  ></ColorListItem>
                  <ColorListItem
                    color="red"
                    icon={checkedIcon}
                    onClick={(e) => handleColorChange(e, "red")}
                    className={color === theme.red.normal ? "active" : ""}
                  ></ColorListItem>
                  <ColorListItem
                    color="green"
                    icon={checkedIcon}
                    onClick={(e) => handleColorChange(e, "green")}
                    className={color === theme.green.normal ? "active" : ""}
                  ></ColorListItem>
                  <ColorListItem
                    color="grey"
                    icon={checkedIcon}
                    onClick={(e) => handleColorChange(e, "grey")}
                    className={color === theme.grey.normal ? "active" : ""}
                  ></ColorListItem>
                </ul>
              </div>
            </StyledInputWrapper>
            <Button tyle="submit">Create</Button>
          </form>
        </div>
        <div className="chart">
          <StyledHeading>Chart Preview</StyledHeading>
          <svg ref={svgRef}>
            <g className="x-axis"></g>
            <g className="y-axis"></g>
          </svg>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
