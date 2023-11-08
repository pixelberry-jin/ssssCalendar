import { calendarAtom } from "@/atoms/calendarAtom";
import { useDrawCalendar } from "@/hooks/useDrawCalendar";
import { calendarSelector } from "@/selectors/calendarSelector";
import { currentSelector } from "@/selectors/currentSelector";
import { getFullDate } from "@/utils/getFullDate";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IEmptyDateCellProps {
  year: number;
  month: number;
  date: number;
  dayIndex: number;
}

const EmptyDateCellComponent: React.FC<IEmptyDateCellProps> = ({
  year,
  month,
  date,
  dayIndex,
}) => {
  const { month: currentMonth } = useRecoilValue(currentSelector);
  const { state } = useRecoilValue(calendarSelector);
  const setCalendar = useSetRecoilState(calendarAtom);

  const { drawNextCalendar, drawPrevCalendar } = useDrawCalendar();

  const isPrevMonth = month + 1 === currentMonth;
  const isNextMonth = month - 1 === currentMonth;

  const fullDate = getFullDate(year, month, date);

  const isClickedDayIndex = state.clickedDayIndex === dayIndex;

  const handleClickEmptyCell = () => {
    setCalendar((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        clickedFullDate: fullDate,
        clickedDayIndex: dayIndex,
      },
    }));
    if (isPrevMonth) {
      drawPrevCalendar();
    } else if (isNextMonth) {
      drawNextCalendar();
    }
  };

  return (
    <td
      className="date"
      aria-label={fullDate}
      colSpan={isClickedDayIndex ? 2 : 1}
      onClick={handleClickEmptyCell}
    >
      <div className="date__wrapper">
        <span className="inline-block text-sm text-gray-300 w-6 h-6 text-center leading-7 cursor-pointer select-none">
          {date}
        </span>
      </div>
    </td>
  );
};

export default EmptyDateCellComponent;
