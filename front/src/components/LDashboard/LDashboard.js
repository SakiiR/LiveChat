import React from "react";
import { Link } from "react-router-dom";
import "./LDashboard.css";

const LDashboard = () => (
  <div className="LDashboard">
    <div>
      <p>
        Welcome to the dashboard :) Go <Link to="/register">Here</Link> to
        create a new account.
      </p>
      <p>
        Or click <Link to="/login">Here</Link> to login.
      </p>
    </div>
  </div>
);

export default LDashboard;
