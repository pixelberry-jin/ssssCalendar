import { ICalendar } from "@/types/calendar";
import { atom } from "recoil";

export const calendarAtom = atom<ICalendar>({
  key: "calendarAtom",
  default: { state: { clickedFullDate: null } },
});
