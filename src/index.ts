export interface DictionaryProps {
  readonly words: string[][];
  readonly cent: string | string[];
  readonly million: string | string[];
  readonly billion: string | string[];
  readonly trillion: string | string[];
  readonly currency: string | string[];
  readonly thousand: string | string[];
  readonly declinationOfThousands?: (word: string) => string;
}

export interface Dict<T> {
  readonly [key: string]: T;
}

export type DictionaryType = Dict<Dict<DictionaryProps>>;

export enum Language {
  Uzbek = "uz",
  Russian = "ru",
  English = "en",
}

export enum CurrencyCode {
  RussianRuble = "RUR",
  UzbekistanSum = "UZS",
  UnitedStatesDollar = "USD",
  EURO = "EUR",
  GreatBritainPound = "GBP",
  KazakhTenge = "KZT",
  ChineseYuan = "CNY",
  KoreanWon = "KRW",
  JapaneseYen = "JPY",
  AUD = "AUD",
  AZN = "AZN",
  ALL = "ALL",
  DZD = "DZD",
  ARP = "ARP",
  AMD = "AMD",
  BYN = "BYN",
  BGN = "BGN",
  BOB = "BOB",
  BRL = "BRL",
  HUF = "HUF",
  VND = "VND",
  GTM = "GTM",
  HKD = "HKD",
  GEL = "GEL",
  DKK = "DKK",
  AED = "AED",
  DOP = "DOP",
  EGP = "EGP",
  INR = "INR",
  IND = "IND",
  JOD = "JOD",
  IRR = "IRR",
  ISK = "ISK",
  CAD = "CAD",
  KES = "KES",
  KGS = "KGS",
  COP = "COP",
  CUP = "CUP",
  KWD = "KWD",
  MGA = "MGA",
  MYR = "MYR",
  MAD = "MAD",
  MXP = "MXP",
  MDL = "MDL",
  MNT = "MNT",
  MMK = "MMK",
  NPR = "NPR",
  NGN = "NGN",
  NZD = "NZD",
  ILS = "ILS",
  TWD = "TWD",
  NOK = "NOK",
  OMR = "OMR",
  PKR = "PKR",
  PAB = "PAB",
  PYG = "PYG",
  PEN = "PEN",
  PLN = "PLN",
  RON = "RON",
  SAR = "SAR",
  RSD = "RSD",
  SGD = "SGD",
  THB = "THB",
  TZS = "TZS",
  TND = "TND",
  TRY = "TRY",
  UAH = "UAH",
  UYU = "UYU",
  PHP = "PHP",
  HRK = "HRK",
  CLP = "CLP",
  SEK = "SEK",
  CHF = "CHF",
  ETB = "ETB",
  ZAR = "ZAR",
  JMD = "JMD",
  NAN = "NAN",
}

function parseStringToArray(value: string | string[], withSpace?: boolean): string[] {
  const arr = typeof value === "string" ? Array(3).fill(value) : value;

  if (withSpace) {
    return arr.map((x) => x + " ");
  }

  return arr;
}

function toFloat(number: string): number {
  return parseFloat(number);
}
function toInteger(number: string): number {
  return parseInt(number);
}

function normalizeWordsArrays(words: string[][]): string[][] {
  const first = words[0];
  const second = words[1];
  const third = words[2];

  return [
    ["", ...first],
    ["", "", ...second],
    ["", ...third],
  ];
}

const plural = (count: string | number, options: string[]): string => {
  if (options.length !== 3) {
    return "";
  }

  const value = typeof count === "string" ? toInteger(count) : count;
  const full = Math.abs(value) % 100;
  const rest = full % 10;

  if (full > 10 && full < 20) {
    return options[2];
  }

  if (rest > 1 && rest < 5) {
    return options[1];
  }

  if (rest === 1) {
    return options[0];
  }

  return options[2];
};

