import { selector } from "recoil";
import { todayAtom } from "../atoms/todayAtom";
import { IToday } from "@/types/today";

export const todaySelector = selector<IToday>({
  key: "todaySelector",
  get: ({ get }) => {
    const today = get(todayAtom);
    return today;
  },
});
