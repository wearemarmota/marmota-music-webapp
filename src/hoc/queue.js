import React from "react";

import QueueContext from "../QueueContext";

// Use this HOC is a great idea found at:
// https://stackoverflow.com/a/54235540/1378408

const withQueueContext = (Element) => {
  return React.forwardRef((props, ref) => {
    return (
      <QueueContext.Consumer>
        {(context) => <Element queueContext={context} {...props} ref={ref} />}
      </QueueContext.Consumer>
    );
  });
};

export default withQueueContext;
