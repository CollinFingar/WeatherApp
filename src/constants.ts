export const COLORS = {
  background: "#2e333b",
  text1: "white",
  chart: {
    label: "#bbb",
  },
  highlight: "#00c19d",
  form: "#222",
  temp: "#eaac82",
  humidity: "#6fccdb",
};

export const SPACING = {
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "48px",
};

export const BREAKPOINTS = {
  lg: "800px",
};

// TODO add wind and precipitation data to the chart
// export const WIND_THRESHOLD = 10;
// export const PRECIP_THRESHOLD = 40;

export const DEFAULT_PREFERENCES = {
  imperial: {
    humidityMin: 50,
    humidityMax: 70,
    tempMin: 50,
    tempMax: 70,
  },
  metric: {
    humidityMin: 50,
    humidityMax: 70,
    tempMin: 10,
    tempMax: 21,
  },
};
