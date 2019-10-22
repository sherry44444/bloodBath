import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";

class Mission extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <div className="text-container">
          <h1>Sứ mệnh của chúng tôi</h1>
          <p>
            Chúng tôi những người đang làm trong này y tế đã nhiều lần không
            khỏi xót xa khi nhìn thấy những bệnh nhân ra đi tức tưởi vì không có
            máu truyền trong lúc khẩn cấp.
          </p>

          <p>
            Vì lẽ đó, chúng tôi lập ra tổ chức PHI LỢI NHUẬN này nhằm kêu gọi sự
            giúp đớ của cộng đồng trong việc hiến máu cứu người.
          </p>

          <p>
            Tất cả máu mà chúng tôi nhận được sẽ được lưu trong kho của Bệnh
            viện Chợ Rẫy với sự hợp tác tận tình.
          </p>

          <p>
            Với sự nỗ lực chúng tôi tin sẽ có thể giảm thiểu hết mức những cái
            chết thương tâm.
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
)(Mission);
