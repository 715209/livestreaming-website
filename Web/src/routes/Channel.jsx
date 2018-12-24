import React, { Component } from "react";
import styled from "styled-components";

import Player from "../components/Player";
import Chat from "../components/Chat";
import Info from "../components/Info";

const AppGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "player"
    "info"
    "chat";
  grid-area: main;
  overflow: hidden;

  @media (min-width: 800px) {
    grid-template-columns: auto 350px;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "player chat"
      "info chat";
  }
`;

class Channel extends Component {
  state = {
    loading: true,
    username: "",
    channel: null
  };

  async grabChannelData() {
    const url = `${process.env.REACT_APP_API}/v1/users/${
      this.props.match.params.id
    }`;
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

  componentDidMount() {
    this.grabChannelData();
    this.interval = setInterval(() => this.grabChannelData(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
        <Chat
          authenticated={this.props.authenticated}
          username={this.state.username}
        />
      </AppGrid>
    );
  }
}

export default Channel;
