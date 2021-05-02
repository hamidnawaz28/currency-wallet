import axios from "../utils/Api";
const getCurrencyList = async () => {
  try {
    let res = await axios.get("https://api.exchangerate.host/latest");
    return Object.keys(res?.data?.rates);
  } catch (err) {
    console.log(err);
  }
};
export default getCurrencyList;
