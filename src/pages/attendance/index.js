import React, { createContext, useEffect, useState } from "react";
import * as dayjs from "dayjs";
import Layout from "@/components/Layout/Layout";
import Table from "./Table";
import Aside from "./Aside";
import Notifications from "@/components/Notifications/Notifications";

export const CalendarFn = createContext();

function index() {
  const [displayingDate, setDisplayingDate] = useState(dayjs());
  const [allAttendanceData, setAllAttendanceData] = useState({});
  const [pastAllAttendanceData, setPastAllAttendanceData] = useState({});
  const functions = {
    displayingDate,
    setDisplayingDate,
    allAttendanceData,
    setAllAttendanceData,
    pastAllAttendanceData,
    setPastAllAttendanceData,
  };

  return (
    <Layout>
      <CalendarFn.Provider value={functions}>
        <div
          className="relative flex max-h-screen"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <Aside
            asideProps={{
              displayingDate,
              setDisplayingDate,
              allAttendanceData,
              setAllAttendanceData,
            }}
          />
          <Table
            tableProps={{
              displayingDate,
              setDisplayingDate,
              allAttendanceData,
              setAllAttendanceData,
            }}
          />
          {/* <Notifications status={"success"} /> */}
        </div>
      </CalendarFn.Provider>
    </Layout>
  );
}

export default index;
