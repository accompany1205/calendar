export type TCalendarDay = {
  date: number;
  month: number;
  year: number;
};

export type TEvent = {
  id: string;
  day: string;
  fromTimeNumber: number;
  toTimeNumber: number;
  title: string;
  description: string;
}
