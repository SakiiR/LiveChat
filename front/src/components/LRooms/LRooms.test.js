import React from "react";
import ReactDOM from "react-dom";
import LRooms from "./LRooms";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LRooms />, div);
  ReactDOM.unmountComponentAtNode(div);
});
