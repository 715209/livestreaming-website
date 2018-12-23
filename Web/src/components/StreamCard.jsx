import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardStyle = styled.div`
  color: #e8e9f3;
  text-shadow: 2px 2px 8px #3c4f76;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  a {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    color: inherit;
    text-decoration: none;
  }
`;

const ImgStyle = styled.img`
  width: 100%;
  grid-column: 1 / 3;
  grid-row: 1 / span 3;
`;

const HeaderStyle = styled.div`
  font-weight: bold;
  grid-column: 2;
  grid-row: 1;
  padding-right: 1rem;
  padding-top: 1rem;
  text-shadow: none;

  .live {
    background-color: #ff00009e;
    border-radius: 2px;
    padding: 2px;
  }

  .offline {
    background-color: #0000009e;
    border-radius: 2px;
    padding: 2px;
  }
`;

const InfoStyle = styled.div`
  grid-column: 1 / span 2;
  grid-row: 3;
  padding-left: 1rem;
  padding-bottom: 1rem;

  h2,
  p {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

class StreamCard extends Component {
  render() {
    return (
      <CardStyle>
        <Link to={this.props.username}>
          <ImgStyle
            src="https://via.placeholder.com/1920x1080?text=Stream+preview"
            alt="Stream preview"
          />
          <HeaderStyle className="header">
            {this.props.channel.live ? (
              <span className="live">LIVE</span>
            ) : (
              <span className="offline">OFFLINE</span>
            )}
          </HeaderStyle>
          <InfoStyle className="info">
            <h2>{this.props.channel.title}</h2>
            <p>{this.props.username}</p>
          </InfoStyle>
        </Link>
      </CardStyle>
    );
  }
}

export default StreamCard;
