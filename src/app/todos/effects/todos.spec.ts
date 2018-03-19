import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { empty } from "rxjs/observable/empty";
import { hot, cold } from "jasmine-marbles";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";

import { TodosEffects } from "./todos";
import * as fromTodosService from "../services/todos.service";
import * as fromActions from "../actions/todos";

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe("TodosEfects", () => {
  let effects: TodosEffects;
  let actions$: TestActions;

  const todo: fromTodosService.TodoWithID = {
    id: 1,
    description: "description 1",
    done: false
  };
  const todos: fromTodosService.TodoWithID[] = [
    todo,
    { ...todo, id: 2 },
    { ...todo, id: 3 }
  ];

  let todosServiceSpy: jasmine.SpyObj<fromTodosService.TodosService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj("TodosService", [
      "getAll",
      "get",
      "add",
      "update"
    ]);

    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        { provide: Actions, useFactory: getActions },
        { provide: fromTodosService.TodosService, useValue: spy }
      ]
    });
    effects = TestBed.get(TodosEffects);
    todosServiceSpy = TestBed.get(fromTodosService.TodosService);
    actions$ = TestBed.get(Actions);
  });

  describe("load$", () => {
    it("should dispatch a LOAD_SUCCESS action", () => {
      const action = new fromActions.Load();
      const completion = new fromActions.LoadSuccess(todos);

      todosServiceSpy.getAll.and.returnValue(Observable.of(todos));

      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });

      expect(effects.load$).toBeObservable(expected);
      expect(todosServiceSpy.getAll).toHaveBeenCalled();
    });

    it("should dispatch a LOAD_FAIL action", () => {
      const err = "Some error";
      const action = new fromActions.Load();
      const completion = new fromActions.LoadFail(err);

      todosServiceSpy.getAll.and.returnValue(Observable.throw(err));

      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });

      expect(effects.load$).toBeObservable(expected);
      expect(todosServiceSpy.getAll).toHaveBeenCalled();
    });
  });

  describe("add$", () => {
    it("should dispatch a ADD_SUCCESS action", () => {
      const action = new fromActions.Add(todo);
      const completion = new fromActions.AddSuccess(todo);
      todosServiceSpy.add.and.returnValue(Observable.of(1));
      todosServiceSpy.get.and.returnValue(Observable.of(todo));

      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });
      expect(effects.add$).toBeObservable(expected);
      expect(todosServiceSpy.add).toHaveBeenCalled();
      expect(todosServiceSpy.get).toHaveBeenCalled();
    });

    it("should dispatch a ADD_FAIL action if todoService.add throws", () => {
      const err = "Some error";
      const action = new fromActions.Add(todo);
      const completion = new fromActions.AddFail(err);
      todosServiceSpy.add.and.returnValue(Observable.throw(err));
      todosServiceSpy.get.and.returnValue(Observable.of(todo));
      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });
      expect(effects.add$).toBeObservable(expected);
      expect(todosServiceSpy.add).toHaveBeenCalled();
    });

    it("should dispatch a ADD_FAIL action if todoService.get throws", () => {
      const err = "Some error";
      const action = new fromActions.Add(todo);
      const completion = new fromActions.AddFail(err);
      todosServiceSpy.add.and.returnValue(Observable.of(1));
      todosServiceSpy.get.and.returnValue(Observable.throw(err));
      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });
      expect(effects.add$).toBeObservable(expected);
      expect(todosServiceSpy.add).toHaveBeenCalled();
      expect(todosServiceSpy.get).toHaveBeenCalled();
    });
  });

  describe("update$", () => {
    it("should dispatch a UPDATE_SUCCESS action", () => {
      const action = new fromActions.Update(todo);
      const completion = new fromActions.UpdateSuccess(todo);
      todosServiceSpy.update.and.returnValue(Observable.of(1));
      todosServiceSpy.get.and.returnValue(Observable.of(todo));

      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });
      expect(effects.update$).toBeObservable(expected);
      expect(todosServiceSpy.update).toHaveBeenCalled();
      expect(todosServiceSpy.get).toHaveBeenCalled();
    });

    it("should dispatch a UPDATE_FAIL action if todoService.update throws", () => {
      const err = "Some error";
      const action = new fromActions.Update(todo);
      const completion = new fromActions.UpdateFail(err);
      todosServiceSpy.update.and.returnValue(Observable.throw(err));
      todosServiceSpy.get.and.returnValue(Observable.of(todo));
      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });
      expect(effects.update$).toBeObservable(expected);
      expect(todosServiceSpy.update).toHaveBeenCalled();
    });

    it("should dispatch a UPDATE_FAIL action if todoService.get throws", () => {
      const err = "Some error";
      const action = new fromActions.Update(todo);
      const completion = new fromActions.UpdateFail(err);
      todosServiceSpy.update.and.returnValue(Observable.of(1));
      todosServiceSpy.get.and.returnValue(Observable.throw(err));
      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });
      expect(effects.update$).toBeObservable(expected);
      expect(todosServiceSpy.update).toHaveBeenCalled();
      expect(todosServiceSpy.get).toHaveBeenCalled();
    });
  });

  describe("toggleDone", () => {
    it("should dispatch a UPDATE action with a toggled done property", () => {
      const action = new fromActions.ToggleDone(todo.id);
      const completion = new fromActions.Update({
        ...todo,
        done: !todo.done
      });

      todosServiceSpy.get.and.returnValue(Observable.of(todo));

      actions$.stream = hot("-a|", { a: action });
      const expected = cold("-b|", { b: completion });
      expect(effects.toggleDone$).toBeObservable(expected);
      expect(todosServiceSpy.get).toHaveBeenCalledWith(todo.id);
    });
  });
});
