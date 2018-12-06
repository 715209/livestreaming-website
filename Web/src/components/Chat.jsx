import React, { Component } from "react";
import styled from "styled-components";

const ChatStyle = styled.div`
  // background-color: #062f4f;
  grid-area: chat;
  display: grid;
  grid-template-rows: 1fr auto;
`;

class Chat extends Component {
  render() {
    return (
      <ChatStyle>
        <div className="messages">
          <ul className="message-list">
            <li>
              <p>Hello</p>
            </li>
            <li>
              <p>Hello</p>
            </li>
            <li>
              <p>Hello</p>
            </li>
            <li>
              <p>This doesn't work</p>
            </li>
          </ul>
        </div>
        <div className="input">
          <input type="text" />
          <input type="submit" value="Submit" />
        </div>
      </ChatStyle>
    );
  }
}

export default Chat;
