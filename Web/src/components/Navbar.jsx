import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  background-color: red;
  grid-area: navbar;
`;

class Navbar extends Component {
  render() {
    return (
      <HeaderStyle>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
          </ul>
        </nav>
      </HeaderStyle>
    );
  }
}

export default Navbar;
