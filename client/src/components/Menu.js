import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

import "./style.scss";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  open = page => {
    window.location.href = `${page}`;
    if (page === "/") {
      this.props.logout();
    }
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <ul className="top">
          {isAuthenticated ? (
            <>
              <div className="btn-container">
                <button
                  className="logout-btn"
                  onClick={() => {
                    this.open("/");
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </ul>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/mission">Sứ mệnh</Link>
            </li>
            <li>
              <Link to="/vision">Tầm nhìn</Link>
            </li>
            <li>
              <Link to="/about">Về chúng tôi</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Menu);
