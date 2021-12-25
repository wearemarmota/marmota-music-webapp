import { useState } from "react";
import { useHistory } from "react-router-dom";

import FormGroup from "../atoms/FormGroup";
import InputText from "../atoms/InputText";
import Button from "../atoms/Button";

import AuthService from "../shared/auth-service";
import { toast } from "react-toastify";

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user, email, password)
      .then(() => {
        toast.success("Ya puedes iniciar sesión");
        history.push("/login");
      })
      .catch(() => {
        toast.error("Mmmm... ha habido un error");
      });
  };

  return (
    <div className="container smallest">
      <h2>Nuevo registro</h2>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <InputText
            label="Usuario"
            placeholder="johndoe83"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </FormGroup>
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
        <Button primary type="submit">
          Registrar nueva cuenta
        </Button>
      </form>
    </div>
  );
};

export default Register;
