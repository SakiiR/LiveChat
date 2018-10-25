import React from "react";
import ReactDOM from "react-dom";
import LChat from "./LChat";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LChat />, div);
  ReactDOM.unmountComponentAtNode(div);
});
