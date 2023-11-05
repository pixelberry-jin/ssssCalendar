import { IHoliday } from "@/types/holiday";
import { atom } from "recoil";

export interface IHolidayAtom {
  holidayItems: Record<string, IHoliday>;
}

export const holidayAtom = atom<IHolidayAtom>({
  key: "holidayAtom",
  default: {
    holidayItems: {},
  },
});
