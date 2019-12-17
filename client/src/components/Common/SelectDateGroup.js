import React from "react";
import { Form, DatePicker } from "antd";

const SelectDateGroup = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  form
}) => {
  return (
    <Form.Item label={label} validateStatus={error && "error"} help={error}>
      <DatePicker
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        format="DD/MM/YYYY"
        style={{ width: 340 }}
      />
    </Form.Item>
  );
};
export default Form.create({ name: "register" })(SelectDateGroup);
