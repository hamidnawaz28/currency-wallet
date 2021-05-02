import BASE_ADDRESS from "../services/Config";
const getConfig = (method, endpoint, headers = {}, data = {}) => {
  return {
    method: method,
    url: `${BASE_ADDRESS}${endpoint}`,
    headers: headers,
    data: data,
  };
};
const headers = {
  "Content-Type": "application/json",
};
export { getConfig, headers };
