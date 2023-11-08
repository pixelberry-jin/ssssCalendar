import { DAY_LIST } from "@/constants";
import { calendarSelector } from "@/selectors/calendarSelector";
import { useRecoilValue } from "recoil";

export default function WeekHead() {
  const { state } = useRecoilValue(calendarSelector);
  return (
    <tr>
      {DAY_LIST.map((item, index) => {
        const isClickedDayIndex = state.clickedDayIndex === index;
        const thClassName =
          index === 0
            ? "text-red-600 text-center"
            : index === 6
            ? "text-blue-600 text-center"
            : "text-center";
        return (
          <th
            key={`day_key_${index}`}
            colSpan={isClickedDayIndex ? 2 : 1}
            className={thClassName}
          >
            {item}
          </th>
        );
      })}
    </tr>
  );
}
