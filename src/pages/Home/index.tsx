import React, { useState, useEffect, useContext } from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import CalendarDate from "./CalendarDate";
import Modal from "../../components/modal/CalendarEventModal";
import { TCalendarDay } from "../../types";
import { WEEK_ABBR_NAMES } from "../../constants/week";

const Home: React.FC<{}> = () => {
  const [dayArr, setDayArr] = useState<TCalendarDay[][]>([]);

  const { focusDate } = useContext(CalendarContext);

  useEffect(() => {
    if (focusDate) {
      const firstDate = new Date(focusDate.year, focusDate.month, 1);
      const firstDayofview = new Date(firstDate);
      firstDayofview.setDate(firstDate.getDate() - firstDate.getDay() - 1);
      const _arr: TCalendarDay[][] = [];
      const nextDay = new Date(firstDayofview);
      for (let i = 0; i < 5; i++) {
        const rowArr: TCalendarDay[] = [];
        for (let j = 0; j < 7; j++) {
          nextDay.setDate(nextDay.getDate() + 1);
          rowArr.push({
            date: nextDay.getDate(),
            month: nextDay.getMonth(),
            year: nextDay.getFullYear(),
          });
        }
        _arr.push(rowArr);
      }
      setDayArr(_arr);
    }
  }, [focusDate]);

  return (
    <div className="py-3 px-2">
      <table className="w-full">
        <thead>
          <tr>
            {WEEK_ABBR_NAMES &&
              WEEK_ABBR_NAMES.length > 0 &&
              WEEK_ABBR_NAMES.map((name: string) => (
                <th
                  key={name}
                  className="w-[14.3%] border-[1px] border-solid border-grey border-b-[0px] pt-1 font-normal text-sm"
                >
                  {name.toLocaleUpperCase()}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {dayArr &&
            dayArr.length > 0 &&
            dayArr.map((weekArr: TCalendarDay[], weekNumber: number) => (
              <tr key={`week-${weekNumber}`}>
                {weekArr &&
                  weekArr.length > 0 &&
                  weekArr.map((day: TCalendarDay, index: number) => (
                    <CalendarDate
                      key={`day-${index}`}
                      day={day}
                      weekNumber={weekNumber}
                    />
                  ))}
              </tr>
            ))}
        </tbody>
      </table>

      <Modal />
    </div>
  );
};

export default Home;
