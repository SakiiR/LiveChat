import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import pink from "@material-ui/core/colors/pink";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./containers/App/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./redux/store";
import history from "./utils/history";

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: {
      main: "#f06292"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
