import React from "react";
import ReactDOM from "react-dom";
import LLogin from "./LLogin";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LLogin />, div);
  ReactDOM.unmountComponentAtNode(div);
});
