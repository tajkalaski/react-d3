import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal, axisBottom, scaleLinear, axisLeft, easeLinear } from 'd3'; 
import * as d3 from 'd3'

function App() {
  const array = [
    {
      name: '2020',
      yValues: [10, 20, 25, 30, 25, 45, 35],
      xValues: [10, 20, 30, 40, 50, 60, 70],
      color: '#999AD7'
    },
    {
      name: '2019',
      yValues: [21, 34, 15, 22, 35, 36, 41],
      xValues: [10, 20, 30, 40, 50, 60, 70],
      color: '#EB3472'
    }
  ]
  
  const [data, setData] = useState(array);

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
    console.log(data);

    let xMax = 0;
    let xMin = 0;
    let yMax = 0;
    let yTicks = 0;
    let xTicks = 0;

    data.forEach(dataSet => {
      const tempY = Math.max(...dataSet.yValues);
      const tempX = Math.max(...dataSet.xValues);
      const tempXMin = Math.min(...dataSet.xValues);
      const tempYTicks = dataSet.yValues.length;
      const tempXTicks = dataSet.xValues.length;

      if (tempY > yMax) {
        yMax = tempY;
      }

      if (tempX > xMax) {
        xMax = tempX;
      }

      if (tempYTicks > yTicks) {
        yTicks = tempYTicks
      }

      if (tempXTicks > xTicks) {
        xTicks = tempXTicks;
      }

      if (tempXMin > xMin) {
        xMin = tempXMin;
      }
    })

    const xScale = scaleLinear()
    .domain([xMin, xMax]) 
    .range([0, 600]); // 0px to 300px

    const xAxis = axisBottom(xScale).ticks(xTicks).tickSize(0).tickPadding(15);

    svg
      .select('.x-axis')
      .style('transform', 'translateY(300px)')
      .call(xAxis);

    const yScale = scaleLinear()
      .domain([0, yMax])
      .range([300, 0])
      
    const yAxis = axisLeft(yScale).ticks(yTicks).tickSize(0).tickPadding(15);

    svg.select('.y-axis').call(yAxis);


    const chartLine = line()
    .x(function(d, index) { 
      console.log(d);
      const i = ((index + 1) * xMax / xTicks)
      return (xScale(i)); })
    .y(d => {
      return yScale(d);
    })
    .curve(curveCardinal);

    data.forEach(dataSet => {
      console.log(dataSet);

      const linePath = svg
      .selectAll('.line')
      .data([dataSet.yValues])
      .join('path')
      .attr('d', chartLine)
      .attr('class', `line${dataSet.name}`)
      .attr('fill', 'none')
      .attr('stroke', dataSet.color)
      .attr("stroke-width", 3)

      // const linePathLength = linePath.node().getTotalLength()

      // linePath
      // .attr("stroke-dashoffset", linePathLength)
      // .attr("stroke-dasharray", linePathLength)
      // .transition()
      // .ease(easeLinear)
      // .duration(2000)
      // .attr("stroke-dashoffset", 0);

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

      })
    

    
  
  }, [data])
  return (
    <>
      <h1>React D3 Charts</h1>
      <div class='chart-data'>
        <h2>Chart Data</h2>
        <form onSubmit={updateData}> 
          <label for='data'>Data #1</label>
          <input type='text' name='data'></input>
          <button type='submit'>Create</button>
        </form>
      </div>
      <br></br><br></br>
      <div className='chart'>
        <h2>Chart Preview</h2>
        <svg ref={svgRef}>
          <g className='x-axis'></g>
          <g className='y-axis'></g>
        </svg>
      </div>
      
      
    </>
  );
}


export default App;
