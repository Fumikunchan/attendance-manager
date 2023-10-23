import React, { useContext, useEffect, useState } from "react";
import { CalendarFn } from ".";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as dayjs from "dayjs";
import * as PDM from "./parseDayjsMethods";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaRegCircleDot,
} from "react-icons/fa6";
dayjs.extend(customParseFormat);

function Aside() {
  const {
    displayingDate,
    setDisplayingDate,
    allAttendanceData,
    setAllAttendanceData,
    setPastAllAttendanceData,
  } = useContext(CalendarFn);

  const [clock, setClock] = useState("");

  const calculateTodaysWorkMinutes = () => {
    const now = dayjs();
    const dataInDatabase = allAttendanceData[PDM.formatDate(now)];
    const clockIn = dayjs(
      `${dataInDatabase.workDate} ${dataInDatabase.clockInEditedTime}`,
    );
    const clockOut = dayjs(`${PDM.formatDate(now)} ${PDM.ceilTime(now)}`);
    return clockOut.diff(clockIn, "minutes"); //未来の時間 - 過去の時間
  };

  const clockInFunction = () => {
    setPastAllAttendanceData(allAttendanceData);
    const now = dayjs();
    const myScheduleObject = {};

    myScheduleObject[PDM.formatDate(now)] = {
      ...allAttendanceData[PDM.formatDate(now)],
      clockInTime: PDM.formatTime(now),
      clockInEditedTime: PDM.floorTime(now),
      editDate: `${PDM.formatDate(now)}T${PDM.formatTime(now)}`,
      user: {
        name: "Fumiaki Kondo",
        id: "11608",
      },
      valid: true,
      workDate: PDM.formatDate(now),
      workStatus: "Work day",
    };

    setAllAttendanceData({ ...allAttendanceData, ...myScheduleObject });
    setDisplayingDate(now);
  };
  const clockOutFunction = () => {
    setPastAllAttendanceData(allAttendanceData);
    const now = dayjs();
    const myScheduleObject = {};

    myScheduleObject[PDM.formatDate(now)] = {
      ...allAttendanceData[PDM.formatDate(now)],
      clockOutTime: PDM.formatTime(now),
      clockOutEditedTime: PDM.ceilTime(now),
      editDate: `${PDM.formatDate(now)}T${PDM.formatTime(now)}`,
      restMinutes: PDM.calculateRestMinutes(calculateTodaysWorkMinutes()),
      user: {
        name: "Fumiaki Kondo",
        id: "11608",
      },
      valid: true,
      workDate: PDM.formatDate(now),
      workMinutes: calculateTodaysWorkMinutes(),
      workStatus: "Work day",
    };

    setAllAttendanceData({ ...allAttendanceData, ...myScheduleObject });
    setDisplayingDate(now);
  };

  useEffect(() => {
    setInterval(() => {
      setClock(PDM.formatTime(dayjs()));
    }, 500);
  }, []);

  return (
    <>
      <aside
        className="flex w-64 flex-col gap-y-6 bg-primary-700 p-4 text-white"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="border border-white py-16">
          <p className="mb-2 text-center text-3xl font-semibold">
            {`${displayingDate.year()}年 ${displayingDate.month() + 1}月`}
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              title="Previous Month"
              className="rounded-lg border border-transparent bg-transparent px-5 py-2.5 text-center text-sm font-medium text-white shadow-none transition-all hover:bg-gray-100 hover:text-primary-900 disabled:bg-transparent disabled:text-gray-400"
              onClick={() =>
                setDisplayingDate(
                  displayingDate.set("month", displayingDate.month() - 1),
                )
              }
            >
              <FaArrowLeftLong />
            </button>
            <button
              type="button"
              title="Today"
              className="rounded-lg border border-transparent bg-transparent px-5 py-2.5 text-center text-sm font-medium text-white shadow-none transition-all hover:bg-gray-100 hover:text-primary-900 disabled:bg-transparent disabled:text-gray-400"
              onClick={() => setDisplayingDate(dayjs())}
            >
              <FaRegCircleDot />
            </button>
            <button
              type="button"
              title="Next Month"
              className="rounded-lg border border-transparent bg-transparent px-5 py-2.5 text-center text-sm font-medium text-white shadow-none transition-all hover:bg-gray-100 hover:text-primary-900 disabled:bg-transparent disabled:text-gray-400"
              onClick={() =>
                setDisplayingDate(
                  displayingDate.set("month", displayingDate.month() + 1),
                )
              }
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>

        <p className="h-8 text-center text-sm">
          {clock ? (
            <>
              いま
              <span className="mx-1 text-2xl" suppressHydrationWarning>
                {clock}
              </span>
              ぐらいです。
            </>
          ) : (
            "時計の準備しています..."
          )}
        </p>
        <div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium uppercase text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
            onClick={() => clockInFunction()}
          >
            <FaSignInAlt />
            <span>CLOCK IN</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium uppercase text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
            onClick={() => clockOutFunction()}
          >
            <FaSignOutAlt />
            <span>CLOCK OUT</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Aside;
