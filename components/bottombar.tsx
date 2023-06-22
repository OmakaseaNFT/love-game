import { truncateEthAddress } from "@/system/appUtils";
import { useCopyText } from "@/system/hooks/useCopyText";
import { bottomBarList, contractAddressLove } from "@/utils/constant";
import { IStartMenuListItemProps, MenuListItem } from "./MenuListItem";

const BottomBar = () => {
  const { onCopyText, copied } = useCopyText();

  return (
    <div className="relative flex flex-row ">
      <div className="bg-[#C1C1C1] w-[185px] sm:w-[240px] border-r-2 border border-b-2 border-b-black border-r-black border-t-white border-l-white">
        <div
          className={`flex flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer sm:hidden`}
        >
          <div className="flex flex-row items-center w-full">
            <div className="py-1 justify-center items-center w-[68px] flex">
              CA:
            </div>
            <div
              className="text-[22px] truncate"
              onClick={() => onCopyText(contractAddressLove)}
            >
              {copied
                ? "Copied.........."
                : `${truncateEthAddress(contractAddressLove)}`}
            </div>
          </div>
        </div>

        {bottomBarList.map((item, index) => (
          <MenuListItem
            key={`start-menu-list-item-${index}`}
            {...(item as IStartMenuListItemProps)}
          />
        ))}
      </div>
    </div>
  );
};
export default BottomBar;
