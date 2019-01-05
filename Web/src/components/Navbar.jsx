import React, { PureComponent } from "react";
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
`;

const ImageStyle = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 0.5em;
`;

const UserStyle = styled.div`
  // padding: 0 1rem;

  p {
    margin: 0;
  }
`;

class Navbar extends PureComponent {
  render() {
    return (
      <HeaderStyle>
        <NavStyle>
          {!this.props.isAuthenticating && (
            <React.Fragment>
              <div>
                <Link to="/">Home</Link>
                <Link to="/browse">Browse</Link>
              </div>

              <UserStyle>
                {this.props.isAuthenticated ? (
                  <React.Fragment>
                    <ImageStyle
                      src="https://cdn.discordapp.com/avatars/111583925750501376/ab76e8f10416f0b30da27e9bcb955f9f.png?size=128"
                      alt="User Avatar"
                    />
                    <p>{this.props.user.username}</p>
                    <Link to="#" onClick={this.props.onLogout}>
                      Log out
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </React.Fragment>
                )}
              </UserStyle>
            </React.Fragment>
          )}
        </NavStyle>
      </HeaderStyle>
    );
  }
}

export default Navbar;
