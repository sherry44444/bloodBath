import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const SelectListGroup = ({
  name,
  value,
  label,
  placeholder,
  onChange,
  options,
  error
}) => {
  const selectOptions = options.map(opt => (
    <Option key={opt.label} value={opt.value}>
      {opt.label}
    </Option>
  ));
  return (
    <Form.Item label={label} validateStatus={error && "error"} help={error}>
      <Select
        name={name}
        value={value ? value : undefined}
        placeholder={placeholder}
        onChange={onChange}
        style={{ width: 340 }}
      >
        {selectOptions}
      </Select>
    </Form.Item>
  );
};

export default Form.create({ name: "register" })(SelectListGroup);
