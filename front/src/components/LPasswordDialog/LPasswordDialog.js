import PropTypes from "prop-types";
import React, { PureComponent as Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./LPasswordDialog.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

class LPasswordDialog extends Component {
  constructor() {
    super();
    this.state = { password: "" };
  }

  internalHandleClose = (event = null) => {
    if (event !== null) event.preventDefault();
    const { handleClose } = this.props;
    const { password } = this.state;

    handleClose(password);
  };

  internalHandlePasswordChange = event => {
    const { value } = event.target;

    this.setState({ password: value });
  };

  render() {
    const { open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.internalHandleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.internalHandleClose}>
          <DialogTitle id="form-dialog-title">
            Access a password protected resource
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is a private resource ! Can you please enter this resource
              password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              type="password"
              label="Password"
              onChange={this.internalHandlePasswordChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.internalHandleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

LPasswordDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default LPasswordDialog;
