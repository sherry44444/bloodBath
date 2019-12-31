import React from "react";
import PropTypes from "prop-types";
import { Form, DatePicker } from "antd";

const SelectDateGroup = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  error
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

SelectDateGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,

  onChange: PropTypes.func.isRequired
};

export default Form.create({ name: "register" })(SelectDateGroup);
