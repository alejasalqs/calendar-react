import React from "react";
import { useDispatch } from "react-redux";
import { eventDeleted } from "../../actions/events";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const onDeleteEvent = () => {
    dispatch(eventDeleted());
  };
  return (
    <button
      className="btn btn-danger fab-danger"
      type="button"
      onClick={onDeleteEvent}
    >
      <i className="fas fa-trash"></i>
      <span> Delete Event</span>
    </button>
  );
};
