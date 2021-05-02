import { useEffect, useState } from "react";
import { convertCurrency } from "../../src/services/Wallet";
const useConversion = (fromCurrency) => {
  let [fromResult, setFrom] = useState(0);
  const updateCurrencies = async () => {
    let res = await convertCurrency(fromCurrency);
    setFrom(res?.[0].toFixed(1));
  };
  useEffect(async () => {
    updateCurrencies();
  }, []);
  useEffect(() => {
    updateCurrencies();
  }, [fromCurrency]);
  return {
    fromResult,
  };
};

export default useConversion;
