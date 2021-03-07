import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import classNames from "classnames/bind";
import throttle from "lodash/throttle";
import Dropdown from "../Dropdown";
import DefaultAvatar from "./DefaultAvatar";
import Search from "./Search";
import { setSearchTerm } from "../../redux/actions/search";

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
    const scrolled = currentScrollTop > 20;
    if(scrolled !== this.state.scrolled){
      this.setState({ scrolled: scrolled });
    }
  }

  handleDocumentScrollThrottled = throttle(this.handleDocumentScroll, 250);

  render() {
    const { setSearchTerm } = this.props;
    return (
      <header id="main-header" className={classNames({scrolled: this.state.scrolled})}>
        <h1>
          <NavLink to="/" onClick={e => setSearchTerm("")}>
            <img src="/img/logo.svg" alt="Marmota Music" />
          </NavLink>
        </h1>
        <Search />
        <nav>
          <Dropdown>
            <Dropdown.Handler>
              <DefaultAvatar className="avatar" name="E" />
            </Dropdown.Handler>
            <Dropdown.List>
              <Dropdown.Item hideOnClick><NavLink to="/artists">Todos los artistas</NavLink></Dropdown.Item>
              <Dropdown.Item hideOnClick><NavLink to="/albums">Todos los álbumes</NavLink></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item hideOnClick><NavLink to="/upload">Agregar contenido</NavLink></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item disabled>Ajustes</Dropdown.Item>
              <Dropdown.Item hideOnClick><NavLink to="/api-settings">Ajustes API</NavLink></Dropdown.Item>
              <Dropdown.Item disabled>Cerrar sesión</Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </nav>
      </header>
    );
  }
}

const mapDispatchToProps = {
  setSearchTerm,
}

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(Header);