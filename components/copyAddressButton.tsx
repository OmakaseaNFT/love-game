import { truncateEthAddress } from "../system/appUtils";
import ActiveButton from "./activeButton";
import { useCopyText } from "../system/hooks/useCopyText";

interface ICopyAddressButtonProps {
  address: string;
}

export const CopyAddressButton = ({ address }: ICopyAddressButtonProps) => {
  const { onCopyText, copied} = useCopyText();

  return (
    <ActiveButton
      text={copied ? "Copied.........." : `CA: ${truncateEthAddress(address)}`}
      onClick={() => onCopyText(address)}
      isSmall
      isInactive
    />
  );
};
