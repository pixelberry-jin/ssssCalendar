import { useEffect } from "react";

interface IDateCellProps {
  date: number;
  isCurrentMonth: boolean;
  onDateChange: () => void;
}

// 날짜를 표시하는 컴포넌트
const DateCellComponent: React.FC<IDateCellProps> = ({
  date,
  isCurrentMonth,
  onDateChange,
}) => {
  useEffect(() => {
    onDateChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const className = isCurrentMonth ? "text-gray-800" : "text-gray-300";

  return (
    <td className="date">
      <div className="date__wrapper">
        <span className={className}>{date}</span>
      </div>
    </td>
  );
};

export default DateCellComponent;
