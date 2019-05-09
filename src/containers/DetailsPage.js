import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dsAction } from "../actions";
import { SideBar } from "./";
import { DetailsComponent } from "../components";
import { getDataSourceByKey } from "../constants";

class DetailsPage extends React.Component {
  constructor(props) {
    console.log("DetailsPage constructor", props);
    super(props);
    this.state = {
      data: {},
      loading: false,
    };
    this.select = null;

    this.DATASOURCE_KEY = this.props.match.params[0];
    this.DATASOURCE_OBJ = getDataSourceByKey(this.DATASOURCE_KEY);
  }

  componentDidMount() {
    window.M.updateTextFields();
    const elems = document.querySelectorAll("select");
    this.select = window.M.FormSelect.init(elems, {});
    this.getData();
  }
  componentDidUpdate(prevProps) {
    console.log("DetailsPage componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("DetailsPage componentWillUnmount");
    this.select.map(instance => instance.destroy());
  }

  getData() {
    if (this.state.loading) return;
    this.setState({ loading: true });

    const { search } = this.props.location;
    const { detailsDataPattern = {} } = this.DATASOURCE_OBJ;
    const { preprocessGetData = arg => arg } = detailsDataPattern;

    this.props
      .dispatch(
        dsAction.details(
          preprocessGetData({
            datasource: this.DATASOURCE_KEY,
            parameters: search,
          })
        )
      )
      .then(data => {
        console.log(data);
        this.setState({
          data,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        window.M.toast({ html: error, classes: "warning" });
      });
  }

  render() {
    const { data } = this.state;
    const Component = DetailsComponent[this.DATASOURCE_KEY];

    return (
      <React.Fragment>
        <SideBar />
        {Object.keys(data).length !== 0 && <Component daya={data} />}
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(DetailsPage));
