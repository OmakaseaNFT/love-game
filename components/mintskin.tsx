import { useState, useEffect } from "react";

interface Props {
  closeMe: () => void;
}

const MintSkin = ({ closeMe }: Props) => {
  return (
    <div className="w-full flex flex-col pt-[6px]">
      <div className="flex-col w-full">
        <div>You haven&apos;t unlocked this theme yet, unlock for 10,000 $LOVE?</div>

        <div className="w-full flex items-center justify-center flex-row">
          <button
            onClick={() => {
              const url = "https://www.youtube.com/watch?v=HEXWRTEbj1I";
              window.open(url, "_blank");
            }}
            className="btn w-auto h-[35px] m-auto mt-2 mb-4"
            dangerouslySetInnerHTML={{ __html: "Unlock" }}
          />
          <button
            onClick={closeMe}
            className="btn w-auto h-[35px] m-auto mt-2 mb-4"
            dangerouslySetInnerHTML={{ __html: "Cancel" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MintSkin;
