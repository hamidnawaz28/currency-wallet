import React from "react";
import { InputLabel, FormControl, Select } from "@material-ui/core";
function SingleSelect({ label, options, selected, onChangeEvent }) {
  const allOptions = options?.map((item, index) => (
    <option key={index}>{item}</option>
  ));
  return (
    <FormControl>
      <Select
        native
        value={selected}
        onChange={(e) => onChangeEvent(e.target.value)}
      >
        {allOptions}
      </Select>
    </FormControl>
  );
}
export default SingleSelect;
