import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../components/table/Content";
import { accountDetails } from "../../utils/TableHeaders";
import { getWalletDetails } from "../../services/Wallet";
const useStyles = makeStyles({
  heading: { textAlign: "center" },
  converter: {},
});

const AmountDetail = () => {
  const { heading } = useStyles();
  const [data, setData] = useState([]);
  useEffect(async () => {
    let data = await getWalletDetails();
    if (data?.length) setData(data);
  }, []);
  return (
    <>
      <h1 className={heading}>Account Details</h1>
      <Content data={data} headers={accountDetails} />
    </>
  );
};
export default AmountDetail;
