import { IToday } from "@/types/today";
import { atom } from "recoil";

export const todayAtom = atom<IToday>({
  key: "todayAtom",
  default: (() => {
    const todayNow = new Date();
    const year = todayNow.getFullYear();
    const month = todayNow.getMonth() + 1;
    const day = todayNow.getDate();

    const todayMonth =
      String(month).length < 2 ? "0" + String(month) : String(month);
    const todayDate = String(day).length < 2 ? "0" + String(day) : String(day);
    const todayFullDate = year + todayMonth + todayDate;

    return {
      fullDate: todayFullDate,
      year,
      month,
      day,
    };
  })(),
});
