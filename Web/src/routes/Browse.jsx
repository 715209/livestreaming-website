import React, { PureComponent } from "react";
import StreamCard from "../components/StreamCard";
import styled from "styled-components";
import MDSpinner from "react-md-spinner";

const BrowseStyle = styled.div`
  grid-area: main;
  width: calc(100vw - 3rem);
  margin-bottom: 3rem;
  margin: auto;
  margin-top: 0;

  h1 {
    color: #383f51;
  }

  @media (min-width: 800px) {
    width: calc(100vw - 7rem);
    margin: auto;
    margin-top: 0;
    margin-bottom: 3rem;
  }

  @media (min-width: 1350px) {
    width: 80rem;
    // margin-left: auto;
    // margin-right: auto;
    margin: auto;
    margin-top: 0;
    margin-bottom: 3rem;
  }
`;

const CardsStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  @media (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem 1rem;
  }

  @media (min-width: 1350px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem 1rem;
  }
`;

class Browse extends PureComponent {
  state = {
    loading: true,
    channels: []
  };

  async grabChannels() {
    try {
      const url = `${process.env.REACT_APP_API}/v1/users`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        this.setState({
          loading: false,
          channels: data.data
        });
      } else {
        this.setState({
          loading: false
        });
        throw new Error("Something went");
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.grabChannels();
    this.interval = setInterval(() => this.grabChannels(), 600000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <BrowseStyle>
        <h1>Browse</h1>
        {this.state.loading ? (
          <MDSpinner size={50} />
        ) : (
          <CardsStyle>
            {this.state.channels.map(channel => (
              <StreamCard key={channel._id} {...channel} />
            ))}
          </CardsStyle>
        )}
      </BrowseStyle>
    );
  }
}

export default Browse;
