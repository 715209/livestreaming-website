import React, { Component } from "react";
import styled from "styled-components";

const InfoStyle = styled.div`
  background-color: #3c4f76;
  color: #e8e9f3;
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
