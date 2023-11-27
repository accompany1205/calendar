import React, { useContext } from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import { TCalendarDay, TEvent } from "../../types";
import { MONTH_ABBR_NAMES } from "../../constants/month";
import { numberToTime } from "../../utils/time";

type CalendarDateType = {
  day: TCalendarDay;
  weekNumber: number;
};

const thisMonth = new Date().getMonth();
const thisDate = new Date().getDate();
const thisYear = new Date().getFullYear();

const CalendarDate: React.FC<CalendarDateType> = ({ day, weekNumber }) => {
  const {
    setIsShowEventModal,
    setFocusDate,
    events,
    setEvents,
    setActiveEvent,
  } = useContext(CalendarContext);

  const handleClickDate = (day: TCalendarDay) => {
    setFocusDate(day);
    setIsShowEventModal(true);
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, event: TEvent) => {
    e.dataTransfer.setData("text/plain", event.id);
    console.log(event.id);
  };

  const onDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const onDrop = (
    e: React.DragEvent<HTMLTableCellElement>,
    targetDay: TCalendarDay
  ) => {
    console.log(targetDay);
    e.preventDefault();
    const draggedEventId = e.dataTransfer.getData("text/plain");
    console.log(draggedEventId);
    const updatedEvents = events.map((event: TEvent) => {
      if (event.id === draggedEventId) {
        return {
          ...event,
          day: `${targetDay.year}-${targetDay.month}-${targetDay.date}`,
        }; // Assuming the `day` field exists in your event type and is used to map an event to a specific date.
      }
      return event;
    });
    setEvents(updatedEvents); // Assuming `setEvents` is a function provided by your `CalendarContext` to update the events state.
  };

  const isToday =
    day.month === thisMonth && day.date === thisDate && day.year === thisYear;

  const borderClass = weekNumber === 0 ? "border-t-[0px]" : "border-t-[1px]";
  const todayHighlightClass = isToday ? "bg-[#1a73e8] text-white" : "";
  const eventDateKey = `${day.year}-${day.month}-${day.date}`;

  return (
    <td
      className={`border-[1px] border-solid border-grey ${borderClass}`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, day)}
      onClick={() => handleClickDate(day)}
      role="gridcell"
    >
      <div>
        <div className={`flex justify-center text-sm mt-1`}>
          <div
            className={`flex items-center justify-center ${todayHighlightClass} ${
              day.date === 1
                ? "w-auto rounded-[15px] px-2"
                : "w-[30px] rounded-[50%] h-[30px]"
            }`}
          >
            {day.date === 1
              ? `${MONTH_ABBR_NAMES[day.month]} ${day.date}`
              : day.date}
          </div>
        </div>
        <div className="h-[150px] overflow-hidden">
          {events &&
            events.filter((_event: TEvent) => _event.day === eventDateKey) &&
            events
              .filter((_event: TEvent) => _event.day === eventDateKey)
              .sort(
                (a: TEvent, b: TEvent) => a.fromTimeNumber - b.fromTimeNumber
              )
              .map((event: TEvent) => (
                <div
                  key={event.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, event)}
                  className={`rounded bg-blue-500 text-white px-2 py-1 w-[90%] cursor-pointer mt-1 text-xs`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEvent(event);
                    setIsShowEventModal(true);
                  }}
                >
                  {`${numberToTime(
                    event.fromTimeNumber
                  )} ${event.title.substring(0, 20)} `}
                </div>
              ))}
        </div>
      </div>
    </td>
  );
};

export default CalendarDate;
