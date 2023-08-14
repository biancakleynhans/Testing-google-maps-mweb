const isDevelopment = () => {
    let isDevelopment = false;

    if (process && process.env.NODE_ENV === "development") {
        isDevelopment = true;
    }

    return isDevelopment;
};


const isDecimal = (num: number) => {
    return !!(num % 1);
}

const parseDecimal = (numberVal: number, int: number) => {

    if (Number.isInteger(numberVal)) {
        return numberVal.toFixed(int);
    } else {
        return numberVal
    }
};

const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const currencyFormat = (num: any, decimalPlaces: number) => {
    let tempNum = typeof num === 'string' ? parseFloat(num) : num;

    const spacedValue = tempNum.toFixed(decimalPlaces).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    const formattedValue = (spacedValue.split('.')[1] === '00') ? spacedValue.split('.')[0] : spacedValue;

    return (
        `R${formattedValue}`
    );
};

const guid = () => {
    return crypto.randomUUID();
};

const removeRand = (str: string): string | number => {
    str = str.toString();
    str = str.replace("R", "").replace(",", "");

    const rand = Number(str);

    if (str !== "Free") {
        const cents = (rand * 100) % 100;

        if (cents >= 1) {
            return str;
        } else {
            return rand;
        }
    } else {
        return 0;
    }
};

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent
    );
};

const formatSpeed = (speed: number) => {
    switch (speed) {
        case 1024:
            return "1Gbps";
        default:
            return `${speed}Mbps`;
    }
};

const dataDisplay = (strData: string, hasTerabByteValue: string) => {
    // console.log("data display: ", strData, hasTerabByteValue)
    switch (strData) {
        case hasTerabByteValue:
            return strData;
        case "0GB":
            return "Uncapped";
        default:
            return strData;
    }
};

export const Utilities = {
    isDevelopment: isDevelopment,
    parseDecimal: parseDecimal,
    numberWithCommas: numberWithCommas,
    removeRand: removeRand,
    currencyFormat: currencyFormat,
    guid: guid,
    isMobileDevice: isMobileDevice,
    dataDisplay: dataDisplay,
    formatSpeed: formatSpeed,
};

