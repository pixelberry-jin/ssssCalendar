import { ICurrent } from "@/types/current";
import { atom } from "recoil";

export const currentAtom = atom<ICurrent>({
  key: "currentAtom",
  default: (() => {
    const todayNow = new Date();
    const year = todayNow.getFullYear();
    const monthIndex = todayNow.getMonth();
    const month = todayNow.getMonth() + 1;

    return {
      year,
      monthIndex,
      month,
    };
  })(),
});
