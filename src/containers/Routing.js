import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getListDataSourceByRole } from "../constants";
import {
  LoginPage,
  RemembPage,
  DashboardPage,
  ListingPage,
  ImportPage,
  DetailPage,
  DetailNewPage,
  SideNav,
} from "../containers";

class Routing extends React.Component {
  constructor(props) {
    console.log("Routing constructor", props);
    super(props);
  }

  componentDidMount() {
    console.log("Routing componentDidMount");
  }
  componentDidUpdate(prevProps) {
    console.log("Routing componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("Routing componentWillUnmount");
  }

  render() {
    if (!this.props.isAccess) {
      return (
        <Switch>
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/reset" component={RemembPage} />
          <Route render={() => <Redirect to="/auth/login" />} />
        </Switch>
      );
    }

    //DATASOURCE @obj
    const DATASOURCE = getListDataSourceByRole(this.props.roleList);
    const ROOT_PATH = `/(${Object.keys(DATASOURCE).join("|")})`;
    const DEFAULT_DATASOURCE = Object.keys(DATASOURCE)[0];
    const DEFAULT_PATH = `/${DATASOURCE[DEFAULT_DATASOURCE].defaultRoute}`;

    return (
      <>
        <SideNav datasource={DATASOURCE} />
        <Switch>
          <Route exact path={ROOT_PATH} component={DashboardPage} />
          <Route path={`${ROOT_PATH}/listing`} component={ListingPage} />
          <Route path={`${ROOT_PATH}/import`} component={ImportPage} />
          <Route
            exact
            path={`${ROOT_PATH}/detail/new`}
            component={DetailNewPage}
          />
          <Route path={`${ROOT_PATH}/detail/:id`} component={DetailPage} />
          <Route path="/auth" render={() => <Redirect to={DEFAULT_PATH} />} />
          <Route exact path="/" render={() => <Redirect to={DEFAULT_PATH} />} />
          <Route render={() => <h4>404 Not found</h4>} />
        </Switch>
      </>
    );
  }
}

Routing.propTypes = {
  isAccess: PropTypes.bool.isRequired,
  roleList: PropTypes.array,
};

export default withRouter(
  connect((state, ownProps) => ({
    roleList: (state.auth.data.roleList || []).map(role => role.toUpperCase()),
    isAccess:
      (state.token.exp &&
        state.token.exp > Math.floor(new Date().getTime() / 1000)) ||
      false,
  }))(Routing)
);
