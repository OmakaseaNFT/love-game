interface IControlPanelTabProps {
    onClick: () => void;
    isSelected: boolean;
    title: string;
}

export const ControlPanelTab = ({ onClick, isSelected, title }: IControlPanelTabProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border-t-gray-200 border-r-gray-600 border-b-0 border-[1.6px] w-[30%] z-50 bg-[#C1C1C1] text-center text-small ${
        isSelected ? "text-gray-800" : "text-gray-500"
      }`}
    >
      <p className="mb-[-4px]">{title}</p>
      {isSelected && (
        <div className="w-full flex bg-[#C1C1C1] h-2 mb-[-4px]" />
      )}
    </div>
  );
};
