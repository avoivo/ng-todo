import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Todo } from "../models";
import {
  TodosActions,
  TodosActionTypes,
  LoadFail,
  LoadSuccess
} from "../actions";

export enum FilterBy {
  All,
  Done,
  Undone
}

export interface State extends EntityState<Todo> {
  error: string;
  busy: boolean;
  filter: FilterBy;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id
});

export const initialState: State = adapter.getInitialState({
  error: null,
  busy: false,
  filter: FilterBy.All
});

export function reducer(state = initialState, action: TodosActions): State {
  switch (action.type) {
    case TodosActionTypes.Load:
    case TodosActionTypes.Add:
    case TodosActionTypes.Update: {
      return { ...state, error: null, busy: true };
    }
    case TodosActionTypes.LoadSuccess: {
      return adapter.addMany(action.payload as Todo[], {
        ...adapter.removeAll(state),
        busy: false,
        error: null
      });
    }
    case TodosActionTypes.AddSuccess: {
      return adapter.addOne(action.payload as Todo, {
        ...state,
        busy: false,
        error: null
      });
    }
    case TodosActionTypes.UpdateSuccess: {
      const todo: Todo = action.payload as Todo;
      return adapter.updateOne(
        { id: todo.id, changes: { ...todo } },
        { ...state, busy: false, error: null }
      );
    }
    case TodosActionTypes.LoadFail:
    case TodosActionTypes.AddFail:
    case TodosActionTypes.UpdateFail: {
      return { ...state, error: action.payload, busy: false };
    }

    case TodosActionTypes.FilterAll:
      return {
        ...state,
        filter: FilterBy.All
      };
    case TodosActionTypes.FilterDone:
      return {
        ...state,
        filter: FilterBy.Done
      };

    case TodosActionTypes.FilterUndone:
      return {
        ...state,
        filter: FilterBy.Undone
      };
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

export const getTodosError = (state: State) => state.error;
export const getTodosBusy = (state: State) => state.busy;

export const getFilter = (state: State) => state.filter;
