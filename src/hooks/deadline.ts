import { toZonedTime } from "date-fns-tz";
import { isAfter, parse } from "date-fns";

const useDeadline = (day: string) => {
  const toZoned = (date: Date) => {
    return toZonedTime(date, "Europe/Moscow");
  };
  const now = new Date();
  const date = parse(day, "yyyy-MM-dd-HH:mm", new Date());

  console.log("now: " + toZoned(now));
  console.log("date :" + toZoned(date));

  const deadline = isAfter(date, toZoned(now));

  return deadline;
};

export default useDeadline;
