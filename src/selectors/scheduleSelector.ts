import { selector, selectorFamily } from "recoil";
import { scheduleAtom } from "../atoms/scheduleAtom";
import { ISchedule } from "@/types/schedule";

export const scheduleItemsSelector = selector<Record<string, ISchedule[]>>({
  key: "scheduleItemsSelector",
  get: ({ get }) => {
    const { scheduleItems } = get(scheduleAtom);
    return scheduleItems;
  },
});

// example
// const getScheduleById = useRecoilValue(scheduleItemByIdSelector);
// const mySchedule = getScheduleById("some-id");
