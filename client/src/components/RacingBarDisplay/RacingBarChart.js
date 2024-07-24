import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear } from "d3";
import ResizedObserver from "./ResizedObserver";

function RacingBarChart({ data }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = ResizedObserver(wrapperRef);
  
    // will be called initially and on every data change
    useEffect(() => {
      const svg = select(svgRef.current);
      if (!dimensions) return;

      const maxTotalWins = data.length > 0 ? data[0].totalWins : 0;
  
      const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(data.map((value, index) => index)) // [0,1,2,3,4,5]
        .range([0, dimensions.height]); 
  
      const xScale = scaleLinear() 
        .domain([0, maxTotalWins]) 
        .range([0, dimensions.width]); 
  
      // draw the bars
      svg
        .selectAll(".bar")
        .data(data, (entry, index) => entry.franchiseName)
        .join(enter =>
          enter.append("rect").attr("y", (entry, index) => yScale(index))
          .attr("fill", entry => entry.colour) 
        )       
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", yScale.bandwidth())
        .transition()
        .attr("width", entry => xScale(entry.totalWins))
        .attr("y", (entry, index) => yScale(index));
  
      // draw the labels
      svg
        .selectAll(".label")
        .data(data, (entry, index) => entry.franchiseName)
        .join(enter =>
          enter
            .append("text")
            .attr(
              "y",
              (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
            )
        )
        .text(entry => `${entry.franchiseName} (${entry.totalWins} wins)`)
        .attr("class", "label")
        .attr("x", 10)
        .transition()
        .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
    }, [data, dimensions]);
  
    return ( 
      <div ref={wrapperRef} style={{ marginBottom: "2rem", width: "1200px", height: "300px"}}>
      <svg ref={svgRef} width={dimensions ? dimensions.width : 0} height={dimensions ? dimensions.height : 0}></svg>
    </div>
    );
  }
  
  export default RacingBarChart;