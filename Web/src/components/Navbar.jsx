import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  background-color: #383f51;
  grid-area: navbar;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);
  z-index: 100;
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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </HeaderStyle>
    );
  }
}

export default Navbar;
