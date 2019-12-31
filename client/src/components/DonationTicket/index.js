import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Radio, Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";

import "./style.scss";
const { Title } = Typography;

class Ticket extends Component {
  makePDF = () => {
    let element = document.getElementById("ticket");
    html2canvas(element).then(function(canvas) {
      var img = canvas.toDataURL("image/png");

      const doc = new jsPDF("p", "mm", "letter");
      doc.addImage(img, "PNG", 30, 30);
      doc.save("test.pdf");
    });
  };

  render() {
    const { user } = this.props.user;
    const { donation } = this.props;
    return (
      <div>
        <div id="ticket" className="ticket">
          <Title level={2}>PHIẾU ĐĂNG KÝ HIẾN MÁU</Title>
          <div className="ticket__info-box">
            <p>
              Họ và tên: <strong>{user.name}</strong>
            </p>
            <p>
              Ngày sinh:{" "}
              <strong>{moment(user.DOB).format("DD/MM/YYYY")}</strong>
            </p>
            <p>
              Giới tính: <strong>{user.gender}</strong>
            </p>
            <hr />
            <p>
              Địa chỉ thường trú: <strong>{user.address}</strong>
            </p>
            <hr></hr>
            <p>
              Email: <strong>{user.email}</strong>
            </p>
            <p>
              SĐT: <strong>{user.phone}</strong>
            </p>
            <hr />
            <p>
              Số CMND: <strong>{user.personalCard}</strong>
            </p>
            <p>
              Nơi cấp CMND: <strong>{user.personalCardLocation}</strong>
            </p>
            <hr></hr>
            <p>
              Mã hiến máu: <strong>{donation._id.slice(-5)}</strong>
            </p>
            <p>
              Ngày hiến máu: <strong>{donation.donationTime}</strong>
            </p>
            <p>
              Cơ sở: <strong>{donation.location}</strong>
            </p>
            <hr />
            <strong>
              Lưu ý: Nhớ mã hiến máu khi đi hiến máu nếu bạn không thể in phiếu
              này.
            </strong>
          </div>
        </div>
        <Button
          type="primary"
          className="ticket__print-button"
          onClick={this.makePDF}
        >
          In phiếu đăng ký
        </Button>
      </div>
    );
  }
}

Ticket.propTypes = {
  user: PropTypes.object.isRequired,
  donation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.users,
  donation: state.donations
});

export default connect(mapStateToProps, null)(Ticket);
