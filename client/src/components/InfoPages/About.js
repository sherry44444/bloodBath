import React from "react";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";

const { Title, Paragraph } = Typography;

function About() {
  return (
    <div className="about">
      <div className="about__hero-image">
        <h1 className="about__hero-title">Về chúng tôi</h1>
      </div>
      <div className="about__content-container">
        <Paragraph className="about__content">
          Chúng tôi nòng cốt là các y bác sỹ tâm huyết và dày dặn kinh nghiệm
          tại các bệnh viện lớn, luôn trăn trở về tình trạng thiếu máu dự trữ
          tại các bệnh viện, dẫn đến nhiều cái chết thương tâm và đáng tiếc. Vì
          vậy chúng tôi lập nên tổ chức phi lợi nhuận này, nhằm mở rộng hơn sự
          đóng góp của cộng đồng trong công cuộc hiến máu cứu người. Mọi chi phí
          phát sinh đều từ các nguồn đóng góp.
        </Paragraph>
        <Link to="/register">Đăng ký ngay!</Link>
      </div>
    </div>
  );
}

export default About;
