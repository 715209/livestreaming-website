import React, { Component } from "react";
import styled from "styled-components";

const InputStyle = styled.div`
  background-color: #354463;
`;

class Chat extends Component {
  render() {
    return (
      <InputStyle className="input">
        <textarea placeholder="Send a message" maxLength="500" />
      </InputStyle>
    );
  }
}

export default Chat;
