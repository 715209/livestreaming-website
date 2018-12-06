import React, { Component } from "react";
import styled from "styled-components";
import Hls from "hls.js";

const PlayerStyle = styled.div`
  // grid-area: 2 / 1 / 4 / 4;
  // background-color: orange;
  grid-area: player;

  display: grid;
  grid-auto-columns: 1fr;
`;

class Player extends Component {
  componentDidMount = () => {
    if (Hls.isSupported() && this.videoPlayer) {
      const hls = new Hls({ liveDurationInfinity: true });
      const video = this.videoPlayer;
      const url = `localhost:3002/hls/${this.props.data.username}.m3u8`;

      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  };

  render() {
    const style = {
      width: "100%",
      height: "100%",
      background: "#000000"
    };

    return (
      <PlayerStyle>
        <video
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          autoPlay={true}
          muted={this.props.data.isMuted}
          style={style}
        />
      </PlayerStyle>
    );
  }
}

export default Player;
