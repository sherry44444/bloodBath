import React, { Component } from "react";
import { connect } from "react-redux";
import Text from "../Form/Text";
import Select from "../Form/Select";
import axios from "axios";
import { login, deleteUser, postDonation } from "../../actions/auth";
import { getUserById, editUser } from "../../actions/users";
import { getDonationsByUser, deleteDonation } from "../../actions/donations";
import Moment from "react-moment";
import noAvatar from "../../image/no-avatar.png";
import Footer from "../Footer";

const formConfig = [
  { name: "name", type: "name", value: "", vi_name: "Họ tên" },
  { name: "email", type: "email", value: "", vi_name: "Email" },

  {
    name: "gender",
    type: "select",
    options: ["Nam", "Nữ"],
    value: "",
    vi_name: "Giới tính"
  },
  {
    name: "bloodType",
    type: "select",
    options: ["chưa biết", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    value: "",
    vi_name: "Nhóm máu"
  }
];

const formTakePart = [
  {
    name: "location",
    type: "select",
    options: ["Cơ sở Hồ Chí Minh", "Cơ sở Hà Nội", "Cơ sở Đà Nẵng"],
    value: "",
    vi_name: "Địa điểm"
  },
  {
    name: "donationTime",
    type: "select",
    options: ["27/12/2019", "27/01/2020", "27/04/2020"],
    value: "",
    vi_name: "Thời gian"
  }
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      DOB: "",
      bloodType: "",
      gender: "",

      pending: [],
      history: [],

      errors: {},

      file: null
    };
  }

  componentDidMount = async () => {
    const { auth, getUserById, getDonationsByUser } = this.props;
    const user = await getUserById(auth.user.id);
    getDonationsByUser();
    const newState = { ...user };
    this.setState(newState);

    //lay lich su hien mau cua user sau khi dang nhap

    //auto mo tab dang ky hien mau
    document.getElementById("defaultTab").click();
  };

  //logout
  clickLogout = () => {
    this.props.logout();
    window.location.href = "/";
  };

  //upload avatar methods
  triggerFileInput = () => {
    let fileInput = document.getElementById("upload-avatar");
    fileInput.click();
  };

  handleFileChange = async event => {
    if (this.state.file) {
      URL.revokeObjectURL(this.state.file);
    }
    this.setState({
      ...this.state,
      file: URL.createObjectURL(event.target.files[0])
    });
    const { auth } = this.props;
    const data = new FormData();

    data.append("avatar", event.target.files[0]);

    await axios
      .post(
        `http://localhost:8888/api/users/upload-avatar/${auth.user.id}`,
        data
      )
      .then(res => {});
  };

  getFieldValue = field => {
    const newState = { ...this.state, ...field };
    this.setState(newState);
  };

  //button trong khung thong tin
  editUser = () => {
    var i, tabContent, tabs, editBox;
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }

    tabs = document.getElementById("tabs");
    tabs.style.display = "none";

    editBox = document.getElementById("edit-box");
    editBox.style.display = "inline-block";
  };

  deleteUser = () => {
    const { auth, deleteUser } = this.props;
    deleteUser(auth.user.id, this.toLogin);
  };

  //show modals

  showModal = modalId => {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  //unshow modals
  noAction = modalId => {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
  };

  toLogin = () => {
    this.props.history.push("/");
  };

  //button cua editbox

  makeEdit = (id, data) => {
    this.props.editUser(
      id,
      data,
      () => {
        window.location.reload();
      },
      () => {
        this.noAction("editModal");
      }
    );
  };

  cancelEdit = e => {
    e.preventDefault();
    var tabs, editBox;
    editBox = document.getElementById("edit-box");
    editBox.style.display = "none";

    tabs = document.getElementById("tabs");
    tabs.style.display = "inline-block";
    document.getElementById("defaultTab").click();
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      name: nextProps.user.name,
      email: nextProps.user.email,
      gender: nextProps.user.gender,
      bloodType: nextProps.user.bloodType,
      pending: nextProps.donations.pending,
      history: nextProps.donations.history,
      errors: nextProps.errors
    });
  };

  //handle tabs
  openTab = tabName => {
    var i, tabContent;
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }

    // event.currentTarget.className += "active";
    document.getElementById(tabName).style.display = "inline-block";
  };

  //cac button cua tab ghi danh
  takePartForm = () => {
    return formTakePart.map((item, key) => {
      return (
        <Select
          key={key}
          item={item}
          getFieldValue={this.getFieldValue}
          errors={this.state.errors[`${item.name}`]}
        ></Select>
      );
    });
  };

  takePart = () => {
    let { location, donationTime } = this.state;
    const { postDonation } = this.props;
    // if (!donationTime) {
    //   donationTime = moment(donationTime, "DD/MM/YYYY");
    // }
    console.log(donationTime);
    console.log(location);

    postDonation(
      {
        location,
        donationTime
      },
      () => {
        this.showModal("doneModal");
      }
    );
  };

  //cac btn cua tab "đã ghi danh"
  showFinishModalsAndFinish = async id => {
    await axios.put(
      `http://localhost:8888/api/donations/finish-donation/${id}`
    );
    this.showModal("waitingModal");
    setTimeout(() => {
      this.noAction("waitingModal");
      this.showModal("finishModal");
    }, 3000);
  };

  cancelDon = id => {
    const { deleteDonation } = this.props;
    deleteDonation(id, window.location.reload());
  };

  //form edit box
  renderForm = user => {
    const { errors } = this.state;
    return formConfig.map((item, index) => {
      switch (item.type) {
        case "select":
          return (
            <Select
              key={index}
              item={item}
              value={this.state[`${item.name}`]}
              errors={errors[`${item.name}`]}
              getFieldValue={this.getFieldValue}
            />
          );

        default:
          return (
            <Text
              key={index}
              item={item}
              value={this.state[`${item.name}`]}
              errors={errors[`${item.name}`]}
              getFieldValue={this.getFieldValue}
            />
          );
      }
    });
  };

  render() {
    const { user } = this.props;
    const editData = this.state;
    const { pending, history } = this.state;

    return (
      <div className="profile-page-container">
        <div id="loadingModal" className="loading-modal">
          <div className="modal-box">
            <div className="loader"></div>
          </div>
        </div>

        {/* done ghi danh */}
        <div id="doneModal" className="the-modal">
          <div class="the-modal-content">
            <h2>Ghi danh hoàn tất ^^</h2>
            <button
              onClick={() => {
                this.noAction("doneModal");
              }}
            >
              OKay
            </button>
          </div>
        </div>

        {/* waiting for the confirmation */}
        <div id="waitingModal" className="the-modal">
          <div class="the-modal-content">
            <h2>Đang chờ nhân viên xác nhận ^^</h2>
          </div>
        </div>

        {/* finish  */}
        <div id="finishModal" className="the-modal">
          <div class="the-modal-content">
            <h2>Xác nhận hoàn tất. Xin cảm ơn^^</h2>
            <button
              onClick={() => {
                this.noAction("finishModal");
                window.location.reload();
              }}
            >
              OKay
            </button>
          </div>
        </div>

        <div id="editModal" className="the-modal">
          <div class="the-modal-content">
            <h2>Bạn có chắc chắn chưa đó? ^^</h2>

            <button
              onClick={() => {
                this.makeEdit(user._id, editData);
              }}
            >
              Rồi
            </button>
            <button
              onClick={() => {
                this.noAction("editModal");
              }}
            >
              Chưa
            </button>
          </div>
        </div>

        <div id="deleteModal" className="the-modal">
          <div class="the-modal-content">
            <h2>Bạn chắc chắn muốn xóa?</h2>

            <button onClick={this.deleteUser}>Có</button>
            <button
              onClick={() => {
                this.noAction("deleteModal");
              }}
            >
              Không
            </button>
          </div>
        </div>
        <div className="info-box">
          <div className="ava-div">
            <img
              id="the-avatar"
              src={
                this.state.file ||
                (user.avatar
                  ? `http://localhost:8888\\${user.avatar}`
                  : noAvatar)
              }
              alt="avatar"
              onClick={this.triggerFileInput}
            />
            <input
              type="file"
              name="avatar"
              onChange={this.handleFileChange}
              id="upload-avatar"
              style={{ display: "none" }}
            />
          </div>

          <h2>{user.name}</h2>
          <p>
            <Moment format="DD/MM/YYYY">{user.DOB}</Moment>
          </p>
          <p>{user.gender}</p>
          <p>Nhóm máu: {user.bloodType}</p>
          <button onClick={this.editUser}>Sửa thông tin</button>
          <button
            id="delete-user-btn"
            onClick={() => {
              this.showModal("deleteModal");
            }}
          >
            Xóa tài khoản
          </button>
        </div>

        {/* tab btns */}
        <div id="tabs" className="tabs">
          <button
            id="defaultTab"
            className="tabLinks"
            onClick={() => {
              this.openTab("register");
            }}
          >
            Ghi danh hiến máu
          </button>
          <button
            id="pending-btn"
            className="tabLinks"
            onClick={() => {
              this.openTab("pending");
            }}
          >
            Đã ghi danh
          </button>
          <button
            id="history-btn"
            className="tabLinks"
            onClick={() => {
              this.openTab("history");
            }}
          >
            Lịch sử
          </button>
        </div>
        {/* //tabs content */}
        <div id="register" className="tabContent">
          {this.takePartForm()}
          <button className="takepart-btn" onClick={this.takePart}>
            Ghi danh
          </button>
        </div>
        <div id="pending" className="tabContent">
          {pending.map(don => {
            return (
              <div className="pending-container">
                <p className="don-location">{don.location}</p>
                <p className="don-time">{don.donationTime}</p>
                <button
                  className="done"
                  onClick={() => {
                    this.showFinishModalsAndFinish(don._id);
                  }}
                >
                  Đã hoàn tất
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    this.cancelDon(don._id);
                  }}
                >
                  Hủy
                </button>
              </div>
            );
          })}
        </div>
        <div id="history" className="tabContent">
          {history.map(don => {
            return (
              <div className="history-container">
                <p className="don-location-history">{don.location}</p>
                <p className="don-time-history">{don.donationTime}</p>
                <i className="fas fa-check check-icon"></i>
              </div>
            );
          })}
        </div>

        <div id="edit-box" className="edit-box">
          <h1>Sửa thông tin</h1>
          <form className="edit-form">
            {this.renderForm(user)}
            <button
              onClick={e => {
                e.preventDefault();
                this.showModal("editModal");
              }}
            >
              Lưu sửa đổi
            </button>
            <button onClick={this.cancelEdit}>Hủy sửa đổi</button>
          </form>
        </div>

        <Footer className="footer"></Footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth,
    user: state.users,
    donations: state.donations
  };
};

export default connect(
  mapStateToProps,
  {
    login,
    deleteUser,
    getUserById,
    getDonationsByUser,
    postDonation,
    deleteDonation,
    editUser
  }
)(Profile);
