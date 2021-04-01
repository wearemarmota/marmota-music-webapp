import React, { useContext, useEffect, useCallback, useMemo } from "react";
import throttle from "lodash/throttle";

import { DropdownContext } from "./";

const DropdownHandler = props => {
  const {
    visible,
    setVisible,
    setSizeHandler,
    setPositionHandler,
    handlerRef,
  } = useContext(DropdownContext);

  const updateSize = useCallback(event => {
    const height = handlerRef.current.offsetHeight;
    const width = handlerRef.current.offsetWidth;
    setSizeHandler([width, height]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerRef]);

  const updatePosition = useCallback(event => {
    if(!visible) return;
    const { top, left } = getOffset(handlerRef.current);
    setPositionHandler([top, left]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, handlerRef]);
  
  const throttledUpdatePosition = useMemo(() => throttle(updatePosition, 200), [updatePosition]);

  useEffect(() => {
    updateSize();
    updatePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerRef, visible]);

  useEffect(() => {
    window.addEventListener('resize', throttledUpdatePosition);
    window.addEventListener('scroll', throttledUpdatePosition);
    return () => {
      window.removeEventListener('resize', throttledUpdatePosition);
      window.removeEventListener('scroll', throttledUpdatePosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onClick = e => {
    e.stopPropagation();
    setVisible(!visible);
  }

  return(
    <div className="dropdown-handler" ref={handlerRef} onClick={onClick}>{props.children}</div>
  );
}

const getOffset = element => {
  const rect = element.getBoundingClientRect();

  const isFixedPosition = node => {
    while (node && node.nodeName.toLowerCase() !== 'body') {
      if (window.getComputedStyle(node).getPropertyValue('position').toLowerCase() === 'fixed'){
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  const isFixed = isFixedPosition(element);
  
  return {
    left: rect.left + (isFixed ? 0 : window.scrollX),
    top: rect.top + (isFixed ? 0 : window.scrollY),
  };
}

export default DropdownHandler;