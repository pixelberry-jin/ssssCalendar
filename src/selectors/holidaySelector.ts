import { selector, selectorFamily } from "recoil";
import { holidayAtom } from "../atoms/holidayAtom";
import { IHoliday } from "@/types/holiday";
import { currentSelector } from ".";
import { SOLAR_HOLIDAY_LIST } from "@/constants/holiday";
import { getFullDate } from "@/utils/getFullDate";

export const initializedHolidayAtom = selector({
  key: "initializedHolidayAtom",
  get: ({ get }) => {
    const { year } = get(currentSelector);
    const holidayItems = SOLAR_HOLIDAY_LIST.reduce((acc, holiday) => {
      const fullDate = getFullDate(year, holiday.month, holiday.date);
      acc[fullDate] = { name: holiday.name, fullDate };
      return acc;
    }, {} as Record<string, IHoliday>);

    return { holidayItems };
  },
});
