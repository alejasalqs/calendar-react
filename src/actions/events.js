import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepare-events.helper";
import { types } from "../types/types";

export const startEventAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchWithToken("events", event, "POST");
      const body = await resp.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        console.log(event);
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventDeleted = () => ({
  type: types.eventDelete,
});

export const setActiveEvent = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const deleteActiveEvent = () => ({
  type: types.eventDeleteActive,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("events");
      const body = await resp.json();
      const events = prepareEvents(body.events);

      if (body.ok) {
        dispatch(eventLoaded(events));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const startEventUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.error, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startDeleteEvent = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchWithToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.error, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventLogout = () => ({
  type: types.eventLogOut,
});
