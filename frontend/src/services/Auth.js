import { SIGN_IN, SIGN_UP } from "./Endpoints";
import { getConfig, headers } from "../utils/ApiUtils";
import axios from "../utils/Api";
const logIn = async (data) => {
  data = JSON.stringify(data);
  try {
    let res = await axios(getConfig("post", SIGN_IN, headers, data));
    const { status, data: resData } = res;
    const { token } = resData;
    if (status == 200 && token) {
      localStorage.setItem("digitalUser", JSON.stringify(resData));
      return "Successful";
    } else {
      return "User or Password don't match";
    }
  } catch (err) {
    console.log(err);
  }
};
const signUp = async (data) => {
  data = JSON.stringify(data);
  try {
    let res = await axios(getConfig("post", SIGN_UP, headers, data));
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};
export { logIn, signUp };
