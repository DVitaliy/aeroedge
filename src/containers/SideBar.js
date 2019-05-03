import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

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

const ListingForm = ({ handleClick = () => {}, setRef }) => {
  return (
    <ul ref={setRef}>
      <li style={{ width: "145px" }}>
        <div className="input-field">
          <i className="material-icons prefix">description</i>
          <input id="serial" type="text" />
          <label htmlFor="serial">Serial No...</label>
        </div>
      </li>
      <li style={{ width: "125px" }}>
        <div className="input-field">
          <i className="material-icons prefix">date_range</i>
          <input id="startData" type="text" className="datepicker" />
          <label htmlFor="startData">Start data...</label>
        </div>
      </li>
      <li style={{ width: "125px" }}>
        <div className="input-field">
          <i className="material-icons prefix">date_range</i>
          <input id="endData" type="text" className="datepicker" />
          <label htmlFor="endData">End data...</label>
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
    listingFormEnable: true
  };
  constructor(props) {
    console.log("SideBar constructor", props);
    super(props);
    this.datepicker = null;
    this.sideNavInstance = null;

    this.listingForm = React.createRef();
    this.listingFormBarWrapped = React.createRef();
    this.listingFormNavWrapped = React.createRef();
  }

  componentDidMount() {
    const elems = document.querySelectorAll(".datepicker");
    this.datepicker = window.M.Datepicker.init(elems, {
      format: "yyyy/m/dd",
      autoClose: true,
      container: "body"
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
      }
    });
    console.log("SideBar componentDidMount");
  }
  componentDidUpdate(prevProps) {
    console.log("SideBar componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("SideBar componentWillUnmount");
    this.datepicker.map(instance => instance.destroy());
    this.sideNavInstance.destroy();
  }
  render() {
    const {
      history,
      importEnable,
      addNewEnable,
      listingFormEnable
    } = this.props;
    const dataSource = this.props.match.params[0];
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
                    handleClick={() => history.push(`/${dataSource}/listing`)}
                  />
                )}
              </div>
              <div className="col right" style={{ paddingRight: 0 }}>
                <ul className="">
                  <li>
                    {addNewEnable && (
                      <AddNewButton
                        handleClick={() =>
                          history.push(`/${dataSource}/detail/new`)
                        }
                      />
                    )}
                    {importEnable && (
                      <ImportButton
                        handleClick={() =>
                          history.push(`/${dataSource}/import`)
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
  listingFormEnable: PropTypes.bool
};
export default withRouter(SideBar);
