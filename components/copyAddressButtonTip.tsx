import ActiveButton from "./activeButton";
import { useCopyText } from "../system/hooks/useCopyText";

interface ICopyAddressButtonProps {
  address: string;
  label?: string;
  label2?: string;
}

export const CopyAddressButtonTip = ({
  address,
  label = "Tip:",
  label2,
}: ICopyAddressButtonProps) => {
  const { onCopyText, copied } = useCopyText();


  return (
    <ActiveButton
      text={copied ? "Copied.........." : `${label} ${label2}`}
      onClick={() => onCopyText(address)}
      isSmall
      isInactive
    />
  );
};
