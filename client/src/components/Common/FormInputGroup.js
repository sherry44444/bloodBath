import React from "react";
import { Form, Input, Icon } from "antd";

const FormInputGroup = ({
  name,
  label,
  type,
  iconType,
  value,
  placeholder,
  onChange,
  style,
  error
}) => {
  return (
    <Form.Item label={label} validateStatus={error && "error"} help={error}>
      <Input
        name={name}
        type={type}
        value={value}
        prefix={<Icon type={iconType} style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder={placeholder}
        onChange={onChange}
        style={style || { width: 340 }}
      />
    </Form.Item>
  );
};

export default Form.create({ name: "normal_login" })(FormInputGroup);
