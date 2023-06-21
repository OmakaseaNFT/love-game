import { MdArrowRight } from "react-icons/md";

interface IExpandPoolUtilsButtonProps {
  isExpanded: boolean;
  onChangeExpanded: () => void;
}

export const ExpandPoolUtilsButton = ({
  isExpanded,
  onChangeExpanded,
}: IExpandPoolUtilsButtonProps) => {
  return (
    <button onClick={onChangeExpanded} className="relative">
      <MdArrowRight
        className={`text-black text-[28px] sm:text-[32px] ml-[-8px] my-auto ${
          isExpanded ? "-rotate-90" : "rotate-90"
        }`}
      />
    </button>
  );
};
