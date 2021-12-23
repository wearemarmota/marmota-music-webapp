import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueueVisible } from "../../../redux/actions/queue";

import Button from "../Button";

import { IconQueue } from "../icons";

import "./index.scss";

const Context = () => {
  const { visible } = useSelector((state) => state.queue);
  const dispatch = useDispatch();

  const toggleQueueVisibility = useCallback(() => {
    dispatch(setQueueVisible(!visible));
  }, [visible, dispatch]);

  return (
    <div id="context">
      <Button
        className="queue"
        onClick={toggleQueueVisibility}
        aria-label={`${visible ? "Hide" : "Show"} queue`}
      >
        <IconQueue />
      </Button>
    </div>
  );
};

export default Context;
