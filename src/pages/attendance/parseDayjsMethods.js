import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};
export const formatTime = (time) => {
  return dayjs(time).format("HH:mm:ss");
};
export const convert2digitString = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};
export const floorTime = (time, minuteUnit = 5) => {
  // 時間切り捨て（時間を過去にする）
  const totalMinutes = time.hour() * 60 + time.minute();
  const roundedMinutes = Math.floor(totalMinutes / minuteUnit) * minuteUnit;
  const roundedHours = Math.floor(roundedMinutes / 60);
  const remainingMinutes = roundedMinutes % 60;
  return `${convert2digitString(roundedHours)}:${convert2digitString(
    remainingMinutes,
  )}`;
};
export const ceilTime = (time, minuteUnit = 5) => {
  // 時間切り上げ（時間を未来にする）
  const roundedMinutes = Math.ceil(time.minute() / minuteUnit) * minuteUnit;
  return `${convert2digitString(time.hour())}:${convert2digitString(
    roundedMinutes,
  )}`;
};

export const calculateRestMinutes = (workMinutes) => {
  return workMinutes >= 480 ? 60 : workMinutes >= 360 ? 45 : 0;
};
