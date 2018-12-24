import React, { Component } from "react";
import styled from "styled-components";

const InputStyle = styled.div`
  background-color: #354463;
`;

class Input extends Component {
  state = {
    input: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    this.props.socket.emit("message", {
      input: this.state.input,
      room: this.props.username
    });
    this.setState({ input: "" });
  };

  keyPress = e => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.onSubmit();
      this.setState({ input: "" });
    }
  };

  render() {
    return (
      <InputStyle className="input">
        <textarea
          name="input"
          placeholder="Send a message"
          maxLength="500"
          value={this.state.input}
          onChange={this.onChange}
          onKeyDown={this.keyPress}
          disabled={this.props.authenticated ? false : true}
        />
        <button
          type="submit"
          onClick={this.onSubmit}
          disabled={this.props.authenticated ? false : true}
        >
          Send
        </button>
      </InputStyle>
    );
  }
}

export default Input;
