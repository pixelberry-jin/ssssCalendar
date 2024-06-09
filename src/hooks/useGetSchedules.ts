import { scheduleAtom } from "@/atoms";
import { currentAtom } from "@/atoms/currentAtom";
import { scheduleItemsSelector, todaySelector } from "@/selectors";
import { currentSelector } from "@/selectors/currentSelector";
import { ISchedule } from "@/types/schedule";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useGetSchedules = () => {
  const { year } = useRecoilValue(currentSelector);
  const scheduleItems = useRecoilValue(scheduleItemsSelector);
  const setSchedules = useSetRecoilState(scheduleAtom);

  const getGoogleSchedules = () => {
    fetch(`/api/schedules?year=${year}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data: ISchedule[]) => {
        const schedulesRecordList = data.reduce(
          (acc: Record<string, ISchedule[]>, item) => {
            if (!acc[item.id]) {
              acc[item.id] = [];
            }
            acc[item.id].push(item);
            return acc;
          },
          {}
        );
        setSchedules({
          scheduleItems: { ...scheduleItems, ...schedulesRecordList },
        });
      })
      .catch((error) => console.error("Error fetching schedules:", error))
  };

  return { getGoogleSchedules};
};
