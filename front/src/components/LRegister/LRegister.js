import PropTypes from "prop-types";
import React, { PureComponent as Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./LRegister.css";

class LRegister extends Component {
  state = {
    username: "",
    password: "",
    passwordr: "",
    error: false
  };

  handleChange = name => event => {
    const { value } = event.target;
    this.setState(
      (pState, props) => ({
        ...pState.user,
        [name]: value
      }),
      () => {
        // Called at the end of setState so the value of inputs have been updated
        const { password, passwordr } = this.state;
        this.setState({ error: password !== passwordr });
      }
    );
  };

  internalHandleSubmit = event => {
    event.preventDefault();
    const { username, password, passwordr } = this.state;
    const { handleSubmit } = this.props;
    if (password === passwordr)
      handleSubmit({
        username: username,
        password: password
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="LRegister">
        <form
          className="container"
          noValidate
          autoComplete="off"
          onSubmit={this.internalHandleSubmit}
        >
          <h1>Please Register</h1>
          <TextField
            id="username"
            label="Username"
            className="field username"
            onChange={this.handleChange("username")}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            className="field password"
            onChange={this.handleChange("password")}
            margin="normal"
          />
          <TextField
            id="password2"
            error={error}
            label="Repeat Password"
            type="password"
            className="field password"
            onChange={this.handleChange("passwordr")}
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

LRegister.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default LRegister;
