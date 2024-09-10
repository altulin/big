import { useSettigsQuery } from "@/store/rtk/main/settings";
import { isAfter, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const useDeadlineClose = () => {
  const { data, isSuccess } = useSettigsQuery(undefined);

  if (!isSuccess) {
    return {
      close_main_category: false,
      close_young_category: false,
      close_brand_pitches_category: false,
      close_only_tickets_category: false,
    };
  }

  const {
    close_main_category,
    close_young_category,
    close_brand_pitches_category,
    close_only_tickets_category,
  } = data;

  const toZoned = (date: Date) => {
    return toZonedTime(date, "Europe/Moscow");
  };
  const now = new Date();
  const checkDate = (category: string) => {
    const date = parseISO(category);
    return isAfter(toZoned(now), toZoned(date));
  };

  return {
    isCloseMain: checkDate(close_main_category),
    isCloseYoung: checkDate(close_young_category),
    isCloseBrand: checkDate(close_brand_pitches_category),
    isCloseTickets: checkDate(close_only_tickets_category),
  };
};

export default useDeadlineClose;
