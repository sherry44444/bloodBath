import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";

class Vision extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <div className="text-container">
          <p>Hiện tổ chức đã có 3 cơ sở tại 3 miền.</p>

          <p>
            Mục tiêu là mở thêm các cơ sở ở các thành phố lớn khác, nơi tập
            trung đông dân cư để huy động sự tình nguyện của người dân
          </p>

          <p>
            Mục tiêu đến năm 2021 có thêm 3 cơ sở ở Cần Thơ, Hải Phòng và Huế
          </p>
          <button
            className="back-btn"
            onClick={() => {
              if (isAuthenticated) {
                this.props.history.push("/profile");
              } else {
                this.props.history.push("/");
              }
            }}
          >
            Trở lại
          </button>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Vision);
