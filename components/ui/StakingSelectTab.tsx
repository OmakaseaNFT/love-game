import { useContext } from "react";
import { FileThemeContext } from "../../system/context/FileThemeContext";

interface IStakingSelectTabProps {
  onClick: () => void;
  isSelected: boolean;
  title: string;
}

export const StakingSelectTab = ({
  onClick,
  isSelected,
  title,
}: IStakingSelectTabProps) => {
  const { fileTheme } = useContext(FileThemeContext);
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-[110px] sm:w-[150px] pt-1 text-center border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-0 border-2 ${
        isSelected ? "text-gray-800" : "text-gray-500"
      }`}
    >
      {title}
      {isSelected && (
        <div
          className={
            fileTheme === "love" ? "w-full flex bg-[#C1C1C1] h-2 mb-[-4px]" : ""
          }
        />
      )}
    </div>
  );
};
