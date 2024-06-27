import Image from "next/image";
import { MdArrowRight } from "react-icons/md";

interface IStartMenuListItemProps {
  haveSub: boolean | undefined;
  onSelected: (selected: string) => void;
  onShowSide: (showSide: boolean) => void;
  icon: any;
  name: string;
  menu: string;
  link?: string;
}

export const StartMenuListItem = ({
  haveSub,
  onSelected,
  onShowSide,
  icon,
  name,
  menu,
  link,
}: IStartMenuListItemProps) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank"); // Open the provided link in a new tab
    } else if (!haveSub) {
      onSelected(menu); // Select the menu item if no link and no submenu
    }
    // If haveSub is true, you might want to handle another logic here
  };

  return (
    <div
      className={`flex flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer`}
      onMouseEnter={() => haveSub && onShowSide(true)}
      onMouseLeave={() => !haveSub && onShowSide(false)}
      onClick={handleClick}
    >
      <div className="flex flex-row items-center w-full">
        <div className="py-1 justify-center items-center w-[55px] flex">
          <Image src={icon} width={25} height={25} alt="icon" />
        </div>
        <div className="text-[18px]">

          <span dangerouslySetInnerHTML={{ __html: name }}></span> 
        </div>
      </div>
      <div className="mt-1 ml-2">
        {haveSub ? <MdArrowRight className="text-black text-[30px]" /> : null}
      </div>
    </div>
  );
};

export default StartMenuListItem;