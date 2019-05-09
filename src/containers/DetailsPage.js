import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SideBar } from "./";
import { DetailsComponent } from "../components";
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
    //const { detailsDataPattern = {} } = this.DATASOURCE_OBJ;
    //const { Component = `Details${this.DATASOURCE_KEY}` } = detailsDataPattern;

    //const DetailsComponent = `Details${this.DATASOURCE_KEY}`;
    console.log(DetailsComponent);
    const Component = DetailsComponent[this.DATASOURCE_KEY];
    return (
      <React.Fragment>
        <SideBar />

        <h1>Hello</h1>
        <Component />
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(DetailsPage));
