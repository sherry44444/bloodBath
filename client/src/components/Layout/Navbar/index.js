import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { clearCurrentProfile } from "../../../actions/user";
import { Menu, Typography } from "antd";
import "./style.scss";
const { Title } = Typography;

class Navbar extends Component {
  state = {
    current: ""
  };

  logout = e => {
    this.props.clearCurrentProfile();
    this.props.logout();
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="navbar">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          {isAuthenticated ? (
            <Title level={3} className="navbar__logo">
              <Link to="/profile">BloodBath</Link>
            </Title>
          ) : (
            <Title level={3} className="navbar__logo">
              <Link to="/">BloodBath</Link>
            </Title>
          )}
          <Menu.Item key="mission">
            <Link to="/mission">Sứ mệnh</Link>
          </Menu.Item>
          <Menu.Item key="vision">
            <Link to="/vision">Tầm nhìn</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">Về chúng tôi</Link>
          </Menu.Item>
          {isAuthenticated && (
            <Menu.Item key="logout">
              <Link to="/" onClick={this.logout}>
                Đăng xuất
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, clearCurrentProfile })(
  Navbar
);
