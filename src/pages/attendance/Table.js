import React, { useEffect, useState, useContext } from "react";
import { CalendarFn } from ".";
import * as dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { defaultScheduleObject } from "./defaultScheduleObject";
import Cell from "./Cell";
import ScheduleEditor from "./ScheduleEditor";

dayjs.extend(advancedFormat);

function Table() {
  const { displayingDate, allAttendanceData, setAllAttendanceData } =
    useContext(CalendarFn);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateForScheduleEditor, setDateForScheduleEditor] = useState("");
  const toggleScheduleEditor = (dateOfCell) => {
    setDateForScheduleEditor(dateOfCell);
    setIsModalOpen((prev) => !prev);
  };

  const [monthLength, setMonthLength] = useState(0);
  const [thisMonthArray, setThisMonthArray] = useState([]);
  const thisMonthAttendanceData = {};

  const createCalendar = () => {
    const endDate = displayingDate.endOf("month");
    setMonthLength(endDate.date());

    let scheduleObjectGroup = [];

    for (let i = 0; i < endDate.date(); i++) {
      const theDate = displayingDate.set("date", i + 1);

      // thisMonthDataを埋めていく。既存のデータがあるならそのデータを使い、無いときはdefaultScheduleObjectから作成する。
      let value;
      if (allAttendanceData.hasOwnProperty(theDate.format("YYYY-MM-DD"))) {
        value = allAttendanceData[theDate.format("YYYY-MM-DD")];
      } else {
        value = {
          ...defaultScheduleObject,
          workDate: theDate.format("YYYY-MM-DD"),
          dayType: theDate.day(),
          uniqueId: theDate.format("x"),
        };
      }
      thisMonthAttendanceData[theDate.format("YYYY-MM-DD")] = value;
      scheduleObjectGroup.push(value);
    }
    setThisMonthArray(scheduleObjectGroup);
    setAllAttendanceData({ ...allAttendanceData, ...thisMonthAttendanceData });
  };

  useEffect(() => {
    createCalendar();
    console.log(
      "%c[allAttendanceData from Table]",
      "background:  blue; color: white;",
      { ...allAttendanceData, ...thisMonthAttendanceData },
    );
  }, [displayingDate]);

  return (
    <>
      <table
        className="flex-1 border-collapse cursor-default border border-gray-200 bg-gray-100 text-left text-sm text-gray-700"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <thead className="block bg-gray-50">
          <tr className="flex pr-4">
            <th scope="col" className=" myCell font-medium text-gray-900">
              Date
            </th>
            <th scope="col" className=" myCell font-medium text-gray-900">
              Work Status
            </th>
            <th scope="col" className=" myCell font-medium text-gray-900">
              Clock-in
            </th>
            <th scope="col" className=" myCell font-medium text-gray-900">
              Clock-out
            </th>
            <th scope="col" className=" myCell font-medium text-gray-900">
              Total Work Time
            </th>
            <th scope="col" className=" myCell font-medium text-gray-900">
              Total Overwork
            </th>
            <th scope="col" className=" myCell font-medium text-gray-900">
              Midnight Work
            </th>
            <th scope="col" className=" myCell font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody
          className="block divide-y divide-gray-100 overflow-auto border-t border-gray-100"
          style={{ height: "calc(100vh - 10rem)" }}
        >
          {Array(monthLength)
            .fill(0)
            .map((_, index) => {
              return (
                <Cell
                  index={index}
                  cellData={thisMonthArray[index]}
                  toggleScheduleEditor={toggleScheduleEditor}
                  key={index}
                />
              );
            })}
        </tbody>
      </table>
      {isModalOpen && (
        <ScheduleEditor
          dateForScheduleEditor={dateForScheduleEditor}
          toggleScheduleEditor={toggleScheduleEditor}
        />
      )}
    </>
  );
}

export default Table;
