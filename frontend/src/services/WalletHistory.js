import { WALLET_HISTORY } from "./Endpoints";
import { getConfig } from "../utils/ApiUtils";
import axios from "../utils/Api";
let user = localStorage.getItem("digitalUser");
user = JSON.parse(user);
user = user?.user?.id;
const getWalletHistory = async (page, perPage) => {
  let endpoint = `${WALLET_HISTORY}?user=${user}&page=${page}&perPage=${perPage}`;
  let res = await axios(getConfig("get", endpoint));
  try {
    console.log(JSON.stringify(res.data));
    return { data: res?.data?.data, count: res?.data?.count };
  } catch (err) {
    return err;
  }
};
export { getWalletHistory };
