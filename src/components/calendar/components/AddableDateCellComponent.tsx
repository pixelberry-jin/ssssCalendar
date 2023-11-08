import { calendarAtom } from "@/atoms/calendarAtom";
import { initializedHolidayAtom } from "@/selectors";
import { calendarSelector } from "@/selectors/calendarSelector";
import { getFullDate } from "@/utils/getFullDate";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IAddableDateCellProps {
  year: number;
  month: number;
  date: number;
  dayIndex: number;
}

const AddableDateCellComponent: React.FC<IAddableDateCellProps> = ({
  year,
  month,
  date,
  dayIndex,
}) => {
  const fullDate = getFullDate(year, month, date);
  const { holidayItems } = useRecoilValue(initializedHolidayAtom);
  const { state } = useRecoilValue(calendarSelector);
  const setCalendar = useSetRecoilState(calendarAtom);

  const todayHoliday = holidayItems[fullDate];

  const isClicked = state.clickedFullDate === fullDate;
  const isClickedDayIndex = state.clickedDayIndex === dayIndex;

  const defaultClassName =
    dayIndex === 0 || Boolean(todayHoliday)
      ? "text-red-500"
      : dayIndex === 6
      ? "text-blue-500"
      : "";
  const clickedClassName =
    dayIndex === 0
      ? "bg-red-500 text-white shadow-txt-1"
      : dayIndex === 6
      ? "bg-blue-500 text-white shadow-txt-1"
      : "bg-sky-300 text-white shadow-txt-1";

  const handleClickDate = () => {
    setCalendar((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        clickedFullDate: fullDate,
        clickedDayIndex: dayIndex,
      },
    }));
  };

  return (
    <td
      className="date"
      aria-label={fullDate}
      data-col-order={dayIndex}
      colSpan={isClickedDayIndex ? 2 : 1}
      onClick={handleClickDate}
    >
      <div className="date__wrapper min-h-[5rem]">
        <span
          className={`text-sm inline-block w-6 h-6 rounded-full text-center leading-7 ${
            isClicked ? clickedClassName : defaultClassName
          } cursor-pointer select-none`}
        >
          {date}
        </span>
        {todayHoliday?.name ?? ""}
      </div>
    </td>
  );
};

export default AddableDateCellComponent;
