import { createStore } from "react-hooks-global-state";
import { Action, State } from "../../types/state";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setStories":
      return {
        ...state,
        stories: action.payload,
      };
    case "setAllComponents":
      return {
        ...state,
        components: action.payload,
      };
    case "addComponent":
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    default:
      return state;
  }
};

const initialState: State = { components: [], stories: [] };

const { dispatch, useStoreState } = createStore(reducer, initialState);

export { dispatch, useStoreState };
