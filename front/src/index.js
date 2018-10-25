import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./containers/App/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./redux/store";
import history from "./utils/history";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
