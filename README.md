## number-to-words

##### Написание числа прописью

```shell script
yarn add @victorzimnikov/number-to-words
```

##### Словарь

```typescript
/**
 * words - массив слов для единиц, десяктов и сотен
 * cent - массив или строка для ниписания слова "копейка"
 * million - массив или строка для ниписания слова "миллион"
 * billion - массив или строка для ниписания слова "миллиард"
 * currency - массив или строка для ниписания валюты
 * thousand - массив или строка для ниписания слова "тысяча"
 * declinationOfThousands - функция для форматирования префикса для тысяч
 */

interface DictionaryProps {
  readonly words: string[][];
  readonly cent: string | string[];
  readonly million: string | string[];
  readonly billion: string | string[];
  readonly currency: string | string[];
  readonly thousand: string | string[];
  readonly declinationOfThousands?: (word: string) => string;
}
```

##### Доступные языки

```typescript
export enum Language {
  Uzbek = "uz",
  Russian = "ru",
  English = "en",
}
```

##### Доступные валюты

```typescript
export enum CurrencyCode {
  RussianRuble = "RUR",
  UzbekistanSum = "UZS",
  UnitedStatesDollar = "USD",
}
```

##### Настройки преобразования

```typescript
/**
 * language - Язык преобразования
 * withStartZero - флаг, разрешающий добавлять ноль для перед единичными копейками. По-умолчанию - true
 * showZeroCents - флаг, разрешающий показывать "00 копеек". По-умолчанию - true
 * dictionary - словари
 * currencyCode - Валюта преобразования
 */

interface FormatNumberToWordOptionProps {
  readonly language: Language;
  readonly withStartZero?: boolean;
  readonly showZeroCents?: boolean;
  readonly dictionary: DictionaryType;
  readonly currencyCode: CurrencyCode;
}
```

##### Функция для преобразования

```typescript
function formatNumberToWord(
  number: number | string,
  {
    currencyCode,
    language,
    dictionary,
    showZeroCents,
    withStartZero,
  }: FormatNumberToWordOptionProps,
): string {}
```

##### Пример использования

```typescript
import {
  CurrencyCode,
  DictionaryType,
  formatNumberToWord,
  Language,
} from "@victorzimnikov/number-to-words";

export const NUMBER_TO_WORDS_DICTIONARY: DictionaryType = {
  [CurrencyCode.RussianRuble]: {
    [Language.Russian]: {
      cent: ["копейка", "копейки", "копеек"],
      currency: ["рубль", "рубля", "рублей"],
      thousand: ["тысяча", "тысячи", "тысяч"],
      million: ["миллион", "миллиона", "миллионов"],
      billion: ["миллиард", "миллиарда", "миллиардов"],
      declinationOfThousands: x => x.replace("один ", "одна ").replace("два ", "две "),
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
    },
  },
};

function numberToWords(number: string | number, options?: FormatNumberToWordOptionProps): string {
  return formatNumberToWord(number, {
    dictionary: NUMBER_TO_WORDS_DICTIONARY,

    ...options,
  });
}

const amountDetails = numberToWords(123, {
  language: Language.Russian,
  currencyCode: CurrencyCode.RussianRuble,
});

console.log(amountDetails); //  Сто двадцать три рубля 00 копеек
```
