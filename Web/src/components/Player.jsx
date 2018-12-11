import React, { Component } from "react";
import styled from "styled-components";
import Hls from "hls.js";

const PlayerStyle = styled.div`
  grid-area: player;
  display: grid;
  grid-auto-columns: 1fr;
  position: relative;
`;

const VideoStyle = styled.video`
  width: 100%;

  @media (min-width: 800px) {
    height: 100%;
  }
`;

const PlayerControlsStyle = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-wrap: wrap;
  padding: 5px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-shadow: inset 0px -27px 19px 0px #0000007a;
  transition: opacity 0.3s;
`;

const LeftControlsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  div {
    margin-left: 10px;
  }
`;

const RightControlsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;

  div {
    margin-right: 10px;
  }
`;

const PlayStyle = styled.button``;

const PauseStyle = styled.button``;

class Player extends Component {
  state = {
    isMuted: true,
    isPaused: true,
    volume: 1,
    showControls: true
  };

  // will rewrite this one day
  createHlsStream() {
    const video = this.videoPlayer;
    const url = `localhost:3002/hls/${this.props.data.username}.m3u8`;

    if (Hls.isSupported() && this.videoPlayer && this.props.data.channel.live) {
      this.hls = new Hls({ liveDurationInfinity: true });

      this.hls.loadSource(url);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const promise = video.play();

        if (promise !== undefined) {
          promise
            .then(() => {
              console.log("Autoplay started!");
              this.volumeInput.value = this.state.volume;

              this.setState({
                isMuted: false,
                isPaused: false
              });
            })
            .catch(error => {
              console.log("Autoplay prevented let's play the video muted!");
              this.setState({
                isMuted: true,
                isPaused: false
              });

              this.volumeInput.value = 0;
              video.muted = true;
              video.play();
            });
        }
      });
    } else if (
      video.canPlayType("application/vnd.apple.mpegurl") &&
      this.props.data.channel.live
    ) {
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        const promise = video.play();

        if (promise !== undefined) {
          promise
            .then(() => {
              console.log("Autoplay started!");

              this.setState({
                isMuted: false,
                isPaused: false
              });
            })
            .catch(error => {
              console.log("Autoplay prevented let's play the video muted!");
              this.setState({
                isMuted: true,
                isPaused: false
              });

              video.muted = true;
              video.play();
            });
        }
      });
    }
  }

  handlePlay = () => {
    if (this.videoPlayer.paused) {
      this.videoPlayer.play();

      this.setState({
        isPaused: false
      });
    } else {
      this.videoPlayer.pause();

      this.setState({
        isPaused: true
      });
    }
  };

  handleMute = () => {
    if (this.videoPlayer.muted) {
      this.videoPlayer.muted = false;
      this.videoPlayer.volume = this.state.volume;
      this.volumeInput.value = this.state.volume;

      this.setState({
        isMuted: false
      });
    } else {
      this.videoPlayer.muted = true;
      this.videoPlayer.volume = 0;
      this.volumeInput.value = 0;

      this.setState({
        isMuted: true
      });
    }
  };

  handleVolume = e => {
    this.videoPlayer.volume = e.target.value;
    this.volumeInput.value = e.target.value;

    this.setState({
      volume: e.target.value
    });
  };

  handleFullscreen = () => {
    if (this.videoPlayer.requestFullscreen) {
      this.videoPlayer.requestFullscreen();
    } else if (this.videoPlayer.mozRequestFullScreen) {
      this.videoPlayer.mozRequestFullScreen();
    } else if (this.videoPlayer.webkitRequestFullscreen) {
      this.videoPlayer.webkitRequestFullscreen();
    }
  };

  handleMouseMove = () => {
    clearTimeout(this.interval);

    this.interval = setTimeout(() => {
      this.setState({ showControls: false });
      console.log("LOLILULLULUL");
    }, 5000);

    this.setState({ showControls: true });
  };

  handleMouseLeave = () => {
    clearTimeout(this.interval);

    this.setState({ showControls: false });
  };

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
    // if (!this.props.data.channel.live && this.hls) {
    //   this.hls.destroy();
    //   console.log("destroyed hls");
    // }
    // if (this.props.data.channel.live && !this.hls) {
    //   this.createHlsStream();
    //   console.log("created hls");
    // }
  }

  render() {
    return (
      <PlayerStyle
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        style={{ cursor: this.state.showControls ? "" : "none" }}
      >
        <VideoStyle
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          autoPlay={true}
          playsInline={true}
          poster="https://via.placeholder.com/1920x1080?text=Livestream+is+currently+offline"
        />

        <PlayerControlsStyle
          className="controls"
          style={{ opacity: this.state.showControls ? 1 : 0 }}
        >
          <LeftControlsStyle>
            <div>
              {this.state.isPaused ? (
                <PlayStyle onClick={this.handlePlay}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path
                      id="play"
                      data-name="Polygon 1"
                      className="cls-1"
                      d="M30.56,17.841l-25,12.5v-25Z"
                    />
                  </svg>
                </PlayStyle>
              ) : (
                <PauseStyle onClick={this.handlePlay}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <rect
                      className="cls-1"
                      x="-2"
                      y="-1"
                      width="17"
                      height="44"
                    />
                    <rect
                      className="cls-1"
                      x="21"
                      y="-1"
                      width="17"
                      height="44"
                    />
                  </svg>
                </PauseStyle>
              )}
            </div>

            <div>
              {this.state.isMuted || this.state.volume === "0" ? (
                <button onClick={this.handleMute}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 461.55 461.55"
                  >
                    <g>
                      <g id="volume-off">
                        <path
                          d="M345.525,229.5c0-45.9-25.5-84.15-63.75-102v56.1l63.75,63.75C345.525,239.7,345.525,234.6,345.525,229.5z M409.275,229.5    c0,22.95-5.1,45.9-12.75,66.3l38.25,38.25c17.85-30.6,25.5-68.85,25.5-107.1c0-109.65-76.5-201.45-178.5-224.4V56.1    C355.725,81.6,409.275,147.9,409.275,229.5z M34.425,0L1.275,33.15L121.125,153H1.275v153h102l127.5,127.5V262.65L340.425,372.3    c-17.851,12.75-35.7,22.95-58.65,30.601v53.55c35.7-7.65,66.3-22.95,94.35-45.9l51,51l33.15-33.149l-229.5-229.5L34.425,0z     M230.775,25.5l-53.55,53.55l53.55,53.55V25.5z"
                          fill="#FFFFFF"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
              ) : (
                <button onClick={this.handleMute}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    width="512px"
                    height="512px"
                    viewBox="0 0 459 459"
                  >
                    <g>
                      <g id="volume-up">
                        <path
                          d="M0,153v153h102l127.5,127.5v-408L102,153H0z M344.25,229.5c0-45.9-25.5-84.15-63.75-102v204    C318.75,313.65,344.25,275.4,344.25,229.5z M280.5,5.1v53.55C354.45,81.6,408,147.899,408,229.5S354.45,377.4,280.5,400.35V453.9    C382.5,430.949,459,339.15,459,229.5C459,119.85,382.5,28.049,280.5,5.1z"
                          fill="#FFFFFF"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
              )}
            </div>
            <input
              type="range"
              name="volume"
              id="volume"
              min="0"
              max="1"
              step="0.05"
              defaultValue="1"
              onChange={this.handleVolume}
              ref={input => (this.volumeInput = input)}
            />
          </LeftControlsStyle>

          <RightControlsStyle>
            <div>
              <button onClick={this.handleFullscreen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path d="M1 1v6h2V3h4V1H1zm2 12H1v6h6v-2H3v-4zm14 4h-4v2h6v-6h-2v4zm0-16h-4v2h4v4h2V1h-2z" />
                </svg>
              </button>
            </div>
          </RightControlsStyle>
        </PlayerControlsStyle>
      </PlayerStyle>
    );
  }
}

export default Player;
