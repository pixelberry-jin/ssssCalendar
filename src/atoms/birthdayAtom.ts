import { IBirthDay } from "@/types/birthday";
import { atom } from "recoil";

export interface IBirthDayAtom {
  birthdayItems: Record<string, IBirthDay>;
}

export const birthdayAtom = atom<IBirthDayAtom>({
  key: "birthdayAtom",
  default: { birthdayItems: {} },
});
