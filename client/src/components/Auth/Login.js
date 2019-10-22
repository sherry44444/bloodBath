import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Text from "../Form/Text";
import Select from "../Form/Select";
import { login } from "../../actions/auth";
import Footer from "../Footer";

import "bootstrap/dist/css/bootstrap.css";

import "./style.scss";

import bloodDrop from "../../image/blood_drop.png";

const formConfig = [
  { name: "email", type: "text", value: "", vi_name: "Email" },
  { name: "password", type: "password", value: "", vi_name: "Mật khẩu" }
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      errors: {}
    };
  }

  getFieldValue = field => {
    const newState = { ...this.state, ...field };
    this.setState({ ...newState });
  };

  toProfile = () => {
    window.location.href = "/profile";
  };

  clearLoading = () => {
    let loadingModal = document.getElementById("loadingModal");
    loadingModal.style.display = "none";
  };

  onSubmit = e => {
    e.preventDefault();
    var loadingModal = document.getElementById("loadingModal");
    loadingModal.style.display = "block";
    const data = this.state;
    this.props.login(data, this.toProfile, this.clearLoading);
  };

  renderForm = () => {
    const { errors } = this.state;
    return formConfig.map((item, index) => {
      switch (item.type) {
        case "select":
          return (
            <Select
              // className="login-select"
              key={index}
              item={item}
              value={this.state[`${item.name}`]}
              errors={errors[`${item.name}`]}
              getFieldValue={this.getFieldValue}
            />
          );

        default:
          return (
            <Text
              // className="login-text"
              key={index}
              item={item}
              value={this.state[`${item.name}`]}
              errors={errors[`${item.name}`]}
              getFieldValue={this.getFieldValue}
            />
          );
      }
    });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      errors: nextProps.errors
    });
  };

  render() {
    return (
      <div className="login-page-container">
        <div id="loadingModal" className="loading-modal">
          <div className="modal-box">
            <div className="loader"></div>
          </div>
        </div>
        <div className="login-page-content">
          <img src={bloodDrop} alt="blood drop" />
          <p>Một giọt máu đào</p>
          <p>hơn ao nước lã</p>
        </div>
        <div className="login-box">
          <h1 className="box-content">Đăng nhập</h1>
          <form className="login-form" onSubmit={this.onSubmit}>
            {this.renderForm()}

            <button>Đăng nhập</button>
          </form>
          <div className="register-request">
            Lần đầu đi hiến máu? Hãy{" "}
            <Link to="/register">
              <span>đăng ký</span>
            </Link>{" "}
            ngay!
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
