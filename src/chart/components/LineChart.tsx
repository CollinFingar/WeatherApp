import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { format } from "date-fns";

import {
  FormattedHourData,
  ClusterData,
  HourData,
  StateData,
} from "../../types";
import { getDate } from "../../utils";

import { LineChartWrapper } from "./LineChart.style";

interface LineChartProps {
  data: FormattedHourData[];
  clusterData: ClusterData[];
  clickHandler: Function;
}

const LineChart = ({ data, clusterData, clickHandler }: LineChartProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const units = useSelector((state: StateData) => state.weather.hourlyUnits);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (data.length) {
      d3.selectAll("svg > *").remove();

      // Sizes around the SVG Element
      const elWidth = ref?.current?.getBoundingClientRect().width || 800;
      const margin = { top: 25, right: 25, bottom: 25, left: 75 },
        width = elWidth - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Bounds for the X Scale
      const xBounds = [
        getDate(data[0].time),
        getDate(data[data.length - 1].time),
      ];

      // Set up the scales
      const xScale = d3.scaleTime().range([0, width]).domain(xBounds);
      const yHumidityScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
      const yTempScale = d3
        .scaleLinear()
        .domain([
          Math.round((d3.min(data, (d) => d.temp) || 0) - 5),
          Math.round((d3.max(data, (d) => d.temp) || 100) + 5),
        ])
        .range([height, 0]);

      // Line generator for the humidity data
      const lineHumidityGenerator = d3
        .line<HourData>()
        .x((d) => xScale(getDate(d.time)))
        .y((d) => yHumidityScale(d.humidity));

      // Line generator for the temp data
      const lineTempGenerator = d3
        .line<HourData>()
        .x((d) => xScale(getDate(d.time)))
        .y((d) => yTempScale(d.temp));

      // Add bars representing the ideal heat/humidity  time clusters
      svg
        .selectAll(".idealBar")
        .data(clusterData)
        .enter()
        .append("rect")
        .attr("class", "idealBar")
        .attr("x", (d) => {
          return xScale(getDate(d.begin));
        })
        .attr("y", () => {
          return 0;
        })
        .attr("width", (d) => xScale(getDate(d.end)) - xScale(getDate(d.begin)))
        .attr("height", () => {
          return height;
        })
        .on("click", (e, d) => {
          clickHandler(d);
        });

      // Add the humidity data line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", lineHumidityGenerator);

      // Add the temp data line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", lineTempGenerator);

      // Format the X Axis Ticks
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(5)
        .tickFormat((d) => {
          const date = new Date(d as number);
          if (date.getHours() === 0) {
            return format(date, "MM/dd");
          }
          return format(date, "HH:mm");
        });

      // Format both Y Axis Ticks
      const yHumidityAxis = d3
        .axisLeft(yHumidityScale)
        .ticks(5)
        .tickFormat((d) => `${d}${units?.relative_humidity_2m}`);
      const yTempAxis = d3
        .axisLeft(yTempScale)
        .ticks(8)
        .tickFormat((d) => `${d}${units?.temperature_2m}`);

      // Add and move the Axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .classed("x-axis", true)
        .call(xAxis);
      svg
        .append("g")
        .attr("transform", `translate(0,0)`)
        .call(yTempAxis)
        .classed("y-temp-axis", true);
      svg
        .append("g")
        .attr("transform", `translate(-40,0)`)
        .call(yHumidityAxis)
        .classed("y-humidity-axis", true);

      d3.selectAll(".x-axis text")
        .filter((d) => {
          const date = new Date(d as number);
          return date.getHours() === 0;
        })
        .classed("date-text", true);
    }
  }, [data, clusterData, windowSize]);

  return (
    <LineChartWrapper>
      <svg
        width="100%"
        height={data.length ? 400 : 0}
        id="linechart"
        ref={ref}
      />
    </LineChartWrapper>
  );
};
export default LineChart;
