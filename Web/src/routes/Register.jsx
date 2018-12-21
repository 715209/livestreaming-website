import React, { Component } from "react";

// TODO: form validation and CSS
class Register extends Component {
  render() {
    return (
      <div>
        <h1>Register</h1>

        <form onSubmit={this.props.onRegister}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.props.username}
              onChange={this.props.onChange}
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.props.password}
              onChange={this.props.onChange}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={this.props.email}
              onChange={this.props.onChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Register;
