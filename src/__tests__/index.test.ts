import { CurrencyCode, DictionaryProps, formatNumberToWord, Language } from "../index";

const RUSSIAN_RUBLE_DICTIONARY: DictionaryProps = {
  cent: ["копейка", "копейки", "копеек"],
  currency: ["рубль", "рубля", "рублей"],
  thousand: ["тысяча", "тысячи", "тысяч"],
  million: ["миллион", "миллиона", "миллионов"],
  billion: ["миллиард", "миллиарда", "миллиардов"],
  trillion: ["триллион", "триллиона", "триллионов"],
  declinationOfThousands: (x) => x.replace("один ", "одна ").replace("два ", "две "),
  words: [
    [
      "один",
      "два",
      "три",
      "четыре",
      "пять",
      "шесть",
      "семь",
      "восемь",
      "девять",
      "десять",
      "одиннадцать",
      "двенадцать",
      "тринадцать",
      "четырнадцать",
      "пятнадцать",
      "шестнадцать",
      "семнадцать",
      "восемнадцать",
      "девятнадцать",
    ],
    [
      "двадцать",
      "тридцать",
      "сорок",
      "пятьдесят",
      "шестьдесят",
      "семьдесят",
      "восемьдесят",
      "девяносто",
    ],
    [
      "сто",
      "двести",
      "триста",
      "четыреста",
      "пятьсот",
      "шестьсот",
      "семьсот",
      "восемьсот",
      "девятьсот",
    ],
  ],
};

const ENGLISH_RUBLE_DICTIONARY: DictionaryProps = {
  cent: "kopeck",
  currency: "ruble",
  million: "million",
  billion: "billion",
  trillion: "trillion",
  thousand: "thousand",
  words: [
    [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ],
    ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
    [
      "one hundred",
      "two hundred",
      "three hundred",
      "four hundred",
      "five hundred",
      "six hundred",
      "seven hundred",
      "eight hundred",
      "nine hundred",
    ],
  ],
};

const ERROR_RUSSIAN_RUBLE_DICTIONARY: DictionaryProps = {
  cent: ["копейка", "копейки"],
  currency: ["рубль", "рубля", "рублей"],
  thousand: ["тысяча", "тысячи", "тысяч"],
  million: ["миллион", "миллиона", "миллионов"],
  billion: ["миллиард", "миллиарда", "миллиардов"],
  trillion: ["триллион", "триллиона", "триллионов"],
  declinationOfThousands: (x) => x.replace("один ", "одна ").replace("два ", "две "),
  words: [
    [
      "один",
      "два",
      "три",
      "четыре",
      "пять",
      "шесть",
      "семь",
      "восемь",
      "девять",
      "десять",
      "одиннадцать",
      "двенадцать",
      "тринадцать",
      "четырнадцать",
      "пятнадцать",
      "шестнадцать",
      "семнадцать",
      "восемнадцать",
      "девятнадцать",
    ],
    [
      "двадцать",
      "тридцать",
      "сорок",
      "пятьдесят",
      "шестьдесят",
      "семьдесят",
      "восемьдесят",
      "девяносто",
    ],
    [
      "сто",
      "двести",
      "триста",
      "четыреста",
      "пятьсот",
      "шестьсот",
      "семьсот",
      "восемьсот",
      "девятьсот",
    ],
  ],
};

