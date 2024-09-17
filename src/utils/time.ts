import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

export const timeUtils = {
  getTimeSendMessage: (createdAt: Timestamp): string => {
    const createdAtDate = createdAt.toDate();
    const currentDate = new Date();

    const createdAtDayjs = dayjs(createdAtDate);
    const currentDayjs = dayjs(currentDate);

    const differenceInDays = currentDayjs.diff(createdAtDayjs, "day");

    if (differenceInDays === 1) {
      return "yesterday";
    }

    if (differenceInDays > 1) {
      return `${differenceInDays} days ago`;
    }

    const differenceInHours = currentDayjs.diff(createdAtDayjs, "hour");
    if (differenceInHours < 24 && differenceInHours >= 1) {
      return `${differenceInHours} hours ago`;
    }
    const differenceInMinutes = currentDayjs.diff(createdAtDayjs, "minute");

    if (differenceInMinutes < 60 && differenceInMinutes >= 1) {
      return `${differenceInMinutes} minutes ago`;
    }

    const differenceInSeconds = currentDayjs.diff(createdAtDayjs, "second");
    return differenceInSeconds === 0
      ? "now"
      : `${differenceInSeconds} seconds ago`;
  },
};
