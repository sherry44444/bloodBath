import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";

const { Title, Paragraph } = Typography;

class Mission extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="mission">
        <div className="mission__hero-image">
          <h1 className="mission__hero-title">Sứ mệnh</h1>
        </div>
        <div className="mission__content-container">
          <Paragraph className="mission__content">
            Cùng với các tổ chức và nhóm hiến máu khác, chúng tôi chung tay góp
            sức kêu gọi sự đóng góp của cộng đồng trong công cuộc hiến máu cứu
            người. Bên cạnh đó chúng tôi cung cấp sự thuận tiện và nhanh chóng
            đến mức tối đa trong khâu đăng ký cũng như thực hiện nhằm đưa những
            giọt máu quý giá của những tâm lòng thiện nguyện đến được với các
            bệnh nhân.
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

Mission.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Mission);
