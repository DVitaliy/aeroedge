/**
  TODO: 
  - button which remove all filter - done
  - change inside params (status 1 - Completed) enumValues datasource.const
  - loading (skip getData if true, animation show) - done
  - SideBar (filter)
  - pagination (next, prev)
  - remove console.log
  - show error toast bad connect or fail getData
  - corrected position popOver at small size view (when listing table transformed)
  - in popover make userfull input -> for ProductId, RevicionCode.. - use select
*/

import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
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
/*const Loading = () => (
  <div className="progress">
    <div className="indeterminate" />
  </div>
);*/
const Pagination = ({ prev, next }) => (
  <ul className="pagination right">
    <li className={prev ? "" : "disabled"}>
      <Link to={prev} disabled={!prev}>
        <i className="material-icons">chevron_left</i>
      </Link>
    </li>
    <li className={next ? "" : "disabled"}>
      <Link to={next} disabled={!next}>
        <i className="material-icons">chevron_right</i>
      </Link>
    </li>
  </ul>
);
const FilterChip = ({ data }) => (
  <div style={{ padding: "10px" }}>
    {data.map((obj, i) => (
      <div className="chip" data-index={obj.key} key={i}>
        {obj.value}
        <i className="remove material-icons" onClick={() => obj.click(obj.key)}>
          close
        </i>
      </div>
    ))}
  </div>
);
const TableHead = ({ data, over, click, filter }) => (
  <thead className="highlight">
    <tr>
      {data.map((obj, i) => (
        <th
          key={i}
          onClick={click}
          onMouseOver={over}
          data-index={obj.key}
          data-filter={obj.filter}
          className={obj.sort}
        >
          {obj.value}
        </th>
      ))}
    </tr>
  </thead>
);
const TableBody = ({ data, click, pattern }) => (
  <tbody>
    {data.map((item, i) => (
      <tr key={i} onClick={click.bind(null, item)}>
        {Object.keys(item).map((key, i) => {
          const name =
            key in pattern
              ? "enumValues" in pattern[key]
                ? item[key] in pattern[key].enumValues
                  ? pattern[key].enumValues[item[key]]
                    ? pattern[key].enumValues[item[key]].displayName
                    : null
                  : null
                : null
              : null;
          return <td key={i}>{name || item[key]}</td>;
        })}
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
      loading: false,

      nextPage: null,
      prevPage: null,
      allPages: {},
    };

    this.DATASOURCE_KEY = this.props.match.params[0];
    this.DATASOURCE_OBJ = getDataSourceByKey(this.DATASOURCE_KEY);
    this.popOverInstance = null;
    this.popOverRef = React.createRef();
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleHeadOver = this.handleHeadOver.bind(this);
    this.handleHeadClick = this.handleHeadClick.bind(this);
    this.handleChipClick = this.handleChipClick.bind(this);
    this.popOverClickCancel = this.popOverClickCancel.bind(this);
    this.popOverClickSearch = this.popOverClickSearch.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.popOverInstance = popOver.init(this.popOverRef);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search)
      this.getData();
  }
  componentWillUnmount() {
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
  handleChipClick(key) {
    const { pathname, search } = this.props.location;
    this.props.history.push({
      pathname,
      search: search
        .replace(new RegExp("&?filter\\." + key + "=[^&]+"), "")
        .replace(/(&?)page=[^&]+/, ""),
    });
    this.setState({ nextPage: null, prevPage: null, allPages: {} });
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

    // Remove page params
    search = search.replace(/(&?)page=[^&]+/, "");
    this.setState({ nextPage: null, prevPage: null, allPages: {} });

    this.props.history.push({
      pathname: this.props.location.pathname,
      search,
    });
  }
  popOverClickSearch(evt) {
    evt.preventDefault();
    const index = this.popOverInstance.thead;
    const value = this.popOverInstance.input().value;

    if (!value.length) return window.M.toast({ html: "Set the filter" });

    const param = `filter.${index}=${value}`;
    let search = this.props.location.search;

    // Update filter query params
    if (~search.indexOf(`filter.${index}=`))
      search = search.replace(
        new RegExp("(&?)filter\\." + index + "=[^&]+"),
        `$1${param}`
      );
    // Add
    else search += (search.length ? "&" : "") + param;

    // Remove page params
    search = search.replace(/(&?)page=[^&]+/, "");
    this.setState({ nextPage: null, prevPage: null, allPages: {} });

    this.props.history.push({
      pathname: this.props.location.pathname,
      search,
    });
    this.popOverClickCancel();
  }
  popOverClickCancel() {
    setTimeout(() => {
      if (this.popOverInstance) this.popOverInstance.hide();
    }, 200);
  }
  generatePaging() {
    const { nextPage, prevPage } = this.state;
    const { search, pathname } = this.props.location;
    const prev =
      prevPage !== null
        ? pathname +
          search.replace(/(&?)page=[^&]+/, prevPage ? `$1page=${prevPage}` : "")
        : "";

    const next = nextPage
      ? ~search.indexOf("page=")
        ? pathname + search.replace(/page=[^&]+/, `page=${nextPage}`)
        : pathname + search + (search.length ? "&" : "") + "page=" + nextPage
      : "";

    return { prev, next };
  }
  getData() {
    if (this.state.loading) return;

    this.setState({ loading: true });
    const { search } = this.props.location;

    const preprocessing =
      "listingPreprocessGetData" in this.DATASOURCE_OBJ
        ? this.DATASOURCE_OBJ.listingPreprocessGetData
        : arg => arg;

    this.props
      .dispatch(
        dsAction.listing(
          preprocessing({
            datasource: this.DATASOURCE_KEY,
            parameters: search,
          })
        )
      )
      .then(data => {
        this.setState(
          state => {
            console.log(state, data);
            let result = {
              data: data.list,
              loading: false,
              nextPage: data.nextPage || null,
              prevPage:
                state.nextPage && state.nextPage in state.allPages
                  ? state.allPages[state.nextPage] !== data.nextPage
                    ? state.allPages[state.nextPage]
                    : (() => {
                        // prev click
                        try {
                          const match = search.match(/page=([^&]+)/);
                          return match && state.allPages[match[1]];
                        } catch (e) {}
                        return "1112";
                      })()
                  : state.nextPage,
              allPages: { ...state.allPages },
            };
            if (data.nextPage && !(data.nextPage in state.allPages)) {
              result.allPages[data.nextPage] = state.nextPage || "";
            }
            return result;
          },
          () => console.log(this.state)
        );
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
    const { search } = this.props.location;
    const { prev, next } = this.generatePaging();
    console.log(this.generatePaging());
    const { listingDataPattern = {} } = this.DATASOURCE_OBJ;
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
    const filters = {};
    {
      const matchAll = search.match(/filter\.[^=]+=[^&]+/g);
      if (matchAll !== null) {
        matchAll.forEach(key => {
          const match = key.match(/filter\.([^=]+)=([^&]+)/);
          if (match !== null) {
            filters[match[1]] = match[2];
          }
        });
      }
    }

    return (
      <React.Fragment>
        <SideBar />
        <div className="row">
          <div className="col s12">
            <div className="card">
              {/*loading && <Loading />*/}
              {Object.keys(filters).length !== 0 && (
                <FilterChip
                  data={Object.keys(filters).map(key => ({
                    key,
                    value: listingDataPattern[key]
                      ? listingDataPattern[key].displayName
                      : key,
                    click: this.handleChipClick,
                  }))}
                />
              )}
              {data.length ? (
                <React.Fragment>
                  <div className="listing-table">
                    <table className="responsive-table striped">
                      <TableHead
                        data={Object.keys(data[0]).map(key => ({
                          key,
                          value: listingDataPattern[key]
                            ? listingDataPattern[key].displayName
                            : key,
                          sort:
                            sort.field === key
                              ? "sorted" + (sort.desc ? " sorted-desc" : "")
                              : "",
                          filter: key in filters ? filters[key] : "",
                        }))}
                        over={this.handleHeadOver}
                        click={this.handleHeadClick}
                      />
                      <TableBody
                        data={data}
                        click={this.handleItemClick}
                        pattern={listingDataPattern}
                      />
                    </table>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      {<Pagination next={next} prev={prev} />}
                    </div>
                  </div>
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
