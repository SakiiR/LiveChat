import "./LMenu.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import decode from "jwt-decode";
import LSpinner from "../LSpinner/LSpinner";

const getUsernameFromJwt = jwt => {
  if (jwt !== null) {
    let { username } = decode(jwt);
    return username;
  }
  return "";
};

const LMenu = props => {
  const { loggedIn, title, handleLogout, error, loading, jwt } = props;
  const username = getUsernameFromJwt(jwt);
  return (
    <div className="MyAppBar">
      <AppBar position="static">
        <Toolbar>
          <Typography className="MyBarInfo" variant="title" color="inherit">
            {title}
          </Typography>
          <Link to="/">
            <Button color="inherit">Dashboard</Button>
          </Link>
          {!loggedIn && (
            <div>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </div>
          )}
          {!!loggedIn && (
            <div>
              <Link to="/rooms">
                <Button color="inherit">Rooms</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <span>Logged in as {!!username && <span>{username}</span>}</span>
            </div>
          )}
          <LSpinner size={30} show={loading} />
        </Toolbar>
      </AppBar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={!!error}
        message={<span id="message-id">{error}</span>}
      />
    </div>
  );
};

LMenu.defaultProps = {
  error: null,
  jwt: null
};

LMenu.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  jwt: PropTypes.string,
  error: PropTypes.string
};

export default LMenu;
