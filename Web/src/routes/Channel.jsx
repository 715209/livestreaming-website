import React, { Component } from "react";
import styled from "styled-components";

import Player from "../components/Player";
import Chat from "../components/Chat";
import Info from "../components/Info";

const AppGrid = styled.main`
  display: grid;
  grid-template-columns: auto 350px;
  grid-template-rows: 1fr auto;
  background-color: green;
  grid-template-areas:
    "player chat"
    "info chat";
  grid-area: main;
`;

class Channel extends Component {
  render() {
    return (
      <AppGrid>
        <Player>
          <p>Player</p>
        </Player>
        <Info>
          <p>Channel {this.props.match.params.id}</p>
        </Info>
        <Chat>
          <div class="messages">
            <ul class="message-list">
              <li>
                <p>Hello</p>
              </li>
              <li>
                <p>Hello</p>
              </li>
              <li>
                <p>Hello</p>
              </li>
            </ul>
          </div>
          <div class="input">
            <input type="text" />
            <input type="submit" value="Submit" />
          </div>
        </Chat>
      </AppGrid>
    );
  }
}

export default Channel;
