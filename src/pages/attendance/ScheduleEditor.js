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

  const [editorContents, setEditorContents] = useState({
    clockInTime:
      allAttendanceData[PDM.formatDate(dateForScheduleEditor)].clockInTime,
    clockOutTime:
      allAttendanceData[PDM.formatDate(dateForScheduleEditor)].clockOutTime,
  });
  const handleInputChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    setEditorContents({ ...editorContents, [id]: value });
  };

  const calculateTheDayWorkMinutes = () => {
    const now = dayjs();
    const clockIn = dayjs(
      `${PDM.formatDate(now)} ${editorContents.clockInEditedTime}`,
    );
    const clockOut = dayjs(
      `${PDM.formatDate(now)}T${editorContents.clockOutEditedTime}`,
    );
    console.log(`${PDM.formatDate(now)} ${editorContents.clockInEditedTime}`);
    return clockOut.diff(clockIn, "minutes"); //未来の時間 - 過去の時間
  };

  const updateAttendanceData = () => {
    setPastAllAttendanceData(allAttendanceData);

    const newScheduleObject = {};
    newScheduleObject[PDM.formatDate(dateForScheduleEditor)] = {
      ...allAttendanceData[PDM.formatDate(dateForScheduleEditor)],
      ...editorContents,
      ...(editorContents.clockInTime && {
        clockInEditedTime: PDM.floorTime(
          dayjs(
            `${PDM.formatDate(dateForScheduleEditor)}T${
              editorContents.clockInTime
            }:00`,
          ),
        ),
      }),
      ...(editorContents.clockOutTime && {
        clockOutEditedTime: PDM.ceilTime(
          dayjs(
            `${PDM.formatDate(dateForScheduleEditor)}T${
              editorContents.clockOutTime
            }:00`,
          ),
        ),
      }),
      editDate: `${PDM.formatDate(dayjs())}T${PDM.formatTime(dayjs())}`,
      valid: true,
      workMinutes: calculateTheDayWorkMinutes(),
      // restMinutes: PDM.calculateRestMinutes(calculateTheDayWorkMinutes()),
    };

    setAllAttendanceData({
      ...allAttendanceData,
      ...newScheduleObject,
    });

    setDisplayingDate(dayjs(dateForScheduleEditor));
    console.log("updated!");
  };

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
                  clockInTime（5分単位に切り下げます）
                </label>
                <input
                  type="time"
                  id="clockInTime"
                  onChange={handleInputChange}
                  defaultValue={
                    allAttendanceData[PDM.formatDate(dateForScheduleEditor)]
                      .clockInEditedTime
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="px-6">
                <label
                  htmlFor="clockOutTime"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  clockOutTime（5分単位に切り上げます）
                </label>
                <input
                  type="time"
                  id="clockOutTime"
                  defaultValue={
                    allAttendanceData[PDM.formatDate(dateForScheduleEditor)]
                      .clockOutEditedTime
                  }
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="px-6">
                <label
                  htmlFor="workStatus"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  workStatus
                </label>
                <select
                  id="workStatus"
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
                  onClick={() => {
                    updateAttendanceData();
                    toggleScheduleEditor();
                  }}
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
