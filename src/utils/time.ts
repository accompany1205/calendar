import { TCalendarDay } from "../types";

export const timeToArr = (): { value: number; label: string }[] => {
  const timeOptions = [];
  for (let i = 0; i < 24 * 4; i++) {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    const formattedTime = `${(hours % 12 === 0 ? 12 : hours % 12)
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${
      Math.floor(hours / 12) === 0 ? "am" : "pm"
    }`;
    timeOptions.push({ value: i, label: formattedTime });
  }
  return timeOptions;
};

export const numberToTime = (value: number): string => {
  const hour = Math.floor(value / 4);
  const minutes = (value % 4) * 15;
  return `${(hour % 12 === 0 ? 12 : hour % 12)
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${
    Math.floor(hour / 12) === 0 ? "am" : "pm"
  }`;
};

export const dayCheckUtil = (value: string | undefined): boolean => {
  if (!value) return false;
  const arr = value.split("-");
  if (arr.length !== 3) {
    return false;
  }
  if (Number(arr[0]) <= 2000) {
    return false;
  }
  if (Number(arr[1]) < 1 || Number(arr[1]) > 12) {
    return false;
  }
  if (Number(arr[2]) < 0) {
    return false;
  }
  if (
    new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2])).getMonth() !==
    Number(arr[1]) - 1
  ) {
    return false;
  }
  return true;
};

export const dayToStr = (day: TCalendarDay): string => {
  return `${day.year}-${day.month + 1}-${day.date}`;
};
