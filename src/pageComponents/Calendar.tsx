import React, { useEffect, useState } from "react";
import CalendarComponent from "@/components/calendar";
import { useRecoilValue } from "recoil";
import { currentSelector } from "@/selectors";
import { useGetSchedules } from "@/hooks/useGetSchedules";

function CalendarPageComponent() {
  const { year, month, monthIndex } = useRecoilValue(currentSelector);
  const [loading, setLoading] = useState<boolean>(true);
  const {getGoogleSchedules} = useGetSchedules()

  const handleGetSchedules = React.useCallback(
    async () => {
      await getGoogleSchedules();
      setLoading(false);
    },
    [setLoading, getGoogleSchedules]
  );

  useEffect(() => {
    handleGetSchedules();
  }, [year]);

  if (loading) return <div>Loading...</div>

  return (
    <CalendarComponent year={year} month={month} monthIndex={monthIndex} />
  );
}

export default CalendarPageComponent;
