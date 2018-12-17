import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.header`
  background-color: #383f51;
  grid-area: navbar;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);
  z-index: 100;
  color: #ffffff;
`;

const NavStyle = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0 1em;
  height: 53px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    padding: 0 1rem;
  }

  // grid-template-rows: auto auto 1fr;
  // grid-template-areas:
  //   "player"
  //   "info"
  //   "chat";
`;

const ImageStyle = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 0.5em;
`;

const UserStyle = styled.div``;

class Navbar extends Component {
  render() {
    return (
      <HeaderStyle>
        <NavStyle>
          <div>
            <Link to="/">Home</Link>
            {this.props.authenticated ? (
              <React.Fragment>
                <Link to="/logout">Log out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </React.Fragment>
            )}
          </div>

          {this.props.user && (
            <UserStyle>
              <ImageStyle
                src="https://cdn.discordapp.com/avatars/111583925750501376/ab76e8f10416f0b30da27e9bcb955f9f.png?size=128"
                alt="User Avatar"
              />
              <p>715209</p>
            </UserStyle>
          )}
        </NavStyle>
      </HeaderStyle>
    );
  }
}

export default Navbar;
