import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import Table from "../../components/table";
import Convertor from "./Convertor";
import { getWalletHistory } from "../../services/WalletHistory";
import { transationHistory } from "../../utils/TableHeaders";
import Money from "./Money";
const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("Deposit");

  const color = "primary";
  const variant = "contained";
  return (
    <div>
      <Convertor />
      <Box m={1}>
        <Button
          color={color}
          variant={variant}
          startIcon={<Add />}
          onClick={() => {
            setModalOpen(true);
            setType("Deposit");
          }}
        >
          Deposit
        </Button>
        {"    "}
        <Button
          color={color}
          variant={variant}
          startIcon={<Remove />}
          onClick={() => {
            setModalOpen(true);
            setType("Withdrawl");
          }}
        >
          Withdrawl
        </Button>
      </Box>
      <Money open={modalOpen} setOpen={() => setModalOpen(false)} type={type} />
      <h1>History</h1>
      <Table tableService={getWalletHistory} headers={transationHistory} />
    </div>
  );
};
export default Dashboard;
