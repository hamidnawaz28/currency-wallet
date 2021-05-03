import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SingleSelect from "../../components/SingleSelect";
import { useConversion } from "../../hooks";
import getCurrencyList from "../../services/AllCurriencies";
const useStyles = makeStyles({
  heading: { textAlign: "center" },
  converter: {
    display: "flex",
    flexDirection: "row",
    margin: "0px 20%",
    "& div": {
      width: "100%",
      textAlign: "center",
    },
    "& div:nth-child(2)": {
      alignSelf: "center",
    },
  },
});
const Convertor = () => {
  const { heading, converter } = useStyles();

  const [fromAmount, setFromAmount] = useState("EUR");
  const [currencyList, setCurrencyList] = useState([]);

  const { fromResult } = useConversion(fromAmount);

  useEffect(async () => {
    setCurrencyList(await getCurrencyList());
  }, []);

  return (
    <>
      <h3 className={heading}>Total {"&"} Converstion</h3>
      <div className={converter}>
        <div>
          <SingleSelect
            options={currencyList}
            selected={fromAmount}
            onChangeEvent={setFromAmount}
          />
          <p>
            Total Amount in {fromAmount}: <b>{fromResult}</b>
          </p>
        </div>
      </div>
    </>
  );
};
export default Convertor;
