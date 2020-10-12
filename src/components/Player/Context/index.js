import React from "react";
import Button from "../Button";

import {
  IconQueue,
} from "../icons";

import "./index.scss";

export default function Context(props) {

  const { isQueueVisible, setQueueVisibility } = props;

  return (
    <div id="context">
      <Button className="queue" onClick={() => { setQueueVisibility(!isQueueVisible); }}>
        <IconQueue />
      </Button>
    </div>
  );
}