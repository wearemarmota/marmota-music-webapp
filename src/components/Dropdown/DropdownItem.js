import React, { useContext } from "react";

import classNames from "classnames/bind";

import { DropdownContext } from "./";

const DropdownItem = props => {
  const { setVisible } = useContext(DropdownContext);
  const { hideOnClick, disabled, children } = props;

  const onClick = e => {
    if(hideOnClick){
      setVisible(false);
    }
  };

  const className = classNames({
    disabled: disabled
  });

  return(
    <li onClick={onClick} className={className}>
      {children}
    </li>
  );
}

export default DropdownItem;