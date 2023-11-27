/* eslint-disable */
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { TCalendarDay, TEvent } from "../types";
import { ViewMode } from "../constants/enum";

interface CalendarContextState {
  isShowEventModal: boolean;
  setIsShowEventModal: Function;
  focusDate: TCalendarDay;
  setFocusDate: Function;
  events: TEvent[];
  addEvent: Function;
  setEvents: Function;
  activeEvent: TEvent | null;
  setActiveEvent: Function;
  viewMode: ViewMode;
  setViewMode: Function;
}

export const CalendarContext = createContext<CalendarContextState>(
  {} as CalendarContextState
);

const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isShowEventModal, setIsShowEventModal] = useState<boolean>(false);
  const [focusDate, setFocusDate] = useState<TCalendarDay>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
  });
  const [events, setEvents] = useState<TEvent[]>(
    localStorage.getItem("app@event")
      ? JSON.parse(localStorage.getItem("app@event") || "")
      : []
  );
  const [activeEvent, setActiveEvent] = useState<TEvent | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.MONTH);

  const addEvent = (event: TEvent) => {
    if (!focusDate) return;
    const day = `${focusDate.year}-${focusDate.month}-${focusDate.date}`;
    setEvents((_events: any) => [..._events, { ...event, day }]);
  };

  useEffect(() => {
    localStorage.setItem("app@event", JSON.stringify(events));
  }, [events]);

  return (
    <CalendarContext.Provider
      value={{
        isShowEventModal,
        setIsShowEventModal,
        focusDate,
        setFocusDate,
        events,
        addEvent,
        setEvents,
        activeEvent,
        setActiveEvent,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
export default CalendarProvider;
