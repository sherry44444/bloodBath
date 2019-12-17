import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteDonation, takeDonationToTicket } from "../../actions/donations";
import { Table, Button } from "antd";
import "./style.scss";

class PendingDonationList extends Component {
  onDeleteDonationButtonClick = id => {
    this.props.deleteDonation(id, window.location.reload());
  };

  takeDonationInfoToTicket = donation => {
    this.props.takeDonationToTicket(donation);
  };

  render() {
    const { donations } = this.props;
    const columns = [
      {
        title: "Địa điểm",
        dataIndex: "location",
        key: "location"
      },
      {
        title: "Thời gian",
        dataIndex: "donationTime",
        key: "donationTime"
      },
      {
        title: "",
        dataIndex: "printButton",
        key: "printButton"
      },
      {
        title: "",
        dataIndex: "deleteButton",
        key: "deleteButton"
      }
    ];

    const data = donations.map(donation => ({
      key: donation._id,
      location: donation.location,
      donationTime: donation.donationTime,
      printButton: (
        <Button
          type="primary"
          onClick={() => {
            this.takeDonationInfoToTicket(donation);
          }}
        >
          <Link to="/ticket">In phiếu đăng ký</Link>
        </Button>
      ),
      deleteButton: (
        <Button
          type="danger"
          onClick={() => {
            this.onDeleteDonationButtonClick(donation._id);
          }}
        >
          Xóa
        </Button>
      )
    }));

    return (
      <div>
        <Table columns={columns} dataSource={data}></Table>
      </div>
    );
  }
}

export default connect(null, { deleteDonation, takeDonationToTicket })(
  PendingDonationList
);
