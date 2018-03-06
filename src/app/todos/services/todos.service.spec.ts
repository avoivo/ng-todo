import { TestBed } from "@angular/core/testing";

import { TodosService, TodoWithID, Todo } from "./todos.service";
import { DexieService } from "./dexie.service";
import { Dexie } from "dexie";

describe("TodosService", () => {
  let todosService: TodosService;
  let dexieServiceSpy: jasmine.SpyObj<DexieService>;
  let tableSpy: Dexie.Table<TodoWithID, number>;

  beforeEach(() => {
    tableSpy = jasmine.createSpyObj("table", [
      "toArray",
      "get",
      "add",
      "update",
      "delete"
    ]);
    const spy = jasmine.createSpyObj("DexieService", { table: tableSpy });

    TestBed.configureTestingModule({
      providers: [TodosService, { provide: DexieService, useValue: spy }]
    });

    todosService = TestBed.get(TodosService);
    dexieServiceSpy = TestBed.get(DexieService);
  });

  it("should create a table named 'todos' upon intatiation", () => {
    expect(dexieServiceSpy.table).toHaveBeenCalledWith("todos");
  });

  describe("#getAll", () => {
    it("should call table.toArray", () => {
      todosService.getAll();
      expect(tableSpy.toArray).toHaveBeenCalled();
    });
  });

  describe("#get", () => {
    it("should call table.get", () => {
      const id: number = 1;
      todosService.get(id);
      expect(tableSpy.get).toHaveBeenCalledWith(id);
    });
  });

  describe("#add", () => {
    it("should call table.add", () => {
      const todo: Todo = { description: "something", done: false };
      todosService.add(todo);
      expect(tableSpy.add).toHaveBeenCalledWith(todo);
    });

    describe("#update", () => {
      it("should call table.update", () => {
        const todo: TodoWithID = {
          id: 1,
          description: "something",
          done: false
        };
        todosService.update(todo.id, todo);
        expect(tableSpy.update).toHaveBeenCalledWith(todo.id, todo);
      });
    });

    describe("#remove", () => {
      it("should call table.delete", () => {
        const id: number = 1;
        todosService.remove(id);
        expect(tableSpy.delete).toHaveBeenCalledWith(id);
      });
    });
  });
});
