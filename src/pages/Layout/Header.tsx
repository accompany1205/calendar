import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { CalendarContext } from "../../contexts/CalendarContext";
import { MONTH_NAMES } from "../../constants/month";
import { ViewMode } from "../../constants/enum";
import { dayToStr } from "../../utils/time";
const Header: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { viewMode, setViewMode, focusDate, setFocusDate } =
    useContext(CalendarContext);

  const calendarRef = useRef<Calendar | null>(null);

  const handleClickPreviousMonth = () => {
    if (focusDate.month === 0) {
      setFocusDate({ ...focusDate, year: focusDate.year - 1, month: 11 });
      return;
    }
    setFocusDate({ ...focusDate, month: focusDate.month - 1 });
  };

  const handleClickNextMonth = () => {
    if (focusDate.month === 11) {
      setFocusDate({ ...focusDate, year: focusDate.year + 1, month: 0 });
      return;
    }
    setFocusDate({ ...focusDate, month: focusDate.month + 1 });
  };

  const handleClickPreviousDay = () => {
    const newDate = new Date(focusDate.year, focusDate.month, focusDate.date);
    newDate.setDate(newDate.getDate() - 1);
    setFocusDate({
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      date: newDate.getDate(),
    });
    navigate(
      `/day/${dayToStr({
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        date: newDate.getDate(),
      })}`
    );
  };
  const handleClickNextDay = () => {
    const newDate = new Date(focusDate.year, focusDate.month, focusDate.date);
    newDate.setDate(newDate.getDate() + 1);
    setFocusDate({
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      date: newDate.getDate(),
    });
    navigate(
      `/day/${dayToStr({
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        date: newDate.getDate(),
      })}`
    );
  };
  const handleClickTodayBtn = () => {
    // setMonth(new Date().getMonth());
    setFocusDate({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
    });
    if (viewMode === ViewMode.DAY) {
      navigate(
        `/day/${dayToStr({
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate(),
        })}`
      );
    }
  };

  const handleClickCalendar = () => {
    if (calendarRef && calendarRef.current) {
      calendarRef.current.show();
    }
  };

  const handleChangeViewModeSelect = (e: any) => {
    setViewMode(e.target.value);
    if (e.target.value === ViewMode.MONTH) {
      navigate("/");
    } else {
      navigate(`/day/${dayToStr(focusDate)}`);
    }
  };

  return (
    <div className="flex items-center justify-between pt-3 px-5">
      <div className="flex items-center">
        <h3 className="font-bold text-3xl m-0 mr-16">Calendar</h3>
        <button
          className="px-4 py-1 text-normal border-solid rounded-[5px] border-[1px] border-[#dadce0] bg-white hover:bg-[#ebebeb] mr-12 hover:border-white"
          onClick={() => handleClickTodayBtn()}
        >
          Today
        </button>
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] bg-white hover:bg-[#ebebeb] mr-4">
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 1024 1024"
            onClick={() =>
              viewMode === ViewMode.MONTH
                ? handleClickPreviousMonth()
                : handleClickPreviousDay()
            }
          >
            <path
              fill="currentColor"
              d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] bg-white hover:bg-[#ebebeb] mr-12">
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 1024 1024"
            onClick={() =>
              viewMode === ViewMode.MONTH
                ? handleClickNextMonth()
                : handleClickNextDay()
            }
          >
            <g transform="rotate(180 512 512)">
              <path
                fill="currentColor"
                d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"
              />
            </g>
          </svg>
        </div>
        <div
          className="flex items-center bg-white hover:bg-[#ebebeb] py-1 rounded-[5px] cursor-pointer"
          onClick={() => handleClickCalendar()}
        >
          <Calendar
            ref={calendarRef}
            className="inline invisible w-0"
            onChange={(e) => {
              setFocusDate(
                e.value
                  ? {
                      year: e.value.getFullYear(),
                      month: e.value.getMonth(),
                      date: e.value.getDate(),
                    }
                  : null
              );
            }}
          />
          <h3 className="text-2xl m-0 mr-2 px-3">
            {viewMode === ViewMode.DAY
              ? `${MONTH_NAMES[focusDate.month]} ${focusDate.date} ${
                  focusDate.year
                }`
              : `${MONTH_NAMES[focusDate.month]} ${focusDate.year}`}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m7 10l5 5l5-5z" />
          </svg>
        </div>
      </div>
      <div className="flex items-stretch">
        <select
          className="px-4 py-1 text-normal border-solid rounded-[5px] border-[1px] border-[#dadce0] bg-white hover:bg-[#ebebeb] mr-12 hover:border-white"
          value={viewMode}
          onChange={(e) => handleChangeViewModeSelect(e)}
        >
          <option value={ViewMode.MONTH}>Month</option>
          <option value={ViewMode.DAY}>Day</option>
        </select>
        <div className="flex items-center justify-center w-[36px] h-[36px] rounded-[50%] bg-white hover:bg-[#ebebeb] mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center w-[36px] h-[36px] rounded-[50%] bg-white hover:bg-[#ebebeb]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <circle cx="12" cy="18" r=".5" fill="currentColor" />
              <path
                strokeWidth="2"
                d="M12 16v-1.419c0-.944.604-1.782 1.5-2.081a2.194 2.194 0 0 0 1.5-2.081v-.513C15 8.3 13.7 7 12.094 7H12a3 3 0 0 0-3 3"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
