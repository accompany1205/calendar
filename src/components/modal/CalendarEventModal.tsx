import React, { useState, useContext, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { CalendarContext } from "../../contexts/CalendarContext";
import { WEEK_NAMES } from "../../constants/week";
import { MONTH_NAMES } from "../../constants/month";
import { timeToArr } from "../../utils/time";
import { TEvent } from "../../types";
import { Status } from "../../constants/enum";



const Modal: React.FC<{}> = () => {
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [fromTimeNumber, setFromTimeNumber] = useState<number>(0);
  const [toTimeNumber, setToTimeNumber] = useState<number>(2);
  const [status, setStatus] = useState<Status>(Status.NEW);

  const toast = useRef<Toast | null>(null);

  const {
    isShowEventModal,
    setIsShowEventModal,
    focusDate,
    addEvent,
    activeEvent,
    setActiveEvent,
    setEvents,
  } = useContext(CalendarContext);

  const handleDelete = () => {
    if (activeEvent) {
      setEvents((_events: TEvent[]) =>
        _events.filter((_event: TEvent) => _event.id !== activeEvent.id)
      );
      if (toast && toast.current)
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Successfully deleted the Event!",
          life: 3000,
        });
    }
    handleClose();
  };

  const handleClose = () => {
    setIsShowEventModal(false);
    setDescription("");
    setTitle("");
    setActiveEvent(null);

  };

  const handleClickSave = () => {
    if (title.length === 0) {
      if (toast && toast.current)
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Title must be filled!",
          life: 3000,
        });
      return;
    }
    if (description.length === 0) {
      if (toast && toast.current)
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Description must be filled!",
          life: 3000,
        });
      return;
    }
    if (status === Status.NEW) {
      addEvent({
        id: new Date().getMilliseconds().toString(),
        title,
        fromTimeNumber,
        toTimeNumber,
        description,
      });
      if (toast && toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Successfully created a new Event!",
          life: 3000,
        });
      }
    } else {
      setEvents((_events: TEvent[]) =>
        _events.map((_event: TEvent) => {
          if (_event.id === activeEvent?.id) {
            return {
              ..._event,
              title,
              description,
              fromTimeNumber,
              toTimeNumber,
            };
          }
          return { ..._event };
        })
      );
      if (toast && toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Successfully updated!",
          life: 3000,
        });
      }
    }
    handleClose();
  };

  useEffect(() => {
    if (toTimeNumber < fromTimeNumber && fromTimeNumber < 95) {
      setToTimeNumber(fromTimeNumber + 1);
    } else if (fromTimeNumber === 95) {
      setFromTimeNumber(95);
    }
  }, [fromTimeNumber]);

  useEffect(() => {
    if (toTimeNumber < fromTimeNumber && toTimeNumber > 1) {
      setFromTimeNumber(toTimeNumber - 1);
    } else if (toTimeNumber === 0) {
      setFromTimeNumber(0);
    }
  }, [toTimeNumber]);

  useEffect(() => {
    if (activeEvent) {
      setTitle(activeEvent.title);
      setDescription(activeEvent.description);
      setFromTimeNumber(activeEvent.fromTimeNumber);
      setToTimeNumber(activeEvent.toTimeNumber);
      setStatus(Status.UPDATE);
    }else{
      setStatus(Status.NEW);
    }
  }, [activeEvent]);

  return (
    <>
      <Toast ref={toast} />
      {isShowEventModal ? (
        <div
          className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none h-screen"
          onClick={() => handleClose()}
        >
          <div
            className="border-0 rounded-lg overflow-hidden shadow-lg flex flex-col w-[300px] md:w-[450px] bg-white outline-none focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between px-5 py-2 bg-[#f1f3f4] rounded-t ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.5 18q-1.05 0-1.775-.725T12 15.5q0-1.05.725-1.775T14.5 13q1.05 0 1.775.725T17 15.5q0 1.05-.725 1.775T14.5 18ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
                />
              </svg>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => handleClose()}
              >
                <span className="flex items-center justify-center text-black opacity-7 h-8 w-8 text-xl block bg-[#f1f3f4] hover:bg-[#e0e1e1] py-0 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className="p-6 flex-auto">
              <form className="w-full">
                <input
                  className="shadow appearance-none border-b-[2px] border-solid border-gray-500 outline-0 focus:border-blue-500 w-full py-2 px-1 text-black"
                  placeholder="Add title and time"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <div className="flex items-start justify-start mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="mr-4 mt-1"
                  >
                    <g fill="none">
                      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                      <path
                        fill="currentColor"
                        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1Z"
                      />
                    </g>
                  </svg>
                  <div className="flex-1">
                    <div className="border px-2 py-1 rounded-t">
                      {focusDate
                        ? `${
                            WEEK_NAMES[
                              new Date(
                                focusDate.year,
                                focusDate.month,
                                focusDate.date
                              ).getDay()
                            ]
                          }, ${MONTH_NAMES[focusDate.month]} ${
                            focusDate.date
                          } ${focusDate.year}`
                        : ""}
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="flex items-stretch mr-4">
                        <div className="border px-2 py-1 rounded-t mr-1">
                          From
                        </div>
                        <select
                          className="border rounded-t"
                          name=""
                          id=""
                          value={fromTimeNumber}
                          onChange={(e) =>
                            setFromTimeNumber(Number(e.target.value))
                          }
                        >
                          {timeToArr().map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      -
                      <div className="flex items-stretch ml-4">
                        <div className="border px-2 py-1 rounded-t mr-1">
                          To
                        </div>
                        <select
                          className="border rounded-t"
                          name=""
                          id=""
                          value={toTimeNumber}
                          onChange={(e) =>
                            setToTimeNumber(Number(e.target.value))
                          }
                        >
                          {timeToArr().map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-start mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="mr-4"
                  >
                    <path
                      fill="currentColor"
                      d="M2.75 4.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75Zm0 3a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2 11.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5Z"
                    />
                  </svg>
                  <div className="flex-1">
                    <textarea
                      className="w-full border rounded-t p-2"
                      placeholder="Add description"
                      name=""
                      id=""
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-gray-500 hover:text-gray-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => status === Status.NEW ? handleClose() : handleDelete()}
              >
                {status === Status.NEW ? `More Options` : `Delete`}
              </button>
              <button
                className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => handleClickSave()}
              >
                {status === Status.NEW ? `Save` : `Update`}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
