import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import getCurrencyList from "../../services/AllCurriencies";
import { TextField, Grid } from "@material-ui/core";
import SingleSelect from "../../components/SingleSelect";
import { makeStyles } from "@material-ui/core/styles";
import { depositAmount, withdrawlAmount } from "../../services/Wallet";
const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(4),
  },
}));
const Deposit = ({ open, setOpen, type }) => {
  const { container } = useStyles();
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(async () => {
    setCurrencyList(await getCurrencyList());
  }, []);
  const DepositForm = () => {
    return (
      <div className={container}>
        <Grid>
          <TextField
            label="Amount"
            type="number"
            name="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid>
          <SingleSelect
            options={currencyList}
            selected={currency}
            onChangeEvent={setCurrency}
          />
        </Grid>
      </div>
    );
  };

  const handleSave = async () => {
    var data = {
      Currency: currency,
      Amount: amount,
    };
    if (type == "Deposit") {
      let res = await depositAmount(data);
      alert(res?.message);
      setOpen(false);
    } else {
      let res = await withdrawlAmount(data);
      alert(res?.message);
      setOpen(false);
    }
  };

  return (
    <>
      <Modal
        title={type == "Deposit" ? "Deposit" : "Withdrawl"}
        handleSave={handleSave}
        formState={open}
        setFormState={setOpen}
        field={<DepositForm />}
      />
    </>
  );
};

export default Deposit;
