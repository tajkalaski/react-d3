import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal, axisBottom, scaleLinear, axisLeft, easeLinear } from 'd3'; 
import * as d3 from 'd3'

function App() {
  const [data, setData] = useState([10, 20, 25, 30, 25, 45, 35]);
  
  const updateData = evt => {
    evt.preventDefault();
    const inputData = evt.currentTarget.data.value;
    let updatedData = inputData.split(';').map(dataset => dataset.split(',').map((item) => { return parseInt(item, 10)}))
    // let updatedData = inputData.split(',').map((item) => {
    //   return parseInt(item, 10);
    //  });
    console.log(updatedData);
  }
  const svgRef = useRef();

  
  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1]) 
      .range([0, 600]); // 0px to 300px

    const yMax = Math.max(...data);
    const yScale = scaleLinear()
      .domain([0, yMax])
      .range([300, 0])

    
    const xAxis = axisBottom(xScale).ticks(data.length).tickSize(0).tickPadding(15);

    svg
      .select('.x-axis')
      .style('transform', 'translateY(300px)')
      .call(xAxis);

    const yAxis = axisLeft(yScale).ticks(data.length + 1).tickSize(0).tickPadding(15);

    svg.select('.y-axis').call(yAxis);

    const chartLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);


    const linePath = svg
    .selectAll('.line')
    .data([data])
    .join('path')
    .attr('d', chartLine)
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', '#999AD7')
    .attr("stroke-width", 3)

    const linePathLength =linePath.node().getTotalLength()

    linePath
    .attr("stroke-dashoffset", linePathLength)
    .attr("stroke-dasharray", linePathLength)
    .transition()
    .ease(easeLinear)
    .duration(2000)
    .attr("stroke-dashoffset", 0);

    const tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")     
    .style('position', 'absolute')          
    .style("opacity", 0)
    .style('background-color', 'rgb(248, 248, 248, .75)')
    .style('padding', '10px')
    .style('border-radius', '5px')
    .style('color', '#1D1531')
    .style('font-size', '11px')

    svg.selectAll(".dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", chartLine.x())
    .attr("cy", chartLine.y())
    .attr("r", 4.5)
    .attr('stroke', '#999AD7')
    .attr("stroke-width", 2)
    .on('mouseover', (event, d) => {  
      console.log(d);
      tooltip
      .transition()
      .duration(200)
      .style("opacity", .9);    


      tooltip
      .text(`Value: ${d}`)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY) + "px");
    })
    .on('mouseout', d => {
      tooltip.transition() .duration(500) .style("opacity", 0);
    });

  
  }, [data])
  return (
    <>
      <h1>React D3 Charts</h1>
      <form onSubmit={updateData}> 
        <input type='text' name='data'></input>
        <button type='submit'>Create</button>
      </form>
      <br></br><br></br>
      <svg ref={svgRef}>
        <g className='x-axis'></g>
        <g className='y-axis'></g>
      </svg>
      
    </>
  );
}


export default App;
