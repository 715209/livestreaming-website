import React, { Component } from "react";
import styled from "styled-components";
import Hls from "hls.js";

const PlayerStyle = styled.div`
  grid-area: player;
  display: grid;
  grid-auto-columns: 1fr;
`;

const VideoStyle = styled.video`
  width: 100%;
  height: 100%;
  background: #000000;
`;

class Player extends Component {
  createHlsStream() {
    if (Hls.isSupported() && this.videoPlayer && this.props.data.channel.live) {
      this.hls = new Hls({ liveDurationInfinity: true });
      const video = this.videoPlayer;
      const url = `localhost:3002/hls/${this.props.data.username}.m3u8`;

      this.hls.loadSource(url);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const promise = video.play();

        if (promise !== undefined) {
          promise
            .then(() => {
              // Autoplay started!
              console.log("Autoplay started!");
            })
            .catch(error => {
              // Autoplay was prevented.
              // Show a "Play" button so that user can start playback.
              console.log("Autoplay prevented let's play the video muted!");
              video.muted = true;
              video.controls = true;
              video.play();
            });
        }
      });
    }
  }

  componentDidMount = () => {
    this.createHlsStream();
  };

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.data.channel.live && this.hls) {
      this.hls.destroy();
      console.log("destroyed hls");
    }

    if (this.props.data.channel.live && !this.hls) {
      this.createHlsStream();
      console.log("created hls");
    }
  }

  render() {
    return (
      <PlayerStyle>
        <VideoStyle
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          autoPlay={true}
          playsInline={true}
          poster="https://via.placeholder.com/1920x1080?text=Livestream+is+currently+offline"
        />
        <div className="control">
          <h1>Yes hello</h1>
        </div>
      </PlayerStyle>
    );
  }
}

export default Player;
