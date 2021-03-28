import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import throttle from "lodash/throttle";
import Dropdown from "../Dropdown";
import DefaultAvatar from "./DefaultAvatar";
import Search from "./Search";
import Button from "../../atoms/Button";
import { unsetAuth } from "../../redux/actions/auth";

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

  logout = () => {
    this.props.unsetAuth();
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
        { this.props.auth.isLogged && 
          <>
            <Search />
            <nav>
              <Dropdown>
                <Dropdown.Handler>
                  <DefaultAvatar className="avatar" name={this.props.auth.profile.name.charAt(0).toUpperCase()} />
                </Dropdown.Handler>
                <Dropdown.List>
                  <Dropdown.Item hideOnClick><NavLink to="/artists">Todos los artistas</NavLink></Dropdown.Item>
                  <Dropdown.Item hideOnClick><NavLink to="/albums">Todos los álbumes</NavLink></Dropdown.Item>
                  <Dropdown.Item hideOnClick><NavLink to="/favorites">Tus favoritos</NavLink></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item hideOnClick><NavLink to="/upload">Agregar contenido</NavLink></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item disabled>Ajustes</Dropdown.Item>
                  <Dropdown.Item><NavLink to="/login" onClick={this.logout}>Cerrar sesión</NavLink></Dropdown.Item>
                </Dropdown.List>
              </Dropdown>
            </nav>
          </>
        }
        { !this.props.auth.isLogged &&
          <nav>
            <Button onClick={e => this.props.history.push("/register")}>Registro</Button>
            <Button primary className="ml-2" onClick={e => this.props.history.push("/login")}>Login</Button>
          </nav>
        }
      </header>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = {
  unsetAuth,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Header);