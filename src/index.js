/**
  TODO: process.env.NODE_ENV
  - include redux devtools only dev mode
  - subscribe to store only dev mode
*/

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Routing from "./containers/Routing";
import * as reducers from "./reducers";

import API from "./service/api";

import "./style.css";

const api = new API({
  host: process.env.REACT_APP_HOST_BACKEND,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: "react_practice" })
    : compose;

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
);

/**
 * remove dev logers
 */
store.subscribe(() => {
  console.log("getState", store.getState());
});
console.log(process.env);

render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Routing />
    </Router>
  </Provider>,
  document.getElementById("root")
);
