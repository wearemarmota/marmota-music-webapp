import React from "react";
import classNames from "classnames";
import "./index.scss";

const Label = props => {

  const {
    className,
    children,
    ...rest
  } = props;

  return(
    <label className={classNames("atom-label", className)} {...rest}>{children}</label>
  );
}

export default Label;