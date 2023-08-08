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
      className={`text-center cursor-pointer w-1/3 text-[14px] border-t-1 text-left border-l-gray-200 border-t-gray-200 border-r-gray-600 border ${
        isSelected ? "border-b-0" : "border-b-0"
      }  ${isSelected ? "bg-[#c1c1c1]" : "bg-none"}`}
    >
      {title}
      {isSelected && (
        <div className="w-full flex bg-[#C1C1C1] h-2 mb-[-4px]" />
      )}
    </div>
  );
};
