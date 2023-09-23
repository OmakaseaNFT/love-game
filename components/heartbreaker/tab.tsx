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
      className={`z-50 text-center cursor-pointer w-1/3 text-[14px] border-t-1 border-l-gray-200 border-t-gray-200 border-r-gray-600 border ${
        isSelected ? "border-b-0" : "border-b-0"
      }  ${isSelected ? "bg-tab-2" : "bg-none"}`}
    >
      {title}
      {isSelected && (
        <div className="w-full flex bg-tab-2 h-[2px] mb-[-1px]" />
      )}
    </div>
  );
};
