interface IEmptyDateCellProps {
  date: number;
}

const EmptyDateCellComponent: React.FC<IEmptyDateCellProps> = ({ date }) => {
  return (
    <td className="date">
      <div className="date__wrapper">
        <span className="inline-block text-sm text-gray-300 w-6 h-6 text-center leading-7">
          {date}
        </span>
      </div>
    </td>
  );
};

export default EmptyDateCellComponent;
