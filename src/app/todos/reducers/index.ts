import { ActionReducerMap } from "@ngrx/store";
import * as fromTodos from "./todos";

export interface State {
  todos: fromTodos.State;
}

export const reducers: ActionReducerMap<State> = {
  todos: fromTodos.reducer
};
