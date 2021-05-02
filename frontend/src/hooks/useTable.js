import { useEffect, useState } from "react";
const useTable = (tableService, page, perPage) => {
  const [data, setData] = useState([]);
  const [tcount, setCount] = useState(0);
  const getData = async () => {
    let { data, count } = await tableService(page, perPage);
    setData(data);
    setCount(count);
  };
  useEffect(() => {
    getData();
  }, [page, perPage]);
  useEffect(() => {
    getData();
  }, []);
  return { data, count: tcount };
};
export default useTable;
