import React, { Component } from "react";
import styled from "styled-components";
import openSocket from "socket.io-client";

import Message from "./Message";
import Input from "./Input";

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
  state = {
    messages: [],
    socket: openSocket(process.env.REACT_APP_WS)
  };

  componentDidMount() {
    this.state.socket.emit("subscribe", this.props.username);
    this.state.socket.on("newMessage", message => {
      message.timestamp = new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      this.setState(prevState => {
        return {
          messages: [...prevState.messages, message]
        };
      });
    });
  }

  componentWillUnmount() {
    // Leave the room
    this.state.socket.emit("unsubscribe", this.props.username);
  }

  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;

    if (this.state.messages.length === 100) {
      this.setState(prevState => {
        return {
          messages: prevState.messages.slice(1)
        };
      });
    }
  }

  render() {
    return (
      <ChatStyle>
        <MessagesStyle ref={messageList => (this.messageList = messageList)}>
          {this.state.messages.map(msg => (
            <Message key={msg.id} {...msg} />
          ))}
        </MessagesStyle>
        <Input
          authenticated={this.props.authenticated}
          socket={this.state.socket}
          username={this.props.username}
        />
      </ChatStyle>
    );
  }
}

export default Chat;
