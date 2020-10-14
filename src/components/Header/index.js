import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import throttle from "lodash/throttle";
import DefaultAvatar from "./DefaultAvatar";

import "./index.scss";

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      scrolled: false,
    };
  }
  
  componentDidMount(){
    window.addEventListener('scroll', this.handleDocumentScrollThrottled);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleDocumentScrollThrottled);
  }

  handleDocumentScroll = () => {
    const { scrollTop: currentScrollTop } = document.documentElement || document.body;
    const scrolled = currentScrollTop > 10;
    if(scrolled !== this.state.scrolled){
      this.setState({ scrolled: scrolled });
    }
  }

  handleDocumentScrollThrottled = throttle(this.handleDocumentScroll, 250);

  render() {
    return (
      <header id="main-header" className={classNames({scrolled: this.state.scrolled})}>
        <h1>
          <NavLink to="/">
            <img src="/img/logo.svg" alt="Marmota Music" />
          </NavLink>
        </h1>
        <nav>
          <NavLink to="/artists">Artistas</NavLink>
          <NavLink to="/albums">Álbumes</NavLink>
          <NavLink to="/upload">Subir</NavLink>
        </nav>
        <nav>
          <DefaultAvatar name="E" alt="Avatar" className="avatar" />
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
