import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

// aqui se van a unir todos los reducers de la aplicacion

export const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer,
});
