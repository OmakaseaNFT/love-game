import Image from "next/image";
import Link from "next/link";
import { MdArrowRight } from "react-icons/md";

export interface IStartMenuListItemProps {
  icon: any;
  url: string;
  name: string;
  menu: string;
  subMenu?: IStartMenuListItemProps[];
}

export const MenuListItem = ({
  icon,
  name,
  url,
  subMenu,
}: IStartMenuListItemProps) => {
  return (
    <Link
      href={url}
      className={`flex min-w-[200px] relative group flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer ${
        subMenu ? "border-gray-300 border-b-2" : ""
      }`}
    >
      <div className="flex flex-row items-center w-full gap-3 px-2 py-1">
        <Image src={icon} width={29} height={29} alt="icon" />

        <div className="text-[22px] text-gray-800 group-hover:text-white">
          <span dangerouslySetInnerHTML={{ __html: name }}></span>
        </div>
      </div>
      <div className={`mt-1 ml-2 ${subMenu ? "block" : "hidden"}`}>
        <MdArrowRight className="text-black text-[32px]" />
      </div>

      {subMenu && (
        <div className="absolute bottom-0 left-[100%] hidden bg-gray-400 border border-b-2 border-r-2 font-windows border-b-black border-r-black border-t-white border-l-white group-hover:block">
          {subMenu.map((item, index) => (
            <MenuListItem key={`start-menu-list-item-${index}`} {...item} />
          ))}
        </div>
      )}
    </Link>
  );
};
