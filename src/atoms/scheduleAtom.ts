import { ISchedule } from "@/types/schedule";
import { atom } from "recoil";

export interface IScheduleAtom {
  scheduleItems: Record<string, ISchedule[]>;
}

export const scheduleAtom = atom<IScheduleAtom>({
  key: "scheduleAtom",
  default: { scheduleItems: {} },
});
