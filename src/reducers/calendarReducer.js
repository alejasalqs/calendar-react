import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "Este es el titulo que se muestra",
      start: moment().toDate(), // Get date pero con moment
      end: moment().add(2, "hour").toDate(), // Agregar 2 horas a la actual
      bgcolog: "#fafafa",
      user: {
        uid: "123",
        name: "Alejandro",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventDeleteActive:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map(
          (
            event // Si el id del evento y el payload son iguales devuelvo el payload si no el evento
          ) => (event.id === action.payload.id ? action.payload : event)
        ),
      };

    case types.eventDelete:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };

    default:
      return state;
  }
};
