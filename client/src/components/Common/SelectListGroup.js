import React from "react";
import PropTypes from "prop-types";
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

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,

  onChange: PropTypes.func.isRequired
};

export default Form.create({ name: "register" })(SelectListGroup);
