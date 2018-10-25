import React from "react";
import ReactDOM from "react-dom";
import LRegister from "./LRegister";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LRegister />, div);
  ReactDOM.unmountComponentAtNode(div);
});
