import React from "react";
import ReactDOM from "react-dom";
import LDashboard from "./LDashboard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
