import React, { Component } from "react";

class Channel extends Component {
  render() {
    return (
      <div>
        <h1>Channel {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default Channel;
