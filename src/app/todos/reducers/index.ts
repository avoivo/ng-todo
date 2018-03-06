import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import * as fromTodos from "./todos";

export interface State {
  todos: fromTodos.State;
}

export const reducers: ActionReducerMap<State> = {
  todos: fromTodos.reducer
};

export const getTodosState = createFeatureSelector<State>("Todos");

export const getTodosEntitiesState = createSelector(
  getTodosState,
  state => state.todos
);

export const selectTodoIds = createSelector(
  getTodosEntitiesState,
  fromTodos.selectTodoIds
);
export const selectTodoEntities = createSelector(
  getTodosEntitiesState,
  fromTodos.selectTodoEntities
);
export const selectAllTodos = createSelector(
  getTodosEntitiesState,
  fromTodos.selectAllTodos
);
export const selectTodosTotal = createSelector(
  getTodosEntitiesState,
  fromTodos.selectTodosTotal
);

export const selectTodosError = createSelector(
  getTodosEntitiesState,
  fromTodos.getTodosError
);

export const selectTodosBusy = createSelector(
  getTodosEntitiesState,
  fromTodos.getTodosBusy
);
