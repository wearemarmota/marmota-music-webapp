import React, { useState } from "react";
import classNames from "classnames";
import uniqueId from "lodash/uniqueId";

import Label from "../Label";

import "./index.scss";

const InputText = props => {

  const {
    className,
    label,
    name,
    id: idProps,
    ...rest
  } = props;

  const [ id ] = useState(() => uniqueId('input-text_'));

  return(
    <>
      { label && <Label htmlFor={idProps || id}>{label}</Label>}
      <input id={idProps || id} name={name} className={classNames("atom-input", className)} {...rest} />
    </>
  );
}

InputText.defaultProps = {
  type: "text",
}

export default InputText;