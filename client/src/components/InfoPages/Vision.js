import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";

const { Title, Paragraph } = Typography;

class Vision extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="vision">
        <div className="vision__hero-image">
          <h1 className="vision__hero-title">Tầm nhìn</h1>
        </div>
        <div className="vision__content-container">
          <Paragraph className="vision__content">
            Bên cạnh 3 cơ sở tại 3 thành phố lớn là Hà Nội, Đà Nẵng và Thành phố
            Hồ Chí Minh, chúng tôi đang có kế hoạch mở thêm các cơ sở tại Huế,
            Hải Phòng và Cần Thơ. Cùng với đó là tầm nhìn trong tương lai có thể
            tiến hành thực hiện hiến máu vào tất cả các ngày chủ nhật hàng tuần
            tại tất cả các cơ sở trong cả nước.
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

Vision.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Vision);
