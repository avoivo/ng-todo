import { generateMockTodo, Todo } from "../models";
import {
  Load,
  LoadSuccess,
  LoadFail,
  Add,
  AddSuccess,
  AddFail,
  Update,
  UpdateSuccess,
  UpdateFail
} from "../actions";
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
    },
    error: null,
    busy: false
  };

  describe("undefined action", () => {
    it("should return the initial state", () => {
      const result = fromTodos.reducer(undefined, {} as any);
      expect(result).toBe(fromTodos.initialState);
    });
  });

  describe("LOAD", () => {
    let result;

    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: false, error: "something" },
        new Load()
      );
    });

    it("should set busy to true", () => {
      expect(result).toEqual({ ...initialState, busy: true });
    });

    it("should set error to null", () => {
      expect(result.error).toBeNull();
    });
  });

  describe("LOAD_SUCCESS", () => {
    let result;
    const todo: Todo = generateMockTodo();

    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: true, error: "error" },
        new LoadSuccess([todo])
      );
    });

    it("should return a new state", () => {
      expect(result.ids.length).toBe(1);
      expect(result.entities[todo.id]).toEqual(todo);
    });

    it("should set busy to false ", () => {
      expect(result.busy).toBeFalsy();
    });

    it("should set error to null ", () => {
      expect(result.error).toBeNull();
    });
  });

  describe("LOAD_FAIL", () => {
    let result;
    const error = "something went wrong";

    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: true },
        new LoadFail(error)
      );
    });

    it("should return an error", () => {
      expect(result.error).toBe(error);
    });
    it("should set busy to false", () => {
      expect(result.busy).toBeFalsy();
    });
  });

  describe("ADD", () => {
    let result;

    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: false, error: "something" },
        new Add(todo3)
      );
    });

    it("should set busy to true", () => {
      expect(result).toEqual({ ...initialState, busy: true });
    });

    it("should set error to null", () => {
      expect(result.error).toBeNull();
    });
  });

  describe("ADD_SUCCESS", () => {
    let result;

    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: true, error: "error" },
        new AddSuccess(todo3)
      );
    });

    it("should return a new state", () => {
      expect(result.ids.length).toBe(3);
      expect(result.entities[todo3.id]).toEqual(todo3);
    });

    it("should set busy to false ", () => {
      expect(result.busy).toBeFalsy();
    });

    it("should set error to null ", () => {
      expect(result.error).toBeNull();
    });
  });

  describe("ADD_FAIL", () => {
    let result;
    const error = "something went wrong";

    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: true },
        new AddFail(error)
      );
    });

    it("should return an error", () => {
      expect(result.error).toBe(error);
    });
    it("should set busy to false", () => {
      expect(result.busy).toBeFalsy();
    });
  });

  describe("UPDATE", () => {
    let result;
    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: false, error: "something" },
        new Update(todo1)
      );
    });
    it("should set busy to true", () => {
      expect(result).toEqual({ ...initialState, busy: true });
    });
    it("should set error to null", () => {
      expect(result.error).toBeNull();
    });
  });

  describe("UPDATE_SUCCESS", () => {
    let result;

    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: true, error: "error" },
        new UpdateSuccess({ ...todo1, done: true })
      );
    });

    it("should return a new state", () => {
      expect(result.entities[todo1.id].done).toBeTruthy();
    });

    it("should set busy to false ", () => {
      expect(result.busy).toBeFalsy();
    });

    it("should set error to null ", () => {
      expect(result.error).toBeNull();
    });
  });

  describe("UPDATE_FAIL", () => {
    let result;
    const error = "something went wrong";

    beforeEach(() => {
      result = fromTodos.reducer(
        { ...initialState, busy: true },
        new UpdateFail(error)
      );
    });

    it("should return an error", () => {
      expect(result.error).toBe(error);
    });
    it("should set busy to false", () => {
      expect(result.busy).toBeFalsy();
    });
  });
});
