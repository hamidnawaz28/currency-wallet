import { WALLET_DETAILS, WITHDRAWL } from "./Endpoints";
import { getConfig, headers } from "../utils/ApiUtils";
import axios from "../utils/Api";
let user = localStorage.getItem("digitalUser");
user = JSON.parse(user);
user = user?.user?.id;
const getWalletDetails = async () => {
  try {
    let res = await axios(getConfig("get", `${WALLET_DETAILS}?user=${user}`));
    let data = Object.entries(res?.data?.[0]?.WalletAmount);
    let dataObj = data.map((item) => {
      return { Currency: item[0], Amount: item[1] };
    });
    return dataObj;
  } catch (err) {
    return err;
  }
};
const convertCurrency = async (fromCurrency) => {
  let currentWallet = await getWalletDetails();
  currentWallet = Object.fromEntries(
    currentWallet.map((item) => {
      return Object.values(item);
    })
  );
  let conversionRatesFromEUR = await axios.get(
    "https://api.exchangerate.host/latest"
  );
  conversionRatesFromEUR = conversionRatesFromEUR?.data?.rates;
  let walletInEUR = Object.keys(currentWallet).map((currency) => {
    return currentWallet[currency] / conversionRatesFromEUR[currency];
  });
  walletInEUR = walletInEUR.reduce((a, b) => a + b, 0);
  let fromRates = conversionRatesFromEUR[fromCurrency] * walletInEUR;
  return [fromRates];
};
const depositAmount = async (data) => {
  data = JSON.stringify(data);
  try {
    let res = await axios(
      getConfig("put", `${WALLET_DETAILS}/${user}/`, headers, data)
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const withdrawlAmount = async (data) => {
  data = JSON.stringify(data);
  try {
    let res = await axios(
      getConfig("put", `${WITHDRAWL}/${user}/`, headers, data)
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getWalletDetails, depositAmount, withdrawlAmount, convertCurrency };
