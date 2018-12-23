import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "./Home";
import Browse from "./Browse";
import Channel from "./Channel";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  state = {
    isAuthenticating: true,
    isAuthenticated: false,
    user: null,
    username: "",
    password: "",
    email: ""
  };

  handleLogout = async () => {
    try {
      const url = `${process.env.REACT_APP_API}/v1/auth/logout`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        credentials: "include"
      });

      if (response.ok) {
        console.log("User logged out");
      } else {
        throw new Error("Something went wrong with logging out");
      }
    } catch (e) {
      console.log(e);
    }

    this.setState({
      isAuthenticated: false,
      user: null
    });
  };

  handleLogin = async e => {
    e.preventDefault();

    try {
      const url = `${process.env.REACT_APP_API}/v1/auth`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User logged in", data);

        const { username, admin } = data;
        this.setState({
          isAuthenticated: true,
          username: "",
          password: "",
          user: {
            username,
            admin
          }
        });
      } else {
        this.setState({
          username: "",
          password: ""
        });

        throw new Error();
      }
    } catch (e) {
      console.log("Error loggin in");
    }
  };

  handleFormChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = async e => {
    e.preventDefault();

    try {
      const url = `${process.env.REACT_APP_API}/v1/users`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered", data);

        const { username, admin } = data.data;
        this.setState({
          isAuthenticated: true,
          username: "",
          password: "",
          user: {
            username,
            admin
          }
        });
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log("Error registering user");
    }
  };

  async componentDidMount() {
    const url = `${process.env.REACT_APP_API}/v1/users/me`;
    const response = await fetch(url, {
      credentials: "include",
      method: "GET"
    });
    const status = await response.status;

    if (status === 200) {
      const data = await response.json();
      console.log(data);

      const { username, admin } = data.data;

      this.setState({
        isAuthenticating: false,
        isAuthenticated: true,
        user: {
          username,
          admin
        }
      });
    } else {
      console.log("Not logged in");

      this.setState({
        isAuthenticating: false
      });
    }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar onLogout={this.handleLogout} {...this.state} />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/browse" exact component={Browse} />
            <Route
              path="/login"
              exact
              render={props =>
                this.state.isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Login
                    onLogin={this.handleLogin}
                    onChange={this.handleFormChange}
                    username={this.state.username}
                    password={this.state.password}
                    {...props}
                  />
                )
              }
            />
            <Route
              path="/register"
              exact
              render={props =>
                this.state.isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Register
                    onRegister={this.handleRegister}
                    onChange={this.handleFormChange}
                    username={this.state.username}
                    password={this.state.password}
                    email={this.state.email}
                    {...props}
                  />
                )
              }
            />
            <Route path="/:id" component={Channel} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
