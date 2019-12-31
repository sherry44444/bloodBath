import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MakeDonationTabs from "../../Make-donations/MakeDonationTabs";
import InfoCard from "../../InfoCard/";
import { getCurrentUser, deleteUser } from "../../../actions/user";
import Spinner from "../../Layout/Spinner/";

import "./style.scss";

class Profile extends Component {
  componentDidMount = () => {
    this.props.getCurrentUser();
  };

  deleteUser = () => {
    this.props.deleteUser(this.props.history);
  };

  render() {
    const { user } = this.props.user;
    let userContent;
    if (user === null) {
      userContent = <Spinner></Spinner>;
    } else {
      userContent = (
        <div className="profile">
          <InfoCard user={user} deleteUser={this.deleteUser}></InfoCard>
          <MakeDonationTabs></MakeDonationTabs>
        </div>
      );
    }
    return <div>{userContent}</div>;
  }
}

Profile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.users
});

export default connect(mapStateToProps, { getCurrentUser, deleteUser })(
  Profile
);
