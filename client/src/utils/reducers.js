import { useReducer } from "react";
import {
  UPDATE_TIME,
  UPDATE_GROOMER,
  UPDATE_DAY,
  UPDATE_SIZE,
  UPDATE_SERVICES,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TIME:
      return {
        ...state,
        time: action.time,
      };

    case UPDATE_SIZE:
      return {
        ...state,
        size: action.size,
      };

    case UPDATE_SERVICES:
      return {
        ...state,
        services: action.services,
      };
    case UPDATE_GROOMER:
      return {
        ...state,
        groomer: action.groomer,
      };
    case UPDATE_DAY:
      return {
        ...state,
        day: action.day,
      };
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
