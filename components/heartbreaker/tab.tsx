interface IStakingSelectTabProps {
  onClick: () => void;
  isSelected: boolean;
  title: string;
}

export const HeartBreakTab = ({
  onClick,
  isSelected,
  title,
}: IStakingSelectTabProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-1/3 text-[14px] px-2 border-t-0  text-left border-l-gray-200 border-t-gray-200 border-r-gray-600  border ${
        isSelected ? "border-b-0" : "border-b border-white"
      }`}
    >
      {title}
      {isSelected && <div className="bg-[#C1C1C1]" />}
    </div>
  );
};
