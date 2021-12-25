import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import AuthService from "../shared/auth-service";
import { setAuth } from "../redux/actions/auth";

import FormGroup from "../atoms/FormGroup";
import InputText from "../atoms/InputText";
import Button from "../atoms/Button";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(email, password)
      .then((response) => {
        const { token, profile } = response;
        dispatch(setAuth(token, profile));
      })
      .catch((error) => {
        toast.error(`No puedes pasar: ${error.data.error}`);
      });
  };

  return (
    <div className="container smallest">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <InputText
            label="Correo electrónico"
            placeholder="john.doe@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <InputText
            type="password"
            label="Contraseña"
            placeholder="1234"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button primary type="submit" className="w-100">
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
};

export default Login;
