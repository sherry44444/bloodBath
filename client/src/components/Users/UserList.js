import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";

import "./style.scss";
import noAvatar from "../../image/no-avatar.png";

class UserList extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div className="userslist-container">
        {users.map(user => {
          return (
            <div className="user-box">
              <div className="avatar-box">
                <img src={noAvatar} alt="avatar" className="avatar" />
              </div>
              <div className="information-box">
                <h1>{user.email}</h1>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UserList);
