const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export const truncateEthAddress = (address: string) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const thousandSeparator = (
  value: number,
  maxDecimals?: number | undefined,
  minDecimals?: number | undefined
) => {
  let formattedValue = value?.toLocaleString("en-US", {
    style: "decimal",
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  });

  return formattedValue;
};

export const roundUSDToCents = (num: number) => Number(num.toFixed(2));

export const saveTermsAgreement = (address: string) => {
  if (typeof window !== "undefined" && !!address) {
    localStorage.setItem(`${address}-terms-agreement`, "true");
  }
};

export const getTermsAgreement = (address: string) => {
  const objectsString = localStorage.getItem(`${address}-terms-agreement`);
  if (objectsString) {
    return JSON.parse(objectsString);
  }
  return "false";
};

export const getSigAndMsgFromStorage = (
  address: string
): { sig: string; msg: string } => {
  if (typeof window !== "undefined") {
    const storageSigAndMsg = localStorage.getItem(address);

    if (storageSigAndMsg) {
      const parsedSigAndMsg: { sig: string; msg: string } =
        JSON.parse(storageSigAndMsg);
      return parsedSigAndMsg;
    }
  }

  return { sig: "", msg: "" };
};
