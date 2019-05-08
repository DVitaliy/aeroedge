import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SideBar } from "./";
import { Details5m } from "../components";
import { getDataSourceByKey } from "../constants";

class DetailsPage extends React.Component {
  constructor(props) {
    console.log("DetailsPage constructor", props);
    super(props);
    this.select = null;

    this.DATASOURCE_KEY = this.props.match.params[0];
    this.DATASOURCE_OBJ = getDataSourceByKey(this.DATASOURCE_KEY);
  }

  componentDidMount() {
    console.log("DetailsPage componentDidMount");
    window.M.updateTextFields();
    const elems = document.querySelectorAll("select");
    this.select = window.M.FormSelect.init(elems, {});
  }
  componentDidUpdate(prevProps) {
    console.log("DetailsPage componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("DetailsPage componentWillUnmount");
    this.select.map(instance => instance.destroy());
  }
  render() {
    const DetailsComponent = `Details${this.DATASOURCE_KEY}`;
    //const Component = import("../../components/Details5M.comp.js");
    return (
      <React.Fragment>
        <SideBar />
        {console.log(await import("../../components/Details5M.comp.js"))}
        <h1>Hello</h1>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(DetailsPage));
