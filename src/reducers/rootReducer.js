import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";

// aqui se van a unir todos los reducers de la aplicacion

export const rootReducer = combineReducers({
  ui: uiReducer,
});
