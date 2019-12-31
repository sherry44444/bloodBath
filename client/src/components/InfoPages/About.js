import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";

const { Title, Paragraph } = Typography;

class About extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="about">
        <div className="about__hero-image">
          <h1 className="about__hero-title">Về chúng tôi</h1>
        </div>
        <div className="about__content-container">
          <Paragraph className="about__content">
            Chúng tôi nòng cốt là các y bác sỹ tâm huyết và dày dặn kinh nghiệm
            tại các bệnh viện lớn, luôn trăn trở về tình trạng thiếu máu dự trữ
            tại các bệnh viện, dẫn đến nhiều cái chết thương tâm và đáng tiếc.
            Vì vậy chúng tôi lập nên tổ chức phi lợi nhuận này, nhằm mở rộng hơn
            sự đóng góp của cộng đồng trong công cuộc hiến máu cứu người. Mọi
            chi phí phát sinh đều từ các nguồn đóng góp.
          </Paragraph>
          {isAuthenticated ? (
            <Button type="primary">
              <Link to="/profile">Trở về Profile</Link>
            </Button>
          ) : (
            <Button type="primary">
              <Link to="/">Trở về trang chính</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }
}

About.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(About);
