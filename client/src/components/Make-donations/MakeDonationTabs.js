import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import { getDonationsByUser } from "../../actions/donations";
import MakeDonationForm from "./MakeDonationForm";
import PendingDonationList from "./PendingDonationList";
import "./style.scss";

class MakeDonationTabs extends Component {
  state = {
    key: "tab1",
    noTitleKey: "takepart"
  };

  componentDidMount = () => {
    this.props.getDonationsByUser();
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    const { donations } = this.props;
    const tabList = [
      {
        key: "takepart",
        tab: "Ghi danh"
      },
      {
        key: "pending",
        tab: "Đã ghi danh"
      }
    ];

    const contentList = {
      takepart: <MakeDonationForm></MakeDonationForm>,
      pending: <PendingDonationList donations={donations}></PendingDonationList>
    };
    return (
      <Card
        className="tabs"
        style={{ width: "500px" }}
        tabList={tabList}
        activeTabKey={this.state.noTitleKey}
        onTabChange={key => {
          this.onTabChange(key, "noTitleKey");
        }}
      >
        {contentList[this.state.noTitleKey]}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  donations: state.donations
});

export default connect(
  mapStateToProps,
  { getDonationsByUser }
)(MakeDonationTabs);