describe("testing `formatNumberToWord`", () => {
  test("should return the string from number", () => {
    const result = formatNumberToWord(123, {
      language: Language.Russian,
      currencyCode: CurrencyCode.RussianRuble,
      dictionary: {
        [CurrencyCode.RussianRuble]: {
          [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
        },
      },
    });

    expect(typeof result).toBe("string");
  });

  test("should return the string from string", () => {
    const result = formatNumberToWord("123", {
      language: Language.Russian,
      currencyCode: CurrencyCode.RussianRuble,
      dictionary: {
        [CurrencyCode.RussianRuble]: {
          [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
        },
      },
    });

    expect(typeof result).toBe("string");
  });

  test("should return an empty string", () => {
    const result = formatNumberToWord("test 123", {
      language: Language.Russian,
      currencyCode: CurrencyCode.RussianRuble,
      dictionary: {
        [CurrencyCode.RussianRuble]: {
          [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
        },
      },
    });

    expect(result).toBe("");
  });

  test("should return an empty string from number zero", () => {
    const result = formatNumberToWord(0, {
      showZeroCents: false,
      language: Language.Russian,
      currencyCode: CurrencyCode.RussianRuble,
      dictionary: {
        [CurrencyCode.RussianRuble]: {
          [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
        },
      },
    });

    expect(result).toBe("");
  });

  test("should return an empty string from string zero", () => {
    const result = formatNumberToWord("0", {
      showZeroCents: false,
      language: Language.Russian,
      currencyCode: CurrencyCode.RussianRuble,
      dictionary: {
        [CurrencyCode.RussianRuble]: {
          [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
        },
      },
    });

    expect(result).toBe("");
  });

  test("should return an empty string from non number and non string", () => {
    const result = formatNumberToWord(
      // @ts-ignore
      {},
      {
        showZeroCents: false,
        language: Language.Russian,
        currencyCode: CurrencyCode.RussianRuble,
        dictionary: {
          [CurrencyCode.RussianRuble]: {
            [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
          },
        },
      },
    );

    expect(result).toBe("");
  });

  describe("must return the number in words for the Russian ruble", () => {
    describe("in russian language", () => {
      test("with kopecks from the number (with first zero)", () => {
        const result = formatNumberToWord(123, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("сто двадцать три рубля 00 копеек");
      });

      test("with kopecks from the string (with first zero)", () => {
        const result = formatNumberToWord("123", {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("сто двадцать три рубля 00 копеек");
      });

      test("with kopecks from the string (without first zero)", () => {
        const result = formatNumberToWord("123", {
          withStartZero: false,
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("сто двадцать три рубля 0 копеек");
      });

      test("with kopecks from the string (without first zero)", () => {
        const result = formatNumberToWord("123", {
          withStartZero: false,
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("сто двадцать три рубля 0 копеек");
      });

      test("without kopecks", () => {
        const result = formatNumberToWord(123, {
          showZeroCents: false,
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("сто двадцать три рубля");
      });

      test("two-digit number", () => {
        const result = formatNumberToWord(12, {
          showZeroCents: false,
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("двенадцать рублей");
      });

      test("two-digit number with kopecks", () => {
        const result = formatNumberToWord(12, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("двенадцать рублей 00 копеек");
      });

      test("number with two-digits kopecks", () => {
        const result = formatNumberToWord(12.3, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("двенадцать рублей 30 копеек");
      });

      test("number with digits kopecks (with first zero)", () => {
        const result = formatNumberToWord(12.03, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("двенадцать рублей 03 копейки");
      });

      test("number with digits kopecks (without first zero)", () => {
        const result = formatNumberToWord(12.03, {
          withStartZero: false,
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("двенадцать рублей 3 копейки");
      });

      test("digit number with kopecks", () => {
        const result = formatNumberToWord(1, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("один рубль 00 копеек");
      });

      test("thousand number", () => {
        const result = formatNumberToWord(1000, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("одна тысяча рублей 00 копеек");
      });

      test("million number", () => {
        const result = formatNumberToWord(1000000, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("один миллион рублей 00 копеек");
      });

      test("billion number", () => {
        const result = formatNumberToWord(1000000000, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("один миллиард рублей 00 копеек");
      });

      test("trillion number", () => {
        const result = formatNumberToWord(1000000000000, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("один триллион рублей 00 копеек");
      });

      test("error dictionary", () => {
        const result = formatNumberToWord(1000000000, {
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: ERROR_RUSSIAN_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("один миллиард рублей 00 ");
      });
    });

    describe("in english language", () => {
      test("digits without kopecks", () => {
        const result = formatNumberToWord(123, {
          showZeroCents: false,
          language: Language.Russian,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.Russian]: ENGLISH_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("one hundred twenty three ruble");
      });

      test("thousand number", () => {
        const result = formatNumberToWord(1000, {
          language: Language.English,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.English]: ENGLISH_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("one thousand ruble 00 kopeck");
      });

      test("billion number", () => {
        const result = formatNumberToWord(1000000000, {
          language: Language.English,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.English]: ENGLISH_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("one billion ruble 00 kopeck");
      });

      test("trillion number", () => {
        const result = formatNumberToWord(1000000000000, {
          language: Language.English,
          currencyCode: CurrencyCode.RussianRuble,
          dictionary: {
            [CurrencyCode.RussianRuble]: {
              [Language.English]: ENGLISH_RUBLE_DICTIONARY,
            },
          },
        });

        expect(result).toBe("one trillion ruble 00 kopeck");
      });
    });
  });
});
