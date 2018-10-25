import PropTypes from "prop-types";
import React, { PureComponent as Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./LLogin.css";

class LLogin extends Component {
  username = "";

  password = "";

  handleChangeUsername = event => {
    const { value } = event.target;
    this.username = value;
  };

  handleChangePassword = event => {
    const { value } = event.target;
    this.password = value;
  };

  internalHandleSubmit = event => {
    event.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit({
      username: this.username,
      password: this.password
    });
  };

  render() {
    return (
      <div className="LLogin">
        <form
          className="container"
          noValidate
          autoComplete="off"
          onSubmit={this.internalHandleSubmit}
        >
          <h1>Please Login</h1>
          <TextField
            id="username"
            label="Username"
            className="field username"
            onChange={this.handleChangeUsername}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            className="field password"
            onChange={this.handleChangePassword}
            margin="normal"
          />
          <Button
            className="submit"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

LLogin.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default LLogin;
