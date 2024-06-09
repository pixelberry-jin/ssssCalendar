import React, { useEffect, useState } from "react";
import CalendarComponent from "@/components/calendar";
import { ISchedule } from "@/types/schedule";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentSelector, scheduleItemsSelector } from "@/selectors";
import { scheduleAtom } from "@/atoms";
import { useRouter } from "next/router";

function CalendarPageComponent() {
  const { year, month, monthIndex } = useRecoilValue(currentSelector);
  const scheduleItems = useRecoilValue(scheduleItemsSelector);
  const setSchedules = useSetRecoilState(scheduleAtom);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  const handleGetSchedules = React.useCallback(
    (year?: number, month?: number) => {
      if (loading !== undefined) return;
      setLoading(true);

      // router.push(
      //   `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/kakao&response_type=code&scope=calendar`
      // );

      if (year) {
        fetch(`/api/schedules?year=${year}`)
          // fetch(`/api/schedules-kakao`)
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
          .finally(() => setLoading(false));
      }
    },
    []
  );

  useEffect(() => {
    handleGetSchedules(year);
  }, [year]);

  return (
    <CalendarComponent year={year} month={month} monthIndex={monthIndex} />
  );
}

export default CalendarPageComponent;
