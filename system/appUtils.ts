
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

export const thousandSeparator = (value: number) => {
    let formattedValue = value?.toLocaleString("en-US", {
      style: "decimal",
      maximumFractionDigits: 3,
    });

    return formattedValue;
  };


export const saveTermsAgreement = (
    address: string
) => {
    if (typeof window !== "undefined" && !!address) {
        localStorage.setItem(`${address}-terms-agreement`, "true");
    }
};

export const getTermsAgreement = (
    address: string
) => {
    const objectsString = localStorage.getItem(`${address}-terms-agreement`);
    console.log("objectsString", objectsString);
    if (objectsString) {
        return JSON.parse(objectsString);
    }
    return "false";
};