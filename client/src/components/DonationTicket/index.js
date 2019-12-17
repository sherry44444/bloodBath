import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography, Radio, Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import moment from "moment";

import "./style.scss";
const { Title, Text } = Typography;

class Ticket extends Component {
  makePDF = () => {
    let element = document.getElementById("ticket");
    let opt = {
      margin: [20, -25, 0, -25]
    };
    html2pdf()
      .set(opt)
      .from(element)
      .save();
  };

  render() {
    const { user } = this.props.user;
    const { donation } = this.props;
    const yesNoRadio = (
      <Radio.Group>
        <Radio className="ticket__radio" value="yes"></Radio>
        <Radio className="ticket__radio" value="no"></Radio>
      </Radio.Group>
    );
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
          <div className="ticket__question-list">
            <div className="ticket__request">
              <Text>
                Xin hãy chọn "Có" hoặc "Không" đối với mỗi câu hỏi dưới đây
              </Text>
              <div>
                <strong className="ticket__option">Có</strong>
                <strong className="ticket__option">Không</strong>
              </div>
            </div>
            <div className="ticket__question">
              <strong>Bạn đã từng đi hiến máu?</strong>
              {yesNoRadio}
            </div>
            <div className="ticket__question">
              <p>
                <strong>Bạn đã từng mắc các bệnh như</strong> hô hấp, tiêu hóa,
                vàng da/viêm gan, tim mạch, huyết áp thấp/cao, bệnh thận, ho kéo
                dài, bệnh máu, lao, ung thư,.v.v?
              </p>
              {yesNoRadio}
            </div>
            <div className="ticket__question">
              <strong>Trong vòng 6 tháng gần đây, Bạn có:</strong>
            </div>
            <div className="ticket__question">
              <p>Phẫu thuật?</p>
              {yesNoRadio}
            </div>
            <div id="ticket__after-pagebreak" className="ticket__question">
              <p>Được truyền máu, chế phẩm máu?</p>
              {yesNoRadio}
            </div>
            <div className="ticket__question">
              <p>Tiêm vắc xin phòng bệnh? Loại vắc xin:.…………………</p>
              {yesNoRadio}
            </div>
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

const mapStateToProps = state => ({
  user: state.users,
  donation: state.donations
});

export default connect(
  mapStateToProps,
  null
)(Ticket);
