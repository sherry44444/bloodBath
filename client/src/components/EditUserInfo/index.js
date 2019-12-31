import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Typography } from "antd";
import { getCurrentUser, editUser } from "../../actions/user";

import FormInputGroup from "../Common/FormInputGroup";
import SelectDateGroup from "../Common/SelectDateGroup";
import SelectListGroup from "../Common/SelectListGroup";

import { genderOptions, bloodTypeOptions } from "../../common-data/OptionList";
import moment from "moment";
import Spinner from "../Layout/Spinner/";
import "./style.scss";

const { Title } = Typography;

class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
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

  componentDidMount = () => {
    this.props.getCurrentUser();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.user.user) {
      const { user } = nextProps.user;
      this.setState({
        name: user.name,
        email: user.email,
        DOB: moment(user.DOB),
        gender: user.gender,
        bloodType: user.bloodType,
        personalCard: user.personalCard,
        personalCardLocation: user.personalCardLocation,
        address: user.address,
        phone: user.phone
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    this.props.editUser(this.state, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 6 }
      }
    };

    let content;
    if (!this.props.user.user) {
      content = <Spinner></Spinner>;
    } else {
      content = (
        <Form
          {...formItemLayout}
          onSubmit={this.onSubmit}
          className="edit-form"
        >
          <Title className="edit-form__title" level={3}>
            Sửa thông tin
          </Title>
          <FormInputGroup
            name="name"
            label="Họ tên"
            iconType="user"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          ></FormInputGroup>
          <FormInputGroup
            name="email"
            label="Email"
            iconType="mail"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          ></FormInputGroup>
          <SelectListGroup
            name="gender"
            label="Giới tính"
            defaultValue="Nam"
            value={this.state.gender}
            onChange={this.onChange}
            options={genderOptions}
            error={errors.gender}
          ></SelectListGroup>
          <SelectListGroup
            name="bloodType"
            label="Nhóm máu"
            defaultValue="O+"
            value={this.state.bloodType}
            onChange={this.onChange}
            options={bloodTypeOptions}
            width={320}
            error={errors.bloodType}
          ></SelectListGroup>
          <SelectDateGroup
            name="DOB"
            label="Ngày sinh"
            value={this.state.DOB}
            onChange={this.onChange}
            error={errors.DOB}
          ></SelectDateGroup>
          <FormInputGroup
            name="personalCard"
            label="Số CMND"
            iconType="idcard"
            value={this.state.personalCard}
            onChange={this.onChange}
            error={errors.personalCard}
          ></FormInputGroup>
          <FormInputGroup
            name="personalCardLocation"
            label="Nơi cấp CMND"
            iconType="idcard"
            value={this.state.personalCardLocation}
            onChange={this.onChange}
            error={errors.personalCardLocation}
          ></FormInputGroup>
          <FormInputGroup
            name="address"
            label="Địa chỉ thường trú"
            iconType="home"
            value={this.state.address}
            onChange={this.onChange}
            error={errors.address}
          ></FormInputGroup>
          <FormInputGroup
            name="phone"
            label="Số điện thoại"
            iconType="phone"
            value={this.state.phone}
            onChange={this.onChange}
            error={errors.phone}
          ></FormInputGroup>
          <Form.Item className="edit-form__btn">
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      );
    }
    return <div className="edit-page-container">{content}</div>;
  }
}

EditUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.users,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentUser, editUser })(
  EditUserInfo
);
