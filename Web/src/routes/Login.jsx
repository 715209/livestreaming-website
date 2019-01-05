import React, { PureComponent } from "react";

// TODO: form validation and CSS
class Login extends PureComponent {
  render() {
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.props.onLogin} autoComplete="off">
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;
