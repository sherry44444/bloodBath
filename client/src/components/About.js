import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";

class About extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <div className="text-container">
          <p>
            Chúng tôi nòng cốt là cán bộ quản lý trong các bệnh viện lớn của
            TPHCM cùng chung tay để đóng góp một phần sức lực cho cộng đồng
          </p>
          <p>Với những nòng cốt bao gồm</p>
          <h3>GS TS Hoàng Xuân Lâm</h3>
          <h4>
            Viện trưởng Viện Truyền máu Huyết Học, Giám đốc Bệnh viện ĐHYD TPHCM
          </h4>
          <h4>Trưởng dự án, đồng thời là Webdesigner ='))'</h4>

          <button
            className="back-btn"
            onClick={() => {
              if (isAuthenticated) {
                this.props.history.push("/profile");
              } else {
                console.log(this.props.history);
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
)(About);
