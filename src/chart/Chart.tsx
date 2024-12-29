import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import {
  HourData,
  PreferenceData,
  FormattedHourData,
  ClusterData,
  ChartPreferenceChangeData,
  StateData,
} from "../types";

import {
  ChartWrapper,
  HumidityWrapper,
  InputWrapper,
  TempWrapper,
  IdealHourWrapper,
  IdealDateWrapper,
  IdealTimesWrapper,
  IdealTempWrapper,
  IdealClusterWrapper,
  DataWrapper,
} from "./Chart.style";
import LineChart from "./components/LineChart";

import {
  getAverage,
  formatDate,
  formatTime,
  formatClusterIndex,
} from "../utils";

import { DEFAULT_PREFERENCES } from "../constants";

const Chart = () => {
  const apiData = useSelector((state: StateData) => state.weather.data);
  // const unitType = useSelector((state: StateData) => state.weather.unitType);
  // const [units, setUnits] = useState("imperial");

  const [preferenceData, setPreferenceData] = useState<PreferenceData>(
    DEFAULT_PREFERENCES["imperial"]
  );

  const [highlightCluster, setHighlightCluster] = useState("");

  // TODO: Add unit preference types
  // useEffect(() => {
  //   if (unitType !== units) {
  //     setUnits(unitType);

  //     setPreferenceData(
  //       unitType === "imperial"
  //         ? DEFAULT_PREFERENCES.imperial
  //         : DEFAULT_PREFERENCES.metric
  //     );
  //   }
  // }, [unitType]);

  // Format the idea based on the preference data
  const formattedData: FormattedHourData[] = useMemo(() => {
    const data = apiData?.length
      ? apiData.map((hourData: HourData) => {
          const idealTemp =
            hourData.temp >= preferenceData.tempMin &&
            hourData.temp <= preferenceData.tempMax;
          const idealHumidity =
            hourData.humidity >= preferenceData.humidityMin &&
            hourData.humidity <= preferenceData.humidityMax;
          return {
            ideal: idealTemp && idealHumidity,
            idealTemp,
            idealHumidity,
            ...hourData,
          };
        })
      : [];
    return data;
  }, [apiData, preferenceData]);

  // Determine "clusters" of ideal weather
  const clusterData = useMemo(() => {
    const data: ClusterData[] = [];
    let idealBegin = "";
    let idealEnd = "";
    let idealArr: HourData[] = [];
    formattedData.forEach((hour: FormattedHourData) => {
      if (hour.ideal) {
        if (!idealBegin) {
          idealBegin = hour.time;
        } else if (hour.time.includes("00:00")) {
          data.push({
            begin: idealBegin,
            end: idealEnd.replace("23:00", "23:59:59"),
            hours: idealArr,
          });
          idealArr = [];
          idealBegin = hour.time;
        }
        idealArr.push(hour);
        idealEnd = hour.time;
      } else {
        if (idealBegin) {
          data.push({
            begin: idealBegin,
            end: hour.time,
            hours: idealArr,
          });
          idealBegin = "";
          idealEnd = "";
          idealArr = [];
        }
      }
    });
    if (idealBegin) {
      data.push({
        begin: idealBegin,
        end: idealEnd,
        hours: idealArr,
      });
    }
    return data;
  }, [formattedData]);

  // Update the preferences based on the four input fields
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changes: ChartPreferenceChangeData = {};

    const { name } = e.target;
    const { value } = e.target;

    let newValue = +value;

    if (name === "humidityMin") {
      if (newValue > 100) {
        newValue = 100;
      }
    } else if (name === "humidityMax") {
      if (newValue < 0) {
        newValue = 0;
      }
    }
    changes[name] = +newValue;
    setPreferenceData((prevState: PreferenceData) => ({
      ...prevState,
      ...changes,
    }));
  };

  // Construct a table for eligible times based on preferences
  const eligibleTimes = useMemo(() => {
    let currentDate: string;
    if (!clusterData.length) {
      return <></>;
    }
    return (
      <IdealClusterWrapper>
        <h3>Eligible Times:</h3>
        {clusterData.map((cluster: ClusterData, i: number) => {
          const date = new Date(cluster.begin);
          const endTime = new Date(cluster.end);
          const showDate = currentDate !== formatDate(date);
          if (showDate) {
            currentDate = formatDate(date);
          }
          const id = formatClusterIndex(cluster);
          return (
            <IdealHourWrapper
              key={cluster.begin}
              even={i % 2 === 0}
              id={id}
              highlight={id === highlightCluster}
            >
              <IdealDateWrapper>
                {showDate ? formatDate(date) : null}
              </IdealDateWrapper>
              <IdealTimesWrapper>
                <span>
                  {formatTime(date)}
                  {" - "}
                </span>
                <span>{formatTime(endTime)}</span>
              </IdealTimesWrapper>

              <IdealTempWrapper>
                <div>AVG:</div>
                <div>{getAverage(cluster.hours, "temp")}°F</div>
                <div>{getAverage(cluster.hours, "humidity")}%</div>
              </IdealTempWrapper>
            </IdealHourWrapper>
          );
        })}
      </IdealClusterWrapper>
    );
  }, [clusterData, highlightCluster]);

  const lineChartClickHandler = (cluster: ClusterData) => {
    const clusterIndex = formatClusterIndex(cluster);
    setHighlightCluster(clusterIndex);
    document.getElementById(clusterIndex)?.scrollIntoView();
  };

  return (
    <ChartWrapper>
      <LineChart
        data={formattedData}
        clusterData={clusterData}
        clickHandler={lineChartClickHandler}
      />
      <DataWrapper>
        {eligibleTimes}
        {formattedData.length ? (
          <div>
            <h3>Preferences:</h3>
            <form>
              <TempWrapper>
                <h3>Temperature</h3>
                <InputWrapper>
                  <div>
                    <label>Min:</label>
                    <input
                      type="number"
                      name="tempMin"
                      value={preferenceData.tempMin}
                      onChange={handlePreferenceChange}
                    />
                  </div>
                  <div>
                    <label>Max:</label>
                    <input
                      type="number"
                      name="tempMax"
                      value={preferenceData.tempMax}
                      onChange={handlePreferenceChange}
                    />
                  </div>
                </InputWrapper>
              </TempWrapper>
              <HumidityWrapper>
                <h3>Humidity</h3>
                <InputWrapper>
                  <div>
                    <label>Min:</label>
                    <input
                      type="number"
                      name="humidityMin"
                      min="0"
                      max="100"
                      value={preferenceData.humidityMin}
                      onChange={handlePreferenceChange}
                    />
                  </div>
                  <div>
                    <label>Max:</label>
                    <input
                      type="number"
                      name="humidityMax"
                      min="0"
                      max="100"
                      value={preferenceData.humidityMax}
                      onChange={handlePreferenceChange}
                    />
                  </div>
                </InputWrapper>
              </HumidityWrapper>
            </form>
          </div>
        ) : null}
      </DataWrapper>
    </ChartWrapper>
  );
};
export default Chart;
