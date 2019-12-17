import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography, Form, Button } from "antd";
import FormInputGroup from "../../Common/FormInputGroup";
import SelectListGroup from "../../Common/SelectListGroup";
import SelectDateGroup from "../../Common/SelectDateGroup";
import { createUser } from "../../../actions/auth";
import {
  genderOptions,
  bloodTypeOptions
} from "../../../common-data/OptionList";
import {
  formItemLayout,
  tailFormItemLayout
} from "../../../common-data/formLayoutData";

import "./style.scss";

const { Paragraph, Title } = Typography;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      DOB: "",
      gender: "",
      bloodType: "",
      personalCard: "",
      personalCardLocation: "",
      address: "",
      phone: "",

      errors: {}
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      errors: nextProps.errors
    });
  };

  onChange = e => {
    if (e._isAMomentObject) {
      this.setState({
        DOB: e
      });
    } else if (e.target) {
      this.setState({
        [`${e.target.name}`]: e.target.value
      });
    } else {
      var regex = /N/;
      if (regex.test(e)) {
        this.setState({
          gender: e
        });
      } else {
        this.setState({
          bloodType: e
        });
      }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = this.state;
    this.props.createUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Typography className="requires">
          <Title level={3}>Điều kiện hiến máu</Title>
          <Paragraph>
            <ul>
              <li>
                <p>Tuổi từ 18 đến 60</p>
              </li>
              <li>
                <p>
                  Cân nặng ít nhất là 42kg đối với phụ nữ, 45kg đối với nam
                  giới.
                </p>
              </li>
              <li>
                <p>
                  Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các
                  bệnh lây nhiễm qua đường truyền máu khác.
                </p>
              </li>
              <li>
                <p>
                  Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.
                </p>
              </li>
            </ul>
          </Paragraph>
        </Typography>

        <Form
          {...formItemLayout}
          onSubmit={this.onSubmit}
          className="register-form"
        >
          <Title className="register-form__title" level={3}>
            Đăng ký
          </Title>
          <div className="register-form__input-group">
            <FormInputGroup
              name="name"
              iconType="user"
              placeholder="Họ tên"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            ></FormInputGroup>
            <FormInputGroup
              name="email"
              placeholder="Email"
              iconType="mail"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            ></FormInputGroup>
            <FormInputGroup
              name="password"
              placeholder="Mật khẩu"
              type="password"
              iconType="lock"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            ></FormInputGroup>
            <FormInputGroup
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              type="password"
              iconType="lock"
              value={this.state.confirmPassword}
              onChange={this.onChange}
              error={errors.confirmPassword}
            ></FormInputGroup>
            <SelectDateGroup
              name="DOB"
              placeholder="Ngày sinh"
              value={this.state.DOB}
              onChange={this.onChange}
              error={errors.DOB}
            ></SelectDateGroup>
            <SelectListGroup
              name="gender"
              value={this.state.gender}
              placeholder="Chọn giới tính"
              onChange={this.onChange}
              options={genderOptions}
              error={errors.gender}
            ></SelectListGroup>
          </div>
          <div className="register-form__input-group">
            <SelectListGroup
              name="bloodType"
              placeholder="Chọn nhóm máu"
              value={this.state.bloodType}
              onChange={this.onChange}
              options={bloodTypeOptions}
              error={errors.bloodType}
            ></SelectListGroup>
            <FormInputGroup
              name="personalCard"
              placeholder="Số CMND"
              iconType="idcard"
              value={this.state.personalCard}
              onChange={this.onChange}
              error={errors.personalCard}
            ></FormInputGroup>
            <FormInputGroup
              name="personalCardLocation"
              placeholder="Nơi cấp CMND"
              iconType="idcard"
              value={this.state.personalCardLocation}
              onChange={this.onChange}
              error={errors.personalCardLocation}
            ></FormInputGroup>
            <FormInputGroup
              name="address"
              placeholder="Địa chỉ thường trú"
              iconType="home"
              value={this.state.address}
              onChange={this.onChange}
              error={errors.address}
            ></FormInputGroup>
            <FormInputGroup
              name="phone"
              placeholder="Số điện thoại"
              iconType="phone"
              value={this.state.phone}
              onChange={this.onChange}
              error={errors.phone}
            ></FormInputGroup>
          </div>
          <Form.Item className="register-form__btn">
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
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
