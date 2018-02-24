import { ComponentFixture, TestBed } from "@angular/core/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { By } from "@angular/platform-browser";
import { DebugElement, Component, Input } from "@angular/core";
import * as fromTodos from "../../reducers";
import * as fromTodosActions from "../../actions";

import { TodosComponent } from "./todos.component";
import { Todo } from "../../models";

@Component({
  selector: "todo-list",
  template: "<h1>{{todos}}</h1>"
})
export class MockTodoListComponent {
  @Input() todos: Todo[];
}

describe("TodosComponent", () => {
  let comp: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let store: Store<fromTodos.State>;
  let dispatchSpy: jasmine.Spy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent, MockTodoListComponent], // declare the test component
      imports: [
        StoreModule.forRoot({
          Todos: combineReducers(fromTodos.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, "dispatch").and.callThrough();

    fixture = TestBed.createComponent(TodosComponent);
    comp = fixture.componentInstance; // BannerComponent test instance
    de = fixture.debugElement.query(By.css("div"));
    el = de.nativeElement;
  });

  it("should be created", () => {
    expect(comp).toBeTruthy();
  });

  it("should dispatch a todos.Add action on add", () => {
    const action = new fromTodosActions.Add({
      id: 1,
      description: "description",
      done: false
    });

    comp.add("description");
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it("should dispatch a todos.Done action on toggle", () => {
    const action = new fromTodosActions.Done(2);

    comp.add("description 1");
    comp.add("description 2");
    comp.add("description 3");

    let todos: Todo[];
    comp.todos$.subscribe(t => {
      todos = t;
    });

    dispatchSpy.calls.reset();
    comp.toggle(todos[1]);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});