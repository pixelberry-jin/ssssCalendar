import { useDrawCalendar } from "@/hooks/useDrawCalendar";
import { currentSelector } from "@/selectors/currentSelector";
import { getFullDate } from "@/utils/getFullDate";
import { useRecoilValue } from "recoil";

interface IEmptyDateCellProps {
  year: number;
  month: number;
  date: number;
}

const EmptyDateCellComponent: React.FC<IEmptyDateCellProps> = ({
  year,
  month,
  date,
}) => {
  const { month: currentMonth } = useRecoilValue(currentSelector);
  const { drawNextCalendar, drawPrevCalendar } = useDrawCalendar();

  const isPrevMonth = month + 1 === currentMonth;
  const isNextMonth = month - 1 === currentMonth;

  const fullDate = getFullDate(year, month, date);

  const handleClickEmptyCell = () => {
    if (isPrevMonth) {
      drawPrevCalendar();
    } else if (isNextMonth) {
      drawNextCalendar();
    }
  };

  return (
    <td className="date" aria-label={fullDate} onClick={handleClickEmptyCell}>
      <div className="date__wrapper">
        <span className="inline-block text-sm text-gray-300 w-6 h-6 text-center leading-7 cursor-pointer select-none">
          {date}
        </span>
      </div>
    </td>
  );
};

export default EmptyDateCellComponent;
