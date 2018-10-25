import React from "react";
import ReactDOM from "react-dom";
import LCreateRoom from "./LCreateRoom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LCreateRoom />, div);
  ReactDOM.unmountComponentAtNode(div);
});
