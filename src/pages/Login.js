import { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import FormGroup from "../atoms/FormGroup";
import InputText from "../atoms/InputText";
import Button from "../atoms/Button";

import AuthService from "../shared/auth-service";
import { setAuth } from "../redux/actions/auth";

const Login = ({ history, setAuth, ...props }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onSubmit = e => {
    e.preventDefault();
    AuthService.login(email, password).then(response => {
      const { token, profile } = response;
      setAuth(
        token,
        profile,
      );
    }).catch(error => {
      toast.error(`No puedes pasar: ${error.data.error}`);
    })
  }

  return(
    <div className="container smallest">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <InputText label="Correo electrónico" placeholder="john.doe@email.com" value={email} onChange={ e => setEmail(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <InputText type="password" label="Contraseña" placeholder="1234" value={password} onChange={ e => setPassword(e.target.value) } />
        </FormGroup>
        <Button primary type="submit">Iniciar sesión</Button>
        {" "}
        <Button type="button" onClick={e => history.push("/register")}>Registrar nueva cuenta</Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
}

const mapDispatchToProps = {
  setAuth,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Login);