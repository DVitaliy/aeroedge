/**
  TODO: 
  - loading (skip getData if true, animation show)
  - SideBar (filter)
  - pagination (next, prev)
  - hide same rows (after getData run method filter for hide row ex. `status`) add method to datasource.const
  - remove console.log
  - show error toast bad connect or fail getData
  - corrected position popOver at small size view (when listing table transformed)
*/

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SideBar } from "./";
import { dsAction } from "../actions";
import { getDataSourceByKey } from "../constants";

const popOver = {
  ref: null,
  thead: null,
  init: function(ref) {
    this.ref = ref.current;
    return this;
  },
  show: function(el) {
    this.thead = el.dataset.index;
    const rect = el.getBoundingClientRect();
    this.ref.style.display = "block";
    this.ref.style.transform = `translate(${rect.left}px, ${rect.top +
      rect.height}px)`;
    this.label(el.textContent);
    this.input(el.dataset.filter).name = this.thead;
    if (el.dataset.filter.length)
      this.label(el.textContent).classList.add("active");
    else this.label(el.textContent).classList.remove("active");
  },
  hide: function() {
    this.ref.style.display = "none";
  },
  label: function(text) {
    const label = this.ref.querySelector(".filter-label");
    if (text) label.innerText = text;
    return label;
  },
  input: function(text) {
    const input = this.ref.querySelector("input");
    if (typeof text !== "undefined") input.value = text;
    return input;
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

const TableHead = ({ data, over, click, sort, filter }) => (
  <thead className="highlight">
    <tr>
      {data.map((obj, i) => (
        <th
          key={i}
          onClick={click}
          onMouseOver={over}
          data-index={obj.key}
          data-filter={filter.field === obj.key ? filter.value : ""}
          className={
            sort.field === obj.key
              ? "sorted" + (sort.desc ? " sorted-desc" : "")
              : ""
          }
        >
          {obj.value || obj.key}
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
      data: [],

      page: null,
      loading: true,
    };

    this.DATASOURCE_KEY = this.props.match.params[0];
    this.DATASOURCE_OBJ = getDataSourceByKey(this.DATASOURCE_KEY);
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
      this.getData();
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
    this.popOverInstance.show(el.target);
  }
  handleHeadClick(evt) {
    evt.preventDefault();
    const target = evt.target;
    /*[...target.parentNode.children].map(
      el => target !== el && el.classList.remove("sorted")
    );*/
    if (target.classList.contains("sorted")) {
      target.classList.toggle("sorted-desc");
    }

    // update|add sort query params
    const index = target.dataset.index;
    const value = target.classList.contains("sorted-desc") ? -1 : 1;
    const param = `sort.${index}=${value}`;
    let search = this.props.location.search;

    if (~search.indexOf("sort."))
      search = search.replace(/sort\.[^=]+=[^&]+/, param);
    else search += (search.length ? "&" : "") + param;

    this.props.history.push({
      pathname: this.props.location.pathname,
      search,
    });
  }
  popOverClickSearch(evt) {
    evt.preventDefault();
    const index = this.popOverInstance.thead;
    const value = this.popOverInstance.input().value;
    const param = `filter.${index}=${value}`;
    let search = this.props.location.search;

    // Update/remove filter query params
    if (~search.indexOf("filter."))
      search = search.replace(
        /(&?)filter\.[^=]+=[^&]+/,
        value.length ? `$1${param}` : ""
      );
    // Add
    else if (value.length) search += (search.length ? "&" : "") + param;
    else window.M.toast({ html: "Set the filter" });

    if (search !== this.props.location.search) this.popOverClickCancel();
    this.props.history.push({
      pathname: this.props.location.pathname,
      search,
    });
  }
  popOverClickCancel() {
    setTimeout(() => {
      this.popOverInstance.hide();
    }, 200);
  }

  getData() {
    this.props
      .dispatch(
        dsAction.listing({
          datasource: this.DATASOURCE_KEY,
          parameters: this.props.location.search,
        })
      )
      .then(data => {
        console.log(data);
        this.setState({
          data: data.list,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { data, loading, page } = this.state;
    const { search } = this.props.location;
    const { listingTableHead } = this.DATASOURCE_OBJ;

    const sort = {
      field: null,
      desc: false,
    };
    {
      const match = search.match(/sort\.([^=]+)=(-?\d)/);
      if (match !== null) {
        sort.field = match[1];
        sort.desc = !~match[2] | 0;
      }
    }
    const filter = {
      field: null,
      value: "",
    };
    {
      const match = search.match(/filter\.([^=]+)=([^&]+)/);
      if (match !== null) {
        filter.field = match[1];
        filter.value = match[2];
      }
    }

    return (
      <React.Fragment>
        <SideBar />
        <div className="row">
          <div className="col s12">
            <div className="card">
              {loading && <Loading />}
              {data.length ? (
                <React.Fragment>
                  <div className="listing-table">
                    <table className="responsive-table striped">
                      <TableHead
                        data={Object.keys(data[0]).map(key => ({
                          key,
                          value: listingTableHead[key]
                            ? listingTableHead[key].displayName
                            : "",
                        }))}
                        sort={sort}
                        filter={filter}
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
