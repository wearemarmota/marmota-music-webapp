import { useState } from "react";
import { withRouter } from "react-router-dom";

import FormGroup from "../atoms/FormGroup";
import InputText from "../atoms/InputText";
import Button from "../atoms/Button";

const APISettings = ({ history }) => {

  const [uri, setUri] = useState(window.localStorage.getItem("api_uri"));

  const onSubmit = e => {
    e.preventDefault();
    window.localStorage.setItem("api_uri", uri);
    history.push("/");
  }

  return(
    <div className="container">
      <h2>Configuración de la API</h2>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <InputText label="URL de tu API:" placeholder="https://..." value={uri} onChange={ e => setUri(e.target.value) } />
        </FormGroup>
        <Button primary>Guardar</Button>
      </form>
    </div>
  );
}

export default withRouter(APISettings);