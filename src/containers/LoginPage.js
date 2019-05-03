import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authAction } from "../actions";

class LoginPage extends React.Component {
  constructor(props) {
    console.log("LoginPage constructor", props);
    super(props);
    this.state = {
      isRememberChecked: true,
      errorMsg: null,
      user: "",
      password: "",
    };
    this.toggleRememberChange = this.toggleRememberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const user = localStorage.getItem("authUser");
    if (user) this.setState({ user }, () => window.M.updateTextFields());
  }

  toggleRememberChange() {
    this.setState({
      isRememberChecked: !this.state.isRememberChecked,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ errorMsg: null });
    this.props
      .dispatch(
        authAction.login({
          username: this.state.user,
          password: this.state.password,
        })
      )
      .then(data => {
        window.M.toast({ html: "Congratulations! " + (data.name || "") });
        if (this.state.isRememberChecked)
          localStorage.setItem("authUser", this.state.user);
        else localStorage.removeItem("authUser");
      })
      .catch(error =>
        this.setState({
          errorMsg: error,
        })
      );
  }

  handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { isRequest } = this.props;
    const { errorMsg } = this.state;
    return (
      <div
        style={{
          position: "absolute",
          width: "330px",
          top: "10%",
          left: "calc(50% - 165px)",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={isRequest}>
            <div className="card">
              <div className="card-content">
                <span className="card-title grey-text text-darken-4">
                  Login
                </span>
                <div>
                  {errorMsg && <blockquote>{errorMsg}</blockquote>}
                  <div className="input-field">
                    <input
                      id="userID"
                      type="text"
                      className="validate"
                      name="user"
                      value={this.state.user}
                      required={true}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="userID">User ID...</label>
                  </div>
                  <div className="input-field">
                    <input
                      id="password"
                      type="password"
                      className="validate"
                      name="password"
                      onChange={this.handleChange}
                      required={true}
                    />
                    <label htmlFor="password">Password...</label>
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.isRememberChecked}
                      onChange={this.toggleRememberChange}
                    />
                    <span>Remember me</span>
                  </label>
                  <div className="row">
                    <div className="col s12">
                      <button
                        style={{ width: "100%", margin: "20px 0 -20px 0" }}
                        className="waves-effect waves-light btn-flat cyan darken-3 white-text"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        <footer className="center-align">
          <Link to="/auth/reset">Forgot password?</Link>
        </footer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  isRequest: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isRequest: state.auth.isRequest,
});
export default connect(mapStateToProps)(LoginPage);
