import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lookup } from "zipcodes";
import { lookup as lookupTz } from "zipcode-to-timezone";
import {
  HourlyAPIData,
  WeatherData,
  FormData,
  // PreferenceData,
  HourData,
} from "../../types";

const unitMap = {
  imperial: {
    speed: "&wind_speed_unit=mph",
    amount: "&precipitation_unit=inch",
    temp: "&temperature_unit=fahrenheit",
  },
  metric: {
    speed: "",
    amount: "",
    temp: "",
  },
};
/**
 * Returns data formatted to be ingested by the UI
 *
 * @returns {object as WeatherData}
 */
const formatData = (hourly: HourlyAPIData): HourData[] => {
  return hourly.time.map((time, i) => {
    return {
      time: time,
      temp: hourly.temperature_2m[i],
      humidity: hourly.relative_humidity_2m[i],
      precipProb: hourly.precipitation_probability[i],
      windSpeed: hourly.wind_speed_10m[i],
    };
  });
};

/**
 * Retrieves the weather data from Open Meteo
 *
 * @returns {object as WeatherData}
 */
export const fetchWeatherData = createAsyncThunk(
  "get/fetchWeatherData",
  async (formData: FormData) => {
    const { zipPostal, days } = formData;

    // TODO: add support for metric units
    // const useUnits = unitMap[units];
    const useUnits = unitMap.imperial;

    const zipData = lookup(zipPostal);
    const zipTz = lookupTz(zipPostal) || "America%2FNew_York"; // Default ET time

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${zipData?.latitude}&longitude=${zipData?.longitude}` +
        `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,` +
        `wind_speed_10m${useUnits.temp}${useUnits.speed}` +
        `${useUnits.amount}&timezone=${encodeURIComponent(
          zipTz
        )}&forecast_days=${days}`
    );
    return (await response.json()) as WeatherData;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: <HourData[]>[],
    hourlyUnits: {},
    // unitType: "imperial",
  },
  reducers: {
    setUnitType: (state, action) => {
      // state.unitType = action.payload;
    },
  },
  // Adds a reducer for the above thunk action
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.data = formatData(action.payload.hourly);
      state.hourlyUnits = action.payload.hourly_units;
    });
  },
});
export const { setUnitType } = weatherSlice.actions;

export default weatherSlice.reducer;
