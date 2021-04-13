import React, { useState, createContext, useRef } from "react";

import DropdownHandler from "./DropdownHandler";
import DropdownList from "./DropdownList";
import DropdownItem from "./DropdownItem";
import DropdownDivider from "./DropdownDivider";

import "./index.scss";

const DropdownContext = createContext();

const Dropdown = props => {

  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible(!visible);

  const [sizeHandler, setSizeHandler] = useState([]);
  const [positionHandler, setPositionHandler] = useState([]);

  const [sizeList, setSizeList] = useState([]);
  const [positionList, setPositionList] = useState([]);

  const handlerRef = useRef(null);
  const listRef = useRef(null);
  
  return(
    <DropdownContext.Provider value={{
      visible,
      toggleVisible,
      setVisible,
      sizeHandler,
      setSizeHandler,
      positionHandler,
      setPositionHandler,
      sizeList,
      setSizeList,
      positionList,
      setPositionList,
      handlerRef,
      listRef,
    }}>
      {props.children}
    </DropdownContext.Provider>
  );
}

Dropdown.Handler = DropdownHandler;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
export { DropdownContext };