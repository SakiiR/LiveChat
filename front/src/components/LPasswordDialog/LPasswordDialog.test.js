import React from "react";
import ReactDOM from "react-dom";
import LPasswordDialog from "./LPasswordDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LPasswordDialog />, div);
  ReactDOM.unmountComponentAtNode(div);
});
