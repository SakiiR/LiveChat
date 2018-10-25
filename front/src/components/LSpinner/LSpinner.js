import "./LSpinner.css";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";

class LSpinner extends Component {
  render() {
    const { show, size } = this.props;
    return !!show && <CircularProgress size={size} color="secondary" />;
  }
}

LSpinner.propTypes = {
  size: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired
};

export default LSpinner;
