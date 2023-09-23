import Image from "next/image";
import { MdArrowRight } from "react-icons/md";

interface IStartMenuListItemProps {
  haveSub: boolean | undefined;
  onSelected: (selected: string) => void;
  onShowSide: (showSide: boolean) => void;
  icon: any;
  name: string;
  menu: string;
}

export const StartMenuListItem = ({
  haveSub,
  onSelected,
  icon,
  name,
  menu,
  onShowSide,
}: IStartMenuListItemProps) => {
  return (
    <div
      className={`flex flex-row justify-between font-windows hover:text-button-hover-text hover:bg-button-hover-bg cursor-pointer ${
        haveSub ? "border-gray-300 border-b-2" : ""
      }`}
      onMouseEnter={() => haveSub && onShowSide(true)}
      onMouseLeave={() => !haveSub && onShowSide(false)}
      onClick={() => {
        if (!haveSub) {
          onSelected(menu);
        }
      }}
    >
      <div className="flex flex-row items-center w-full">
        <div className="py-1 justify-center items-center w-[68px] flex">
          <Image src={icon} width={29} height={29} alt="icon" />
        </div>
        <div className="text-[22px]">
          <span dangerouslySetInnerHTML={{ __html: name }}></span>
        </div>
      </div>
      <div className="mt-1 ml-2">
        {haveSub ? <MdArrowRight className="text-black text-[32px]" /> : null}
      </div>
    </div>
  );
};
