import React, { useState, useContext, useEffect } from "react";
import { CalendarFn } from ".";
import dayjs from "dayjs";
import * as PDM from "./parseDayjsMethods";

const ScheduleEditor = ({ dateForScheduleEditor, toggleScheduleEditor }) => {
  const {
    displayingDate,
    setDisplayingDate,
    allAttendanceData,
    setAllAttendanceData,
    setPastAllAttendanceData,
  } = useContext(CalendarFn);

  const [editorContents, setEditorContents] = useState({});
  const handleInputChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    setEditorContents({ ...editorContents, [id]: value });
  };

  // const calculateTheDayWorkMinutes = () => {
  //   const now = dayjs();
  //   const dataInDatabase = allAttendanceData[PDM.formatDate(now)];
  //   const clockIn = dayjs(
  //     `${dataInDatabase.workDate} ${dataInDatabase.clockInEditedTime}`,
  //   );
  //   const clockOut = dayjs(`${PDM.formatDate(now)} ${PDM.ceilTime(now)}`);
  //   return clockOut.diff(clockIn, "minutes"); //未来の時間 - 過去の時間
  // };

  const updateAttendanceData = () => {
    setPastAllAttendanceData(allAttendanceData);

    const newScheduleObject = {};
    newScheduleObject[PDM.formatDate(dateOfCell)] = {
      ...allAttendanceData[PDM.formatDate(dateForScheduleEditor)],
      ...editorContents,
      clockInEditedTime: PDM.floorTime(),
      clockOutEditedTime: PDM.ceilTime(now),
      editDate: `${PDM.formatDate(dayjs())}T${PDM.formatTime(dayjs())}`,
      valid: true,
      workMinutes: calculateTheDayWorkMinutes(),
      restMinutes: PDM.calculateRestMinutes(calculateTheDayWorkMinutes()),
    };

    setAllAttendanceData({
      ...allAttendanceData,
      [PDM.formatDate(dateForScheduleEditor)]: newScheduleObject,
    });

    setDisplayingDate(dayjs(dateForScheduleEditor));
    console.log("updated!");
  };

  useEffect(() => {
    console.log(editorContents);
  }, [editorContents]);

  return (
    <>
      <div className="fixed inset-0 z-10 cursor-default bg-secondary-700/50"></div>
      <div className="absolute left-[50%] top-[50%] z-50 flex min-w-[30vw] -translate-x-1/2 -translate-y-1/2 items-center justify-center p-4 sm:p-0">
        <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-xl">
          <div className="relative">
            <div className="flex items-center justify-between p-6">
              <h3 className="text-lg font-medium text-secondary-900">
                Edit your attendance record on{" "}
                {PDM.formatDate(dateForScheduleEditor)}
              </h3>
              <button
                type="button"
                className="rounded-lg p-1 text-center font-medium text-secondary-500 transition-all hover:bg-secondary-100"
                onClick={toggleScheduleEditor}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <div className="space-y-5 text-sm text-secondary-500">
              <div className="px-6">
                <label
                  htmlFor="clockInTime"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  clockInTime
                </label>
                <input
                  type="time"
                  id="clockInTime"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="px-6">
                <label
                  htmlFor="clockOutTime"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  clockOutTime
                </label>
                <input
                  type="time"
                  id="clockOutTime"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="px-6">
                <label
                  htmlFor="dayType"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  dayType
                </label>
                <select
                  id="dayType"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
                >
                  <option value="Work day">Work day</option>
                  <option value="Day off">Day off</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 bg-secondary-50 px-6 py-3">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
                  onClick={toggleScheduleEditor}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-primary-500 bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
                  onClick={updateAttendanceData}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleEditor;
