import React, { useContext, useEffect, useCallback } from "react";
import { Portal } from "react-portal";
import classNames from "classnames/bind";

import { DropdownContext } from "./";

const DropdownList = props => {
  
  const {
    visible,
    setVisible,
    sizeHandler,
    sizeList,
    positionList,
    positionHandler,
    setSizeList,
    setPositionList,
    listRef,
    handlerRef,
  } = useContext(DropdownContext);

  const setPosition = () => {

    const spaceWithDropdown = props.gap || 5;
    const offsetBottom = (props.offset && props.offset.bottom) || 0;

    // Viewport size and scroll:
    const {
      innerWidth: windowWidth,
      innerHeight: windowHeight,
      scrollX,
      scrollY,
    } = window;

    const handlerTop = positionHandler[0];
    const handlerLeft = positionHandler[1];
    
    const handlerWidth = sizeHandler[0];
    const handlerHeight = sizeHandler[1];
    
    const dropdownWidth = sizeList[0]
    const dropdownHeight = sizeList[1]

    const enoughXspace = windowWidth + scrollX > (handlerLeft + dropdownWidth);
    const enoughYspace = windowHeight + scrollY > (handlerTop + handlerHeight + spaceWithDropdown + dropdownHeight + offsetBottom);

    const newPosition = [
      enoughYspace ? (handlerTop + handlerHeight + spaceWithDropdown) : (handlerTop - spaceWithDropdown - dropdownHeight),
      enoughXspace ? (handlerLeft) : (handlerLeft + handlerWidth - dropdownWidth),
    ];

    setPositionList(newPosition);
  }

  // Set size list:
  useEffect(() => {
    const height = listRef.current.offsetHeight;
    const width = listRef.current.offsetWidth;
    setSizeList([width, height]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRef]);

  useEffect(() => {
    setPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionHandler, sizeHandler, sizeList]);

  const handleClickOutside = useCallback(event => {
    // If is hidden:
    if(!visible){
      return;
    }
    // If is the handler:
    if (handlerRef.current.contains(event.target)) {
      return;
    }
    // If is the dropdown:
    if (listRef.current.contains(event.target)) {
      return;
    }
    // Else if:
    setVisible(false);
  }, [visible, handlerRef, listRef, setVisible]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [handleClickOutside]);

  let cssPosition = {};

  if(!isNaN(positionList[0])){
    cssPosition = { top: positionList[0], left: positionList[1] };
  }

  return(
    <Portal>
      <ul
        ref={listRef}
        className={classNames("dropdown-list", { visible: visible, fixed: props.fixed })}
        style={cssPosition}
      >
        {props.children}
      </ul>
    </Portal>
  );
}

export default DropdownList;