import { useAccount } from "wagmi";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { on } from "events";
import { getTermsAgreement, saveTermsAgreement } from "../../system/appUtils";
import { FileThemeContext } from "../../system/context/FileThemeContext";

interface ITermsAndConditionsWrapperProps {
  children: React.ReactNode;
}

export const TermsAndConditionsWrapper = ({
  children,
}: ITermsAndConditionsWrapperProps) => {
  const { fileTheme } = useContext(FileThemeContext)
  const [showTermsAndConditions, setShowTermsAndConditions] =
    useState<boolean>(false);
  const { address } = useAccount();
  const termsAndConditionsText =
    "By clicking AGREE you understand that the rules of LOVE are not bound by any jurisdiction, but by our own sovereign will as the creators of this protocol";
  const icon = "";

  const handleTermsAndConditions = (address: string) => {
    saveTermsAgreement(address);
    setShowTermsAndConditions(false);
  };
  useEffect(() => {
    if (address) {
      const hasAgreedToTerms: "true" | "false" = getTermsAgreement(address);
      if (hasAgreedToTerms === "false") {
        setShowTermsAndConditions(true);
      }
    }
  }, [address]);

  return (
    <>
      {showTermsAndConditions && (
        <div
          style={{ zIndex: 100 }}
          className="w-full h-full flex justify-center items-center fixed top-0"
        >
          <div className="w-[320px] h-[220px] bg-[#C1C1C1] border-t-white border-l-white border-r-black border-b-black border-2 flex flex-col font-windows items-center pb-4">
            <div className=" flex justify-end bg-[#0A0080] pl-1 w-[100%] h-[20px]">
              <div />
              <button className="mr-[1px]"></button>
            </div>
            <div className="flex flex-row items-center m-auto h-[100%] items-center overflow-hidden">
              {icon && <Image alt="" src={icon ?? ""} width={48} height={48} />}
              <div
                className={`px-2 flex h-[100%] items-center overflow-x-hidden overflow-y-auto`}
              >
                <p
                  style={{
                    width: "220px",
                    maxHeight: "100%",
                    textAlign: "center",
                  }}
                >
                  {termsAndConditionsText}
                </p>
              </div>
            </div>
            <button
              className={`btn my-[2px] w-[50%] ml-4`}
              onClick={() => handleTermsAndConditions(address!)}
            >
              Agree
            </button>
          </div>
        </div>
      )}
      {children}
    </>
  );
};
