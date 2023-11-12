import { selector, selectorFamily } from "recoil";
import { birthdayAtom } from "../atoms/birthdayAtom";
import { IBirthDay } from "@/types/birthday";

export const birthdayItemsSelector = selector<Record<string, IBirthDay>>({
  key: "birthdayItemsSelector",
  get: ({ get }) => {
    const { birthdayItems } = get(birthdayAtom);
    return birthdayItems;
  },
});

// example
// const getBirthdayById = useRecoilValue(birthdayItemByIdSelector);
// const myBirthday = getBirthdayById("some-id");
