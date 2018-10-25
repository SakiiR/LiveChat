import React from "react";
import ReactDOM from "react-dom";
import LSpinner from "./LSpinner";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LSpinner />, div);
  ReactDOM.unmountComponentAtNode(div);
});
