export interface HourlyAPIData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  wind_speed_10m: number[];
}

export interface WeatherData {
  hourly: HourlyAPIData;
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    precipitation_probability: string;
    wind_speed_10m: string;
  };
}

export interface FormData {
  zipPostal: string;
  days: string;
  // units: "imperial" | "metric";
}

export interface PreferenceData {
  humidityMin: number;
  humidityMax: number;
  tempMin: number;
  tempMax: number;
}

export interface HourData {
  time: string;
  temp: number;
  humidity: number;
  precipProb: number;
  windSpeed: number;
}

export interface FormattedHourData extends HourData {
  ideal: boolean;
  idealTemp: boolean;
  idealHumidity: boolean;
}

export interface ClusterData {
  begin: string;
  end: string;
  hours: HourData[];
}

export interface ChartPreferenceChangeData {
  [key: string]: number;
}

export interface StateData {
  weather: {
    data: HourData[];
    hourlyUnits: {
      time: string;
      temperature_2m: string;
      relative_humidity_2m: string;
      precipitation_probability: string;
      wind_speed_10m: string;
    };
  };
}
