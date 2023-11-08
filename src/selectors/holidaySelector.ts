import { selector, selectorFamily } from "recoil";
import { IHoliday } from "@/types/holiday";
import { currentSelector } from ".";
import { SOLAR_HOLIDAY_LIST, LUNAR_HOLIDAY_LIST } from "@/constants/holiday";
import { getFullDate } from "@/utils/getFullDate";
import { convertLunarToSolar } from "@/utils/getSolarDate";

export const initializedHolidayAtom = selector({
  key: "initializedHolidayAtom",
  get: ({ get }) => {
    const { year } = get(currentSelector);

    const solarHolidayItems = SOLAR_HOLIDAY_LIST.reduce((acc, holiday) => {
      const fullDate = getFullDate(year, holiday.month, holiday.date);
      acc[fullDate] = { name: holiday.name, fullDate };
      return acc;
    }, {} as Record<string, IHoliday>);

    const lunarHolidayItems = LUNAR_HOLIDAY_LIST.reduce((acc, holiday) => {
      const fullDate = convertLunarToSolar(
        getFullDate(
          holiday.isPrevYear ? year - 1 : year,
          holiday.month,
          holiday.date
        )
      );
      acc[fullDate] = { name: holiday.name, fullDate };
      return acc;
    }, {} as Record<string, IHoliday>);

    // 섣달 그믐이 2개일 때 하나 삭제
    if (Object.keys(lunarHolidayItems).length > 7) {
      const keys = Object.keys(lunarHolidayItems);
      const firstKey = keys[0];
      delete lunarHolidayItems[firstKey];
    }

    return { holidayItems: { ...solarHolidayItems, ...lunarHolidayItems } };
  },
});
