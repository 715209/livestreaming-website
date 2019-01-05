import React, { PureComponent } from "react";
import styled from "styled-components";

const InfoStyle = styled.div`
  background-color: #3c4f76;
  color: #e8e9f3;
  grid-area: info;
  box-shadow: 0px -1px 0 rgba(0, 0, 0, 0.2), 0px -2px 0 rgba(0, 0, 0, 0.06);
  z-index: 99;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1em 0 1em;
`;

const PStyle = styled.p`
  margin-left: 15px;
`;

const UsernameStyle = styled.h2`
  margin-left: 15px;
`;

const ImageStyle = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

const StatusStyle = styled.p`
  margin-left: auto;
`;

class Info extends PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.username !== nextProps.username) {
  //     return true;
  //   }

  //   if (this.props.channel.title !== nextProps.channel.title) {
  //     return true;
  //   }

  //   if (this.props.channel.live !== nextProps.channel.live) {
  //     return true;
  //   }

  //   return false;
  // }

  render() {
    return (
      <InfoStyle>
        <ImageStyle
          src="https://cdn.discordapp.com/avatars/111583925750501376/ab76e8f10416f0b30da27e9bcb955f9f.png?size=128"
          alt="Channel Avatar"
        />
        <UsernameStyle>{this.props.username}</UsernameStyle>
        <PStyle>{this.props.title}</PStyle>
        <StatusStyle>{this.props.live ? "LIVE " : "OFFLINE "}</StatusStyle>
      </InfoStyle>
    );
  }
}

export default Info;
