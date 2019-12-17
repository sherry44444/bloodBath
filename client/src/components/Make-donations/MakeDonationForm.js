import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Modal } from "antd";
import SelectListGroup from "../Common/SelectListGroup";
import { postDonation } from "../../actions/donations";
import "./style.scss";

class MakeDonationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      donationTime: "",
      modalVisible: false,

      errors: {}
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onChange = e => {
    var regex = /[0-9]/;
    if (regex.test(e)) {
      this.setState({
        donationTime: e
      });
    } else {
      this.setState({
        location: e
      });
    }
  };

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  handleOk = () => {
    this.setState({
      modalVisible: false
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.postDonation(this.state, this.showModal);
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 16 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 18 }
      }
    };

    const locationList = [
      { label: "Thành phố Hồ Chí Minh", value: "TP Hồ Chí Minh" },
      { label: "Hà Nội", value: "Hà Nội" },
      { label: "Đà Nẵng", value: "Đà Nẵng" }
    ];

    const donationTimeList = [
      { label: "01/12/2019", value: "01/12/2019" },
      { label: "08/12/2019", value: "08/12/2019" },
      { label: "15/12/2019", value: "15/12/2019" }
    ];

    return (
      <div>
        <Form
          className="donation-form"
          {...formItemLayout}
          onSubmit={this.onSubmit}
        >
          <SelectListGroup
            name="location"
            defautValue="Thành phố Hồ Chí Minh"
            placeholder="Xin hãy chọn thành phố"
            value={this.state.location}
            onChange={this.onChange}
            options={locationList}
            error={this.state.errors.location}
          ></SelectListGroup>
          <SelectListGroup
            name="donationTime"
            defautValue=""
            placeholder="Xin hãy chọn thời gian"
            value={this.state.donationTime}
            onChange={this.onChange}
            options={donationTimeList}
            error={this.state.errors.donationTime}
          ></SelectListGroup>
          <Form.Item>
            <Button
              className="donation-form__btn"
              type="primary"
              htmlType="submit"
            >
              Ghi danh
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title="Ghi danh hoàn tất!"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          cancelButtonProps={{ disabled: true }}
        >
          <h3>Xin cảm ơn bạn!</h3>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { postDonation })(MakeDonationForm);
