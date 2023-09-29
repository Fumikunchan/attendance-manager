import React, { useState, useEffect, useContext } from "react";
import { CalendarFn } from ".";
import * as dayjs from "dayjs";
import * as PDM from "./parseDayjsMethods";
import { defaultScheduleObject } from "./defaultScheduleObject";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const daysInJapanese = [
  "（日）",
  "（月）",
  "（火）",
  "（水）",
  "（木）",
  "（金）",
  "（土）",
];

function Cell({
  index,
  cellData = defaultScheduleObject,
  toggleScheduleEditor,
}) {
  const {
    displayingDate,
    allAttendanceData,
    setAllAttendanceData,
    setPastAllAttendanceData,
    setDisplayingDate,
  } = useContext(CalendarFn);

  const dateOfCell = displayingDate.set("date", index + 1);

  const calculateWorkMinutes = () => {
    const now = dayjs();
    const dataInDatabase = allAttendanceData[PDM.formatDate(now)];
    const clockIn = dayjs(`${dataInDatabase.workDate} ${PDM.floorTime(now)}`);
    const clockOut = dayjs(`${PDM.formatDate(now)} ${PDM.ceilTime(now)}`);
    return clockOut.diff(clockIn, "minutes"); //未来の時間 - 過去の時間
  };

  // 確認用なのでモーダル完成後消す
  const editScheduleObject = () => {
    setPastAllAttendanceData(allAttendanceData);
    const now = dayjs();
    const myScheduleObject = {};

    myScheduleObject[PDM.formatDate(dateOfCell)] = {
      ...allAttendanceData[PDM.formatDate(dateOfCell)],
      clockInTime: PDM.formatTime(now),
      clockInEditedTime: PDM.floorTime(now),
      clockOutTime: PDM.formatTime(now),
      clockOutEditedTime: PDM.ceilTime(now),
      editDate: `${PDM.formatDate(now)}T${PDM.formatTime(now)}`,
      restMinutes: PDM.calculateRestMinutes(calculateWorkMinutes()),
      user: {
        name: "Fumiaki Kondo",
        id: "11608",
      },
      valid: true,
      workDate: PDM.formatDate(now),
      workMinutes: calculateWorkMinutes(),
      workStatus: "Work day",
    };

    setAllAttendanceData({ ...allAttendanceData, ...myScheduleObject });
    setDisplayingDate(now);
  };

  useEffect(() => {}, []);

  return (
    <>
      <tr
        className={`flex hover:bg-gray-50 ${
          dayjs().isAfter(dateOfCell, "date")
            ? "bg-gray-100"
            : dayjs().isSame(dateOfCell, "date")
            ? "!border-2 !border-primary-500 bg-white"
            : dayjs().isBefore(dateOfCell, "date")
            ? "bg-white"
            : ""
        }`}
      >
        <th
          className={`myCell ${
            cellData.dayType === 0
              ? "text-red-600"
              : cellData.dayType === 6
              ? "text-blue-600"
              : cellData.isNationalHoliday === true
              ? "text-red-600"
              : ""
          }`}
        >
          {dateOfCell.format("MM/DD")}
          {daysInJapanese[dateOfCell.day()]}
        </th>
        <td className="myCell">{cellData.workStatus}</td>
        <td className="myCell">{cellData.clockInEditedTime}</td>
        <td className="myCell">{cellData.clockOutEditedTime}</td>
        <td className="myCell">
          {cellData.workMinutes ? cellData.workMinutes : 0} minutes
        </td>
        <td className="myCell">
          {cellData.overworkMinutes >= 120 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
              <FaXmark />
              {`${cellData.overworkMinutes} minutes`}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              <FaCheck />
              {`${cellData.overworkMinutes} minutes`}
            </span>
          )}
        </td>
        <td className="myCell">
          {cellData.midnightWork.nightMinutes +
            cellData.midnightWork.morningMinutes}{" "}
          minutes
        </td>
        <td className="myCell font-medium">
          <button
            className="text-primary-700"
            onClick={() => toggleScheduleEditor(dateOfCell)}
          >
            Edit
          </button>
        </td>
      </tr>
    </>
  );
}

export default Cell;
