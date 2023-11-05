import { selector } from "recoil";
import { ICalendar } from "@/types/calendar";
import { calendarAtom } from "@/atoms/calendarAtom";

export const calendarSelector = selector<ICalendar>({
  key: "calendarSelector",
  get: ({ get }) => {
    const calendar = get(calendarAtom);
    return calendar;
  },
});
