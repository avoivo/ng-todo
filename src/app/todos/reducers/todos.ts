import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Todo } from "../models";
import { TodosActions, TodosActionTypes } from "../actions";

export interface State extends EntityState<Todo> {}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: TodosActions): State {
  switch (action.type) {
    case TodosActionTypes.Add: {
      return adapter.addOne(action.payload as Todo, state);
    }
    case TodosActionTypes.Done: {
      const id: number = action.payload as number;
      return adapter.updateOne({ id: id, changes: { done: true } }, state);
    }
    case TodosActionTypes.UnDone: {
      const id: number = action.payload as number;
      return adapter.updateOne({ id: id, changes: { done: false } }, state);
    }
    default: {
      return state;
    }
  }
}

export const {
  // select the array of user ids
  selectIds: selectTodoIds,

  // select the dictionary of user entities
  selectEntities: selectTodoEntities,

  // select the array of users
  selectAll: selectAllTodos,

  // select the total user count
  selectTotal: selectTodosTotal
} = adapter.getSelectors();
