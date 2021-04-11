import classNames from "classnames";
import "./index.scss";

const Button = props => {

  const {
    primary,
    minWidth,
    children,
    className,
    ...rest
  } = props;

  return(
    <button className={classNames("atom-button", className, {
      "primary": primary,
      "min-width": minWidth,
    })} {...rest}>{children}</button>
  );
}

export default Button;