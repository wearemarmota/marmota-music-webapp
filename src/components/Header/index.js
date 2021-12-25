import { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDebounce, useWindowScroll } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { unsetAuth } from "../../redux/actions/auth";

import Dropdown from "../Dropdown";
import DefaultAvatar from "./DefaultAvatar";
import Search from "./Search";
import Button from "../../atoms/Button";

import "./index.scss";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const auth = useSelector((state) => state.auth);

  const { y: scrollY } = useWindowScroll();

  useDebounce(() => setScrolled(scrollY > 20), 250, [scrollY]);

  return (
    <header id="main-header" className={classNames({ scrolled: scrolled })}>
      <h1>
        <NavLink to="/">
          <img src="/img/logo.svg" alt="Marmota Music" />
        </NavLink>
      </h1>
      {auth.isLogged ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </header>
  );
};

const AuthenticatedNav = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <Search />
      <nav>
        <Dropdown>
          <Dropdown.Handler>
            <button className="unstyled">
              <DefaultAvatar
                className="avatar"
                name={auth.profile.name.charAt(0).toUpperCase()}
              />
            </button>
          </Dropdown.Handler>
          <Dropdown.List fixed>
            <Dropdown.Item hideOnClick>
              <NavLink to="/artists">Todos los artistas</NavLink>
            </Dropdown.Item>
            <Dropdown.Item hideOnClick>
              <NavLink to="/albums">Todos los álbumes</NavLink>
            </Dropdown.Item>
            <Dropdown.Item hideOnClick>
              <NavLink to="/favorites">Tus favoritos</NavLink>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item hideOnClick>
              <NavLink to="/upload">Agregar contenido</NavLink>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item disabled>Ajustes</Dropdown.Item>
            <Dropdown.Item>
              <NavLink to="/login" onClick={() => dispatch(unsetAuth())}>
                Cerrar sesión
              </NavLink>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </nav>
    </>
  );
};

const UnauthenticatedNav = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <nav>
      {location.pathname === "/login" && (
        <Button onClick={() => history.push("/register")}>Registro</Button>
      )}
      {location.pathname === "/register" && (
        <Button onClick={() => history.push("/login")}>Login</Button>
      )}
    </nav>
  );
};

export default Header;
