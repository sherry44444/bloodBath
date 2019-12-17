import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Icon, Avatar, Typography } from "antd";
import { uploadAvatar } from "../../actions/user";
import noAvatar from "../../image/no-avatar.png";
import Moment from "react-moment";
import "./style.scss";

const { Title } = Typography;

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: true,
      fileUrl: ""
    };
  }

  handleAvatarClick = () => {
    const avatarInput = document.getElementById("avatarInput");
    avatarInput.click();
  };

  onAvatarChange = e => {
    if (
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png"
    ) {
      return;
    } else {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          loading: false,
          fileUrl: reader.result
        });
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      this.props.uploadAvatar(formData, config);
    }
  };

  render() {
    const { user, deleteUser } = this.props;
    const { fileUrl } = this.state;

    return (
      <div>
        <Card
          className="card"
          style={{ width: 200 }}
          actions={[
            <Link to="/edit-user">
              <Icon type="edit"></Icon>
            </Link>,
            <Icon type="delete" key="delete" onClick={deleteUser} />
          ]}
        >
          <input
            name="avatar"
            id="avatarInput"
            className="card__avatar-input"
            type="file"
            onChange={this.onAvatarChange}
          />
          <Avatar
            id="avatar"
            size={140}
            src={
              fileUrl ||
              (user.avatar && `http://localhost:8888/${user.avatar}`) ||
              noAvatar
            }
            onClick={this.handleAvatarClick}
          ></Avatar>
          <Title level={3} className="card__title">
            {user.name}
          </Title>
          <p>
            Giới tính: <span className="card__info-text">{user.gender}</span>
          </p>
          <p>
            Ngày sinh:{" "}
            <span className="card__info-text">
              <Moment format="DD/MM/YYYY">{user.DOB}</Moment>
            </span>
          </p>
          <p>
            Nhóm máu: <span className="card__info-text">{user.bloodType}</span>
          </p>
        </Card>
      </div>
    );
  }
}

export default connect(null, { uploadAvatar })(InfoCard);
