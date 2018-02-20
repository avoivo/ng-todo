import { generateMockTodo, Todo } from "../models";
import { Add, Done, UnDone } from "../actions";
import * as fromTodos from "./todos";

describe("TodosReducer", () => {
  const todo1: Todo = generateMockTodo();
  const todo2: Todo = { ...todo1, id: 2 };
  const todo3: Todo = { ...todo1, id: 3 };
  const initialState: fromTodos.State = {
    ids: [todo1.id, todo2.id],
    entities: {
      [todo1.id]: todo1,
      [todo2.id]: todo2
    }
  };

  describe("undefined action", () => {
    it("should return the initial state", () => {
      const result = fromTodos.reducer(undefined, {} as any);
      expect(result).toBe(fromTodos.initialState);
    });
  });

  describe("ADD", () => {
    it("should add a todo in the state", () => {
      const result = fromTodos.reducer(initialState, new Add(todo3));

      expect(result.entities[todo3.id]).toEqual(todo3);
    });
  });

  describe("DONE", () => {
    it("should mark a todo as done", () => {
      const result = fromTodos.reducer(initialState, new Done(todo2.id));

      expect(result.entities[todo2.id].done).toBeTruthy();
    });
  });

  describe("DONE", () => {
    it("should mark a todo as undone", () => {
      const result = fromTodos.reducer(initialState, new UnDone(todo2.id));

      expect(result.entities[todo2.id].done).toBeFalsy();
    });
  });
});
