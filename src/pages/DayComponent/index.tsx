import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CalendarContext } from "../../contexts/CalendarContext";
import Modal from "../../components/modal/CalendarEventModal";
import { dayCheckUtil, numberToTime } from "../../utils/time";
import { TEvent } from "../../types";
import { ViewMode } from "../../constants/enum";

const DayComponent: React.FC<{}> = () => {
  const { focusDate, events, setFocusDate, setViewMode } =
    useContext(CalendarContext);

  const { date } = useParams();

  useEffect(() => {
    if (dayCheckUtil(date)) {
      const arr = date?.split("-");

      if (arr && arr.length === 3) {
        setFocusDate({
          year: Number(arr[0]),
          month: Number(arr[1]) - 1,
          date: Number(arr[2]),
        });
        setViewMode(ViewMode.DAY);
      }
    }
  }, [date]);

  // console.log(new Date(2023, 11, 32));

  const fouseDay = `${focusDate.year}-${focusDate.month}-${focusDate.date}`;

  return (
    <div className="py-3 px-2">
      <table className="w-[80%] ml-[10%] mt-8">
        <thead>
          <tr className="border-b">
            <th>No</th>
            <th>Title</th>
            <th>Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {events
            .filter((_event: TEvent) => _event.day === fouseDay)
            .sort((a: TEvent, b: TEvent) => a.fromTimeNumber - b.fromTimeNumber)
            .map((_event: TEvent, index: number) => (
              <tr
                key={_event.id}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <td className="text-center py-1">{index + 1}</td>
                <td className="text-center py-1">{_event.title}</td>
                <td className="text-center py-1">{`${numberToTime(
                  _event.fromTimeNumber
                )} - ${numberToTime(_event.toTimeNumber)}`}</td>
                <td className="text-center py-1">{_event.description}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal />
    </div>
  );
};

export default DayComponent;
