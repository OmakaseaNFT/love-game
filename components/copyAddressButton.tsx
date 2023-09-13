import { truncateEthAddress } from "../system/appUtils";
import ActiveButton from "./activeButton";
import { useCopyText } from "../system/hooks/useCopyText";

interface ICopyAddressButtonProps {
  address: string;
  label?: string;
}

export const CopyAddressButton = ({
  address,
  label = "CA:"
}: ICopyAddressButtonProps) => {
  const { onCopyText, copied} = useCopyText();

  return (
    <ActiveButton
      text={copied ? "Copied.........." : `${label} ${truncateEthAddress(address)}`}
      onClick={() => onCopyText(address)}
      isSmall
      isInactive
    />
  );
};
