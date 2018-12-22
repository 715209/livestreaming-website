import React, { Component } from "react";
import styled from "styled-components";

import Message from "./Message";
// import Input from "./Input";

const ChatStyle = styled.div`
  background-color: #354463;
  grid-area: chat;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: -1px 0px 0 rgba(0, 0, 0, 0.2), -2px 0px 0 rgba(0, 0, 0, 0.06);
  z-index: 99;
  overflow: auto;
`;

const MessagesStyle = styled.div`
  color: #e8e9f3;
  padding: 10px;
  overflow-y: auto;
`;

class Chat extends Component {
  render() {
    return (
      <ChatStyle>
        <MessagesStyle className="messages">
          <Message />
        </MessagesStyle>
        {/* <Input /> */}
      </ChatStyle>
    );
  }
}

export default Chat;
