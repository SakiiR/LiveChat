import React from "react";
import ReactDOM from "react-dom";
import Rooms from "./Rooms";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Rooms />, div);
  ReactDOM.unmountComponentAtNode(div);
});
