import React, { Component } from "react";
import styled from "styled-components";

import Player from "../components/Player";
import Chat from "../components/Chat";
import Info from "../components/Info";

const AppGrid = styled.main`
  display: grid;
  grid-template-columns: auto 350px;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "player chat"
    "info chat";
  grid-area: main;
`;

class Channel extends Component {
  state = {
    loading: true,
    username: "",
    channel: null,
    isMuted: true
  };

  async componentDidMount() {
    const url = `localhost:3001/v1/users/${this.props.match.params.id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.data) {
      const { username, channel } = data.data;

      this.setState({
        loading: false,
        username,
        channel
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    if (!this.state.username) {
      return <h1>Channel {this.props.match.params.id} does not exist</h1>;
    }

    return (
      <AppGrid>
        <Player data={this.state} />
        <Info data={this.state} />
        <Chat />
      </AppGrid>
    );
  }
}

export default Channel;
