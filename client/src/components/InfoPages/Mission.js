import React from "react";
import { Typography } from "antd";
import "./style.scss";

const { Title, Paragraph } = Typography;

function Mission() {
  return (
    <div className="mission">
      <div className="mission__hero-image">
        <h1 className="mission__hero-title">Sứ mệnh</h1>
      </div>
      <div className="mission__content-container">
        <Paragraph className="mission__content">
          Cùng với các tổ chức và nhóm hiến máu khác, chúng tôi chung tay góp
          sức kêu gọi sự đóng góp của cộng đồng trong công cuộc hiến máu cứu
          người. Bên cạnh đó chúng tôi cung cấp sự thuận tiện và nhanh chóng đến
          mức tối đa trong khâu đăng ký cũng như thực hiện nhằm đưa những giọt
          máu quý giá của những tâm lòng thiện nguyện đến được với các bệnh
          nhân.
        </Paragraph>
      </div>
    </div>
  );
}

export default Mission;
