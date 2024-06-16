import { scheduleAtom } from "@/atoms";
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
  const { scheduleItems } = useRecoilValue(scheduleAtom);
  const { state } = useRecoilValue(calendarSelector);
  const setCalendar = useSetRecoilState(calendarAtom);

  const todayHoliday = holidayItems[fullDate];
  // const todaySchedules = scheduleItems[fullDate];
  const todaySchedules = [
    {
      name: "Test Schedule 1",
    },
    {
      name: "Test Schedule 2",
    },
  ];

  const isClicked = state.clickedFullDate === fullDate;
  const isClickedDayIndex = state.clickedDayIndex === dayIndex;

  const defaultClassName =
    dayIndex === 0 || Boolean(todayHoliday)
      ? "text-red-500"
      : dayIndex === 6
      ? "text-blue-500"
      : "";
  const clickedClassName =
    dayIndex === 0 || Boolean(todayHoliday)
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
          className={`flex justify-center items-center text-sm w-6 h-6 rounded-full text-center leading-7 ${
            isClicked ? clickedClassName : defaultClassName
          } font-bold cursor-pointer select-none mb-1`}
        >
          {date}
        </span>
        {todayHoliday?.name ?? ""}
        {todaySchedules
          ? todaySchedules.map((item, idx) => (
              <div className="text-sm my-0.5" key={`schedule_item_${idx}`}>
                {item.name}
              </div>
            ))
          : null}
        {isClicked ? (
          <input
            type="text"
            className="w-full h-8"
            onKeyDown={(e) => {
              console.log(e);
              todaySchedules.push({
                name: e.currentTarget.value,
              });
              if (e.key === "Enter") {
                // todaySchedules.push({
                //   name: e.currentTarget.value,
                // });
                // Handle the enter event here
              }
            }}
          />
        ) : null}
      </div>
    </td>
  );
};

export default AddableDateCellComponent;
