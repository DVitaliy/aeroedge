import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { authAction } from "../actions";
import logo from "./../../public/logo.jpg";

class SideNav extends React.Component {
  constructor(props) {
    console.log("SideNav constructor", props);
    super(props);
    this.instance = null;
    this.modal = null;
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  componentDidMount() {
    this.instance = window.M.Sidenav.init(this.el, {});
    this.modal = window.M.Modal.init(this.modalEl, {});
  }
  componentWillUnmount() {
    this.instance.destroy();
    this.modal.destroy();
  }
  getNavLinkClass(path) {
    return this.props.location.pathname.startsWith(`/${path}`) ? "active" : "";
  }
  handleLogoutClick(evt) {
    evt.preventDefault();
    this.props.dispatch(authAction.logout());
  }
  render() {
    const DATASOURCE = this.props.datasource;
    return (
      <React.Fragment>
        <ul
          id="slide-out"
          className="sidenav sidenav-fixed"
          ref={el => (this.el = el)}
        >
          <li style={{ height: "180px" }}>
            <div className="user-view" style={{ paddingTop: "90px" }}>
              <div className="background" style={{ height: "180px" }}>
                <img alt="" width="140%" src={logo} />
              </div>
              <img
                className="circle hide"
                src="https://d3b6lg2n6cz976.cloudfront.net/company/10036_1530578305653.jpg"
                alt=""
              />
              <span className="white-text name">TOCALO Co.,Ltd</span>
              <span className="white-text email">00000000</span>
            </div>
          </li>
          {Object.keys(DATASOURCE).map(item => (
            <li className={this.getNavLinkClass(item)} key={item}>
              <Link
                className="waves-effect"
                to={`/${DATASOURCE[item].defaultRoute}`}
              >
                <i className="material-icons">{DATASOURCE[item].displayIcon}</i>{" "}
                {DATASOURCE[item].displayName}
              </Link>
            </li>
          ))}
          <li className="divider" />
          <li>
            <a
              className="waves-effect modal-trigger"
              data-target="logout_modal"
            >
              <i className="material-icons">exit_to_app</i>Logout
            </a>
          </li>
        </ul>
        <div
          id="logout_modal"
          className="modal"
          ref={el => (this.modalEl = el)}
          style={{ width: "350px" }}
        >
          <div className="modal-content">
            <h4>Logout</h4>
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="modal-footer">
            <a
              className="waves-effect waves-light btn-flat modal-close cyan darken-3 white-text"
              onClick={this.handleLogoutClick}
            >
              Logout
            </a>{" "}
            <a className="waves-effect waves-teal btn-flat modal-close">
              Cancel
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
SideNav.propTypes = {
  datasource: PropTypes.object.isRequired,
};
export default withRouter(connect()(SideNav));
