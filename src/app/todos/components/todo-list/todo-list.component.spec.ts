import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement, Component, Input } from "@angular/core";

import { TodoListComponent } from "./todo-list.component";
import { Todo } from "../../models";

@Component({
  selector: "todo-list-item",
  template: "<h1>{{todo.description}}</h1>"
})
export class MockTodoListItemComponent {
  @Input() todo: Todo;
}

describe("TodoListComponent", () => {
  let comp: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, MockTodoListItemComponent] // declare the test component
    });
    fixture = TestBed.createComponent(TodoListComponent);
    comp = fixture.componentInstance; // BannerComponent test instance

    de = fixture.debugElement.query(By.css("ul"));
    el = de.nativeElement;
  });

  it("should be created", () => {
    expect(comp).toBeTruthy();
  });

  it(
    "should contain a list of todos",
    async(() => {
      comp.todos = [
        { id: 1, description: "one", done: false },
        { id: 2, description: "two", done: false },
        { id: 3, description: "three", done: false }
      ];
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(el.querySelectorAll("todo-list-item").length).toBe(3);
      });
    })
  );

  it(
    "should emit when a todo is clicked",
    async(() => {
      let todoToEmit: Todo = { id: 2, description: "two", done: false };
      comp.todos = [
        { id: 1, description: "one", done: false },
        { ...todoToEmit },
        { id: 3, description: "three", done: false }
      ];

      spyOn(comp.toggle, "emit");
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let secondItem = de.queryAll(By.css("todo-list-item"))[1];
        secondItem.nativeElement.click();
        expect(comp.toggle.emit).toHaveBeenCalledWith(todoToEmit);
      });
    })
  );
});
