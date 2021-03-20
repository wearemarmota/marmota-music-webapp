import { useState } from "react";
import { withRouter } from "react-router-dom";

import FormGroup from "../atoms/FormGroup";
import InputText from "../atoms/InputText";
import Button from "../atoms/Button";

import AuthService from "../shared/auth-service";
import { toast } from "react-toastify";

const Register = ({ history }) => {

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    // window.localStorage.setItem("api_uri", uri);
    // history.push("/");
    AuthService.register(user, email, password).then(response => {
      // console.log(response);
      toast.success("Ya puedes iniciar sesión");
      history.push("/login")
    }).catch(error => {
      // const errors = error.data.error;
      // const firstKey = Object.keys(errors)[0];
      // const firstError = errors[firstKey];
      // alert(firstError[0]);
      toast.error("Mmmm... ha habido un error");
    })
  }

  const goToLogin = () => {
    history.push("/login");
  }

  return(
    <div className="container">
      <h2>Nuevo registro</h2>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <InputText label="Usuario" placeholder="johndoe83" value={user} onChange={ e => setUser(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <InputText label="Correo electrónico" placeholder="john.doe@email.com" value={email} onChange={ e => setEmail(e.target.value) } />
        </FormGroup>
        <FormGroup>
          <InputText type="password" label="Contraseña" placeholder="1234" value={password} onChange={ e => setPassword(e.target.value) } />
        </FormGroup>
        <Button primary type="submit">Registrar nueva cuenta</Button>
        {" "}
        <Button type="button" onClick={goToLogin}>Iniciar sesión</Button>
      </form>
    </div>
  );
}

export default withRouter(Register);