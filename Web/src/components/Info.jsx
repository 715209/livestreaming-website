import React, { Component } from "react";
import styled from "styled-components";

const InfoStyle = styled.div`
  //   display: grid;
  //   grid-template-columns: 1fr 1fr 1fr;
  //   grid-template-rows: 1fr 1fr;
  //   grid-area: 4 / 1 / 5 / 4;
  // background-color: #b82601;
  grid-area: info;
`;

class Info extends Component {
  render() {
    return (
      <InfoStyle>
        <h2>
          {this.props.data.channel.live ? "Live " : "Offline "} -{" "}
          {this.props.data.username} - {this.props.data.channel.title}
        </h2>
      </InfoStyle>
    );
  }
}

export default Info;
