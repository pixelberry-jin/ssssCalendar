import { selector } from "recoil";
import { ICurrent } from "@/types/current";
import { currentAtom } from "@/atoms/currentAtom";

export const currentSelector = selector<ICurrent>({
  key: "currentSelector",
  get: ({ get }) => {
    const current = get(currentAtom);
    return current;
  },
});
