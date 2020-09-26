import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";

import "./index.scss";

class Header extends Component {
  render() {
    return (
      <header id="main-header">
        <h1>
          <NavLink to="/">
            <img
              src="/img/logo.svg"
              width="44"
              height="32"
              alt="Marmota Music"
            />
          </NavLink>
        </h1>
        <nav>
          <NavLink to="/artists">Artistas</NavLink>
          <NavLink to="/albums">Álbumes</NavLink>
          <NavLink to="/upload">Subir</NavLink>
          <img
            src="https://picsum.photos/id/433/50/50"
            className="avatar"
            width="50"
            height="50"
            alt="Avatar"
          />
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
