import Image from "next/image";
import { MdArrowRight } from "react-icons/md";


interface IPanelListItemProps2 {
  haveSub?: boolean;
  onSelected: (selected: string) => void;
  onShowSide?: (show: boolean) => void;
  onShowSide2?: (show: boolean) => void; // Add this prop
  icon: string;
  name: string;
  menu: string;
  link?: string;
}

const PanelListItem2 = ({
  haveSub = false,
  onSelected,
  onShowSide,
  onShowSide2, // Add this prop
  icon,
  name,
  menu,
  link,
}: IPanelListItemProps2) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    } else if (!haveSub) {
      onSelected(menu);
    }
  };

  return (
    <div
      className="flex flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer"
      onMouseEnter={() => {
        if (haveSub) {
          onShowSide?.(true);
          onShowSide2?.(true); // Show second-level menu
        }
      }}
      onClick={handleClick}
    >
      <div className="flex flex-row items-center w-full">
        <div className="py-1 justify-center items-center w-[55px] flex">
          <Image src={icon} width={25} height={25} alt="icon" />
        </div>
        <div className="text-[16px]">
          <span dangerouslySetInnerHTML={{ __html: name }}></span>
        </div>
      </div>
      <div className="mt-1 ml-2">
        {haveSub ? <MdArrowRight className="text-black text-[30px]" /> : null}
      </div>
    </div>
  );
};

export { PanelListItem2 };
