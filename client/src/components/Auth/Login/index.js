import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Typography } from "antd";
import FormInputGroup from "../../Common/FormInputGroup";

import "antd/dist/antd.css";
import "./style.scss";

import { login } from "../../../actions/auth";

const { Title, Text } = Typography;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      errors: {}
    };
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    this.props.login(data);
  };

  onChange = e => {
    this.setState({
      [`${e.target.name}`]: e.target.value
    });
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-page__content">
          <h1 level={1}>Chào mừng</h1>
          <Text>Hãy cùng chung tay</Text>
          <br />
          <Text>Hiến máu cứu người</Text>
        </div>
        <div className="login-page__form-container">
          <Title level={2}>Đăng nhập</Title>
          <Form onSubmit={this.onSubmit} className="login-page__login-form">
            <FormInputGroup
              name="email"
              type="email"
              iconType="user"
              value={this.state.email}
              placeholder="Email"
              onChange={this.onChange}
              style={{ width: 250 }}
              error={this.state.errors.email}
            ></FormInputGroup>
            <FormInputGroup
              name="password"
              type="password"
              iconType="lock"
              value={this.state.password}
              placeholder="Mật khẩu"
              onChange={this.onChange}
              style={{ width: 250 }}
              error={this.state.errors.password}
            ></FormInputGroup>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-page__login-form-button"
              >
                Đăng nhập
              </Button>
              Hoặc <Link to="/register">Đăng ký ngay!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { login })(Login);
