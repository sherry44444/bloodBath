import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions/auth";
import { Link } from "react-router-dom";
import _ from "lodash";

import Text from "../Form/Text";
import Select from "../Form/Select";
import Footer from "../Footer";

import "bootstrap/dist/css/bootstrap.css";

const formConfig = [
  { name: "name", type: "name", value: "", vi_name: "Họ tên" },
  { name: "email", type: "email", value: "", vi_name: "Email" },
  { name: "password", type: "password", value: "", vi_name: "Mật khẩu" },
  {
    name: "password2",
    type: "password",
    value: "",
    vi_name: "Nhập lại mật khẩu"
  },
  { name: "DOB", type: "date", value: "", vi_name: "Ngày tháng năm sinh" },
  {
    name: "gender",
    type: "select",
    options: ["Nam", "Nữ"],
    value: "",
    vi_name: "Giới tính"
  },
  {
    name: "bloodType",
    type: "select",
    options: ["chưa biết", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    value: "",
    vi_name: "Nhóm máu"
  }
];

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      DOB: "",
      bloodType: "",
      gender: "",
      errors: {}
    };
  }

  getFieldValue = field => {
    const newState = { ...this.state, ...field };
    this.setState({ ...newState });
  };

  renderForm = () => {
    const { errors } = this.state;
    console.log(errors);

    return formConfig.map((item, key) => {
      switch (item.type) {
        case "select":
          return (
            <Select
              item={item}
              key={key}
              value={this.state[`${item.name}`]}
              errors={errors[`${item.name}`]}
              getFieldValue={this.getFieldValue}
            ></Select>
          );
        default:
          return (
            <Text
              item={item}
              key={key}
              value={this.state[`${item.name}`]}
              errors={errors[`${item.name}`]}
              getFieldValue={this.getFieldValue}
            ></Text>
          );
      }
    });
  };

  checkEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  displayDialog = () => {
    let loadingModal = document.getElementById("loadingModal");
    loadingModal.style.display = "none";
    var modal = document.getElementById("myModal");
    if (this.checkEmpty(this.state.errors)) {
      modal.style.display = "block";
    }

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  clearLoading = () => {
    let loadingModal = document.getElementById("loadingModal");
    loadingModal.style.display = "none";
  };

  onSubmit = e => {
    e.preventDefault();
    let loadingModal = document.getElementById("loadingModal");
    loadingModal.style.display = "block";
    const data = this.state;
    this.props.createUser(data, this.displayDialog, this.clearLoading);
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      errors: nextProps.errors
    });
  };

  render() {
    return (
      <div className="register-page-container">
        <div id="loadingModal" className="loading-modal">
          <div className="modal-box">
            <div className="loader"></div>
          </div>
        </div>
        <div id="myModal" className="modal">
          <div class="modal-content">
            <h2>Đăng ký thành công</h2>

            <button
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
        <div className="side-content">
          <h2>Điền kiện hiến máu</h2>
          <ul>
            <li>Độ tuổi từ 18 đến 60</li>
            <li>Có trạng thái tinh thần và sức khỏe tốt</li>
            <li>Cân nặng ít nhất: 42 kg (nữ) và 45 kg (nam)</li>
            <li>Lần hiến máu gần nhất cách 12 tuần trở lên</li>
            <li>Không nhiễm hay có nguy cơ nhiễm HIV</li>
            <li>Không bị viêm gan B và virus lây qua đường máu</li>
            <li>
              <p>Không bị bệnh tim mạch, huyết áp, hô hấp, dạ dày</p>
            </li>
          </ul>
        </div>
        <div className="register-box">
          <form className="register-form" onSubmit={this.onSubmit}>
            {this.renderForm()}
            <button>Đăng ký</button>
          </form>
          <p className="login-request">
            Đã có tài khoản? Hãy{" "}
            <Link to="/">
              <span>đăng nhập</span>
            </Link>{" "}
            ngay!
          </p>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createUser }
)(Register);
