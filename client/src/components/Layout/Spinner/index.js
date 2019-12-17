import React from "react";
import { Spin } from "antd";
import "./style.scss";

function Spinner() {
  return (
    <div>
      <Spin size="large" className="spin"></Spin>
    </div>
  );
}

export default Spinner;
