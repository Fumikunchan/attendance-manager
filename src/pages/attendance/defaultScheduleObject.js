export const defaultScheduleObject = {
  clockInTime: null, // "HH:mm:ss"
  clockInEditedTime: null, // "HH:mm:ss"
  clockOutTime: null, // "HH:mm:ss"
  clockOutEditedTime: null, // "HH:mm:ss"
  dayType: null, // "Weekday | Saturday | Holiday"
  editDate: null, // "YYYY-MM-DDTHH:mm:ss"
  midnightWork: {
    nightMinutes: 0, // Number
    morningMinutes: 0, // Number
  },
  isNationalHoliday: false, //Boolean
  overworkMinutes: 0, // Number
  restMinutes: 0, // Number
  uniqueId: null, // String
  user: {
    name: null, // String
    id: null, // String
  },
  isValid: true, // Boolean
  workDate: null, // "YYYY-MM-DD"
  workMinutes: 0, // Number
  workStatus: "Day off", // "Work day | Day off | Paid leave | Substitute holiday"
};
