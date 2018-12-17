import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "./Home";
import Channel from "./Channel";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar authenticated={this.state.isAuthenticated} user={this.user} />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/:id" component={Channel} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
