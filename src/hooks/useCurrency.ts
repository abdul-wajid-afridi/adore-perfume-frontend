import { Convert } from "easy-currencies";
import { useState, useEffect } from "react";

const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
) => {
  const value = await Convert(amount).from(fromCurrency).to(toCurrency);
  return Number(value.toFixed());
  // Round to three decimal places after dots it returns e.g 12.999989899888 just fixed
};

const useCurrency = (price: number) => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || ""
  );
  const [currencyRate, setCurrencyRate] = useState<number | null>(null);

  useEffect(function applyCurrencyConversionOnCurrencyChangeInHeader() {
    const handleCurrencyChange = () => {
      setCurrency(localStorage.getItem("currency") || "");
    };

    // this links it in header with   window.dispatchEvent(new Event("currencyChange"))
    window.addEventListener("currencyChange", handleCurrencyChange);

    return () => {
      window.removeEventListener("currencyChange", handleCurrencyChange);
    };
  }, []);

  useEffect(
    function fetchCurrencyRatesOnMount() {
      if (price) {
        const fetchCurrencyRate = async () => {
          const value = await convertCurrency(Number(price), "USD", currency);
          setCurrencyRate(value);
        };
        fetchCurrencyRate();
      }
    },
    [price, currency]
  );

  return [currency, currencyRate];
};

export default useCurrency;
