/**
  TODO: 
  - remove console.log
  - clear/check inputs if filter was remove/changed
  - insert params in input from query during mounting

  */

import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getDataSourceByKey } from "../constants";

const ImportButton = ({ handleClick = () => {} }) => (
  <a
    className="waves-effect waves-light btn"
    onClick={handleClick}
    style={{ marginLeft: 0 }}
  >
    Import
    <i className="hide-on-small-only material-icons left">system_update_alt</i>
  </a>
);

const AddNewButton = ({ handleClick = () => {} }) => (
  <a
    className="waves-effect waves-light btn light-blue darken-3"
    style={{ marginLeft: 0 }}
    onClick={handleClick}
  >
    Add New
    <i className="hide-on-small-only material-icons left">add_to_photos</i>
  </a>
);

const ListingForm = ({ handleClick = () => {}, setRef, inputPattern = {} }) => {
  const {
    textInput = {},
    dataStartInput = {},
    dataEndInput = {},
  } = inputPattern;
  return (
    <ul ref={setRef}>
      <li style={{ width: "145px" }}>
        <div className="input-field">
          <i className="material-icons prefix">description</i>
          <input
            id="description"
            type="text"
            name={textInput.name || "textInput"}
          />
          <label htmlFor="description">
            {textInput.displayName || "textInput"}
          </label>
        </div>
      </li>
      <li style={{ width: "130px" }}>
        <div className="input-field">
          <i className="material-icons prefix">date_range</i>
          <input
            id="startData"
            type="text"
            name={dataStartInput.name || "dataStartInput"}
            className="datepicker"
          />
          <label htmlFor="startData">
            {dataStartInput.displayName || "dataStartInput"}
          </label>
        </div>
      </li>
      <li style={{ width: "130px" }}>
        <div className="input-field">
          <i className="material-icons prefix">date_range</i>
          <input
            id="endData"
            type="text"
            name={dataEndInput.name || "dataEndInput"}
            className="datepicker"
          />
          <label htmlFor="endData">
            {dataEndInput.displayName || "dataEndInput"}
          </label>
        </div>
      </li>
      <li>
        <a className="waves-effect waves-light btn" onClick={handleClick}>
          search
        </a>
      </li>
    </ul>
  );
};

class SideBar extends React.Component {
  static defaultProps = {
    importEnable: true,
    addNewEnable: true,
    listingFormEnable: true,
  };
  constructor(props) {
    super(props);

    this.DATASOURCE_KEY = this.props.match.params[0];
    this.DATASOURCE_OBJ = getDataSourceByKey(this.DATASOURCE_KEY);

    this.datepicker = null;
    this.sideNavInstance = null;

    this.listingForm = React.createRef();
    this.listingFormBarWrapped = React.createRef();
    this.listingFormNavWrapped = React.createRef();

    this.listingFormClick = this.listingFormClick.bind(this);
  }

  componentDidMount() {
    const elems = document.querySelectorAll(".datepicker");
    this.datepicker = window.M.Datepicker.init(elems, {
      format: "yyyy/mm/dd",
      autoClose: true,
      container: "body",
    });
    this.sideNavInstance = window.M.Sidenav.init(this.sideNav, {
      edge: "right",
      draggable: false,
      onOpenStart: () => {
        if (this.listingFormNavWrapped.current && this.listingForm.current) {
          this.listingFormNavWrapped.current.appendChild(
            this.listingForm.current
          );
        }
      },
      onCloseEnd: () => {
        if (this.listingFormBarWrapped.current && this.listingForm.current) {
          this.listingFormBarWrapped.current.appendChild(
            this.listingForm.current
          );
        }
      },
    });
    console.log("SideBar componentDidMount");
  }
  componentDidUpdate(prevProps) {
    // make clear input
    //if (prevProps.location.search !== this.props.location.search){}
  }
  componentWillUnmount() {
    console.log("SideBar componentWillUnmount");
    this.datepicker.map(instance => instance.destroy());
    this.sideNavInstance.destroy();
  }
  listingFormClick() {
    const { listingSideBarPattern = {} } = this.DATASOURCE_OBJ;
    const {
      pathname = `/${this.DATASOURCE_KEY}/listing`,
      clickPreprocess = obj => obj,
    } = listingSideBarPattern;
    let params = {};

    [...this.listingForm.current.querySelectorAll("input[name]")].map(
      el => (params[el.name] = el.value)
    );

    params = clickPreprocess(params);

    this.props.history.push({
      pathname,
      search: Object.keys(params)
        .filter(key => !!params[key])
        .map(key => `${key}=${params[key]}`)
        .join("&"),
    });
  }
  render() {
    const {
      history,
      importEnable,
      addNewEnable,
      listingFormEnable,
    } = this.props;
    const { listingSideBarPattern = {} } = this.DATASOURCE_OBJ;
    return (
      <>
        <div className="navbar-fixed">
          <nav className="white">
            <div className="nav-wrapper row">
              <a
                style={{ cursor: "default" }}
                data-target="slide-out"
                className="sidenav-trigger cyan-text text-darken-3"
              >
                <i className="material-icons">menu</i>
              </a>
              <div
                className="col hide-on-med-and-down"
                ref={this.listingFormBarWrapped}
              >
                {listingFormEnable && (
                  <ListingForm
                    setRef={this.listingForm}
                    handleClick={this.listingFormClick}
                    inputPattern={listingSideBarPattern}
                  />
                )}
              </div>
              <div className="col right" style={{ paddingRight: 0 }}>
                <ul className="">
                  <li>
                    {addNewEnable && (
                      <AddNewButton
                        handleClick={() =>
                          history.push(`/${this.DATASOURCE_KEY}/detail/new`)
                        }
                      />
                    )}
                    {importEnable && (
                      <ImportButton
                        handleClick={() =>
                          history.push(`/${this.DATASOURCE_KEY}/import`)
                        }
                      />
                    )}

                    {listingFormEnable && (
                      <a
                        style={{ cursor: "default", margin: 0 }}
                        className="sidenav-trigger cyan-text text-darken-3 right"
                        data-target="slide-listing"
                      >
                        <i className="material-icons">more_vert</i>
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <ul
          ref={el => (this.sideNav = el)}
          id="slide-listing"
          className="sidenav"
        >
          <li
            ref={this.listingFormNavWrapped}
            className="listing-form-nav-wrapped"
          />
          <li className="divider" />
          <li>
            <a className="sidenav-close">
              <i className="material-icons">close</i> Close
            </a>
          </li>
        </ul>
      </>
    );
  }
}
SideBar.propTypes = {
  importEnable: PropTypes.bool,
  addNewEnable: PropTypes.bool,
  listingFormEnable: PropTypes.bool,
};
export default withRouter(SideBar);
