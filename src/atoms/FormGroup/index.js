import classNames from "classnames";

import "./index.scss";

const FormGroup = props => {

  const {
    className,
    children,
    ...rest
  } = props;

  return(
    <>
      <div className={classNames("atom-form-group", className)} {...rest}>{children}</div>
    </>
  );
}

export default FormGroup;