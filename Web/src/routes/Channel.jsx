import React, { PureComponent } from "react";
import styled from "styled-components";
import MDSpinner from "react-md-spinner";

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

class Channel extends PureComponent {
  state = {
    loading: true,
    username: null,
    live: null,
    title: null
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
        live: channel.live,
        title: channel.title
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  componentDidMount() {
    this.grabChannelData();
    // this.interval = setInterval(() => this.grabChannelData(), 15000);
    this.interval = setInterval(() => this.grabChannelData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.loading) {
      return <MDSpinner size={50} />;
    }

    if (!this.state.username) {
      return <h1>Channel {this.props.match.params.id} does not exist</h1>;
    }

    return (
      <AppGrid>
        <Player username={this.state.username} live={this.state.live} />
        <Info
          username={this.state.username}
          live={this.state.live}
          title={this.state.title}
        />
        <Chat
          authenticated={this.props.authenticated}
          username={this.state.username}
        />
      </AppGrid>
    );
  }
}

export default Channel;
