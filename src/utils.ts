import { format } from "date-fns";
import { HourData } from "./types";

// Return the date from a date string
export const getDate = (dateStr: string): Date => {
  return new Date(dateStr);
};

// Get the average temperature or humidity over an array
export const getAverage = (hourArr: HourData[], property: string) => {
  let value = 0;
  hourArr.forEach((hour: any) => {
    value += hour[property];
  });
  return Math.round(value / hourArr.length);
};

// Format the Date object to show month and date
export const formatDate = (date: Date) => {
  return format(date, "MM/dd");
};

// Format the Date objection to show the time
export const formatTime = (date: Date) => {
  if (date.getMinutes() === 59) {
    return format(date, "p");
  }
  return format(date, "h a");
};

// Construct a unique index for finding the cluster on data click
export const formatClusterIndex = (cluster: any) => {
  return (
    format(cluster.begin, "MM-dd-hh-mm") + format(cluster.end, "MM-dd-hh-mm")
  );
};