const parseNumber = (
  number: string,
  count: number,
  {
    currency,
    million,
    billion,
    thousand,
    declinationOfThousands,
    trillion,
    words,
  }: DictionaryProps,
) => {
  let first;
  let second;
  let numeral = "";

  let value = number;

  const normalizedWords = normalizeWordsArrays(words);

  if (value.length === 3) {
    first = value.substr(0, 1);
    value = value.substr(1, 3);
    numeral = "" + normalizedWords[2][first] + " ";
  }

  // @ts-ignore
  if (value < 20) {
    numeral = numeral + normalizedWords[0][toFloat(value)] + " ";
  } else {
    first = value.substr(0, 1);
    second = value.substr(1, 2);
    numeral = numeral + normalizedWords[1][first] + " " + normalizedWords[0][second] + " ";
  }

  if (count === 0) {
    numeral = numeral + plural(value, parseStringToArray(currency));
  } else if (count === 1) {
    if (numeral !== "  ") {
      numeral = numeral + plural(value, parseStringToArray(thousand, true));

      if (declinationOfThousands) {
        numeral = declinationOfThousands(numeral);
      }
    }
  } else if (count === 2) {
    if (numeral !== "  ") {
      numeral = numeral + plural(value, parseStringToArray(million, true));
    }
  } else if (count === 3) {
    if (numeral !== "  ") {
      numeral = numeral + plural(value, parseStringToArray(billion, true));
    }
  } else if (count === 4) {
    numeral = numeral + plural(value, parseStringToArray(trillion, true));
  }

  return numeral;
};

interface ParseDecimalsOptionsProps {
  readonly showZeroCents?: boolean;
  readonly withStartZero?: boolean;
  readonly centDictionary: string | string[];
}

const parseDecimals = (
  number: number,
  { showZeroCents = true, centDictionary, withStartZero = true }: ParseDecimalsOptionsProps,
) => {
  const text = plural(number, parseStringToArray(centDictionary));

  const value = number;

  if (value === 0 && showZeroCents) {
    if (withStartZero) {
      return " 00 " + text;
    }

    return " 0 " + text;
  }

  if (value === 0 && !showZeroCents) {
    return "";
  }

  if (value < 10 && withStartZero) {
    return " 0" + value + " " + text;
  }

  return " " + value + " " + text;
};

interface FormatNumberToWordOptionProps {
  readonly language: Language;
  readonly withStartZero?: boolean;
  readonly showZeroCents?: boolean;
  readonly dictionary: DictionaryType;
  readonly currencyCode: CurrencyCode;
}

export const formatNumberToWord = (
  number: number | string,
  {
    currencyCode,
    language,
    dictionary,
    showZeroCents,
    withStartZero,
  }: FormatNumberToWordOptionProps,
) => {
  if (!number) {
    return "";
  }

  const isString = typeof number === "string";
  const isNumber = typeof number === "number";

  if (!isNumber && !isString) {
    return "";
  }

  let value = number as number;

  if (typeof number === "string") {
    value = toFloat(number.replace(",", "."));

    if (isNaN(value)) {
      return "";
    }
  }

  if (value <= 0) {
    return "";
  }

  let stringValue = value.toFixed(2);

  const split = stringValue.split(".");

  const decimals = split[1];
  stringValue = split[0];

  let digit;
  let count = 0;
  let parts = "";
  let numeral = "";
  let length = stringValue.length - 1;

  const currentDictionary = dictionary[currencyCode][language];

  while (length >= 0) {
    digit = stringValue.substr(length, 1);
    parts = digit + parts;

    if ((parts.length === 3 || length === 0) && !isNaN(toFloat(parts))) {
      numeral = parseNumber(parts, count, currentDictionary) + numeral;
      parts = "";
      count++;
    }

    length--;
  }

  numeral = numeral.replace(/\s+/g, " ");

  return (
    numeral +
    parseDecimals(toFloat(decimals), {
      showZeroCents,
      withStartZero,
      centDictionary: currentDictionary.cent,
    })
  );
};
