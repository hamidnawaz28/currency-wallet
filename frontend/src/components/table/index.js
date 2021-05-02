import React, { useState } from "react";
import Content from "./Content";
import { TablePagination } from "@material-ui/core";
import { useTable } from "../../hooks";
const Table = ({ tableService, headers }) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const { data, count } = useTable(tableService, page, perPage);
  return (
    <>
      <Content data={data} headers={headers} />
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={perPage}
        page={page}
        onChangePage={(e, value) => setPage(value)}
        onChangeRowsPerPage={(e) => setPerPage(e?.target?.value)}
      />
    </>
  );
};
export default Table;
