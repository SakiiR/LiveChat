import React from "react";
import { Route } from "react-router-dom";
import LDashboard from "../../components/LDashboard/LDashboard";
import "./App.css";
import Menu from "../Menu/Menu";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Rooms from "../Rooms/Rooms";
import Chat from "../Chat/Chat";
import PrivateRoute from "../../utils/privateRoute";
import "moment-timezone";

const App = () => (
  <div className="App">
    <header className="App-header">
      <Menu title="Live Chat" />
    </header>
    <div className="App-intro">
      <Route exact path="/" component={LDashboard} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/rooms" component={Rooms} />
      <PrivateRoute path="/room/:id" component={Chat} />
    </div>
  </div>
);

export default App;
