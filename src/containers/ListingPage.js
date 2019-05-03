import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SideBar } from "./";
import { authAction } from "../actions";

import payloadData from "../5m-import.json";

const popOver = {
  ref: null,
  init: function(ref) {
    this.ref = ref.current;
    return this;
  },
  show: function(el) {
    const rect = el.getBoundingClientRect();
    this.ref.style.display = "block";
    this.ref.style.transform = `translate(${rect.left}px, ${rect.top +
      rect.height}px)`;
    const label = this.ref.getElementsByClassName("filter-label");
    if (label.length) label[0].innerText = el.textContent;
  },
  hide: function() {
    this.ref.style.display = "none";
  },
};

const PopOver = ({ setRef, popOverClickCancel, popOverClickSearch }) => (
  <div className="popover arrow-top" ref={setRef}>
    <div className="popover-head">
      <div className="input-field">
        <input id="input" type="text" />
        <label htmlFor="input" className="filter-label" />
      </div>
    </div>
    <div className="popover-footer">
      <button
        className="waves-effect waves-light btn"
        onClick={popOverClickSearch}
      >
        Search
      </button>
      <button
        className="waves-effect waves-teal btn grey lighten-5 grey-text"
        style={{ marginLeft: "10px" }}
        onClick={popOverClickCancel}
      >
        Cancel
      </button>
    </div>
  </div>
);
const EmptyData = () => (
  <h5 className="center grey-text" style={{ padding: "20px" }}>
    No Data
  </h5>
);
const Loading = () => (
  <div className="progress">
    <div className="indeterminate" />
  </div>
);
const Pagination = () => (
  <ul className="pagination right">
    <li className="disabled">
      <a href="#!">
        <i className="material-icons">chevron_left</i>
      </a>
    </li>
    <li className="active">
      <a href="#!">1</a>
    </li>
    <li className="waves-effect">
      <a href="#!">2</a>
    </li>
    <li className="waves-effect">
      <a href="#!">3</a>
    </li>
    <li className="waves-effect">
      <a href="#!">4</a>
    </li>
    <li className="waves-effect">
      <a href="#!">5</a>
    </li>
    <li className="waves-effect">
      <a href="#!">
        <i className="material-icons">chevron_right</i>
      </a>
    </li>
  </ul>
);

const TableHead = ({ data, over, click }) => (
  <thead className="highlight">
    <tr>
      {Object.keys(data).map((key, i) => (
        <th key={i} onClick={click} onMouseOver={over}>
          {key}
        </th>
      ))}
    </tr>
  </thead>
);
const TableBody = ({ data, click }) => (
  <tbody>
    {data.map((item, i) => (
      <tr key={i} onClick={click.bind(null, item)}>
        {Object.keys(item).map((key, i) => (
          <td key={i}>{item[key]}</td>
        ))}
      </tr>
    ))}
  </tbody>
);

class ListingPage extends React.Component {
  constructor(props) {
    console.log("ListingPage constructor", props);
    super(props);
    this.state = {
      data: null,
      page: null,
      loading: true,
    };
    this.popOverInstance = null;
    this.popOverRef = React.createRef();
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleHeadOver = this.handleHeadOver.bind(this);
    this.handleHeadClick = this.handleHeadClick.bind(this);
    this.popOverClickCancel = this.popOverClickCancel.bind(this);
    this.popOverClickSearch = this.popOverClickSearch.bind(this);
  }

  componentDidMount() {
    console.log("ListingPage componentDidMount");
    this.getData();
    this.popOverInstance = popOver.init(this.popOverRef);
  }
  componentDidUpdate(prevProps) {
    console.log("ListingPage componentDidUpdate");
    if (prevProps.location.search !== this.props.location.search)
      console.log("UPPP");
  }
  componentWillUnmount() {
    console.log("ListingPage componentWillUnmount");
    this.popOverInstance.hide();
    this.popOverInstance = null;
  }

  handleItemClick(item) {
    this.props.history.push(
      `/${this.props.match.params[0]}/detail/${item["Serial No"]}`
    );
  }
  handleHeadOver(el) {
    console.log("Over", el.target, this.popOverInstance);

    this.popOverInstance.show(el.target);
  }
  handleHeadClick(evt) {
    evt.preventDefault();
    [...evt.target.parentNode.children].map(
      el => evt.target !== el && el.classList.remove("sorted")
    );
    if (evt.target.classList.contains("sorted")) {
      evt.target.classList.toggle("sorted-desc");
    }
    evt.target.classList.add("sorted");

    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `sort[${
        evt.target.classList.contains("sorted-desc") ? "desc" : ""
      }]=${window
        .encodeURIComponent(evt.target.textContent)
        .replace(/%20/g, "+")}`,
    });
  }
  popOverClickSearch(evt) {
    evt.preventDefault();
    window.M.toast({ html: "Not implemented!" });
  }
  popOverClickCancel() {
    setTimeout(() => {
      this.popOverInstance.hide();
    }, 300);
  }

  getData() {
    this.setState({
      data: payloadData,
    });
  }

  render() {
    const { data, loading, page } = this.state;
    return (
      <React.Fragment>
        <SideBar />
        <div className="row">
          <div className="col s12">
            <div className="card">
              {loading && <Loading />}
              {data ? (
                <React.Fragment>
                  <div className="listing-table">
                    <table className="responsive-table striped">
                      <TableHead
                        data={data[0]}
                        over={this.handleHeadOver}
                        click={this.handleHeadClick}
                      />
                      <TableBody data={data} click={this.handleItemClick} />
                    </table>
                  </div>
                  {page && (
                    <div className="row">
                      <div className="col s12">
                        <Pagination />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                <EmptyData />
              )}
            </div>
          </div>
        </div>
        <PopOver
          setRef={this.popOverRef}
          popOverClickCancel={this.popOverClickCancel}
          popOverClickSearch={this.popOverClickSearch}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(ListingPage));
