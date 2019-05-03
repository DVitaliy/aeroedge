import React from "react";
import { Link } from "react-router-dom";

class RemembPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log("RemembPage componentDidMount");
  }
  componentDidUpdate(prevProps) {
    console.log("RemembPage componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("RemembPage componentWillUnmount");
  }
  handleSubmit(evt) {
    evt.preventDefault();
    window.M.toast({ html: "Not implemented!" });
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "330px",
          top: "10%",
          left: "calc(50% - 165px)"
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <div className="card">
            <div className="card-content">
              <span className="card-title grey-text text-darken-4">
                Forgot your password?
              </span>
              <div>
                <div className="input-field">
                  <input id="email" type="email" required />
                  <label htmlFor="email">E-mail...</label>
                </div>
                <div className="row">
                  <div className="col s12">
                    <button
                      style={{ width: "100%", margin: "20px 0 -20px 0" }}
                      className="waves-effect waves-light btn-flat cyan darken-3 white-text"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <footer className="center">
          Back to <Link to="/auth/login">Login form</Link>
        </footer>
      </div>
    );
  }
}

export default RemembPage;
