// Dependencies
import React from "react";

// Antd components
import { Select } from "antd";
const { Option } = Select;

const ListPicker = ({ lists, onSelectChange }) => {

  let options;
  if (lists.length > 0) {
    options = lists.map(({ _id, title }) => (
      <Option key={_id} value={_id}>
        { title }
      </Option>
    ));
  } else {
    options = <Option>Create new list</Option>;
  }

  return (
    <Select style={{ width: "300px" }} onChange={onSelectChange}>{options}</Select>
  )
}

export default ListPicker;