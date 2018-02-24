import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { TodoListItemComponent } from "./todo-list-item.component";
import { Todo } from "../../models";

describe("TodoListItemComponent", () => {
  let comp: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListItemComponent] // declare the test component
    });

    fixture = TestBed.createComponent(TodoListItemComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css("li"));
    el = de.nativeElement;
  });

  it("should be created", () => {
    expect(comp).toBeTruthy();
  });

  it(
    "should have a description",
    async(() => {
      let dummyDesc = "dummy description";
      comp.todo = {
        id: 1,
        description: dummyDesc,
        done: false
      };

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(comp.description).toBe(dummyDesc);
        expect(el.innerText).toBe(dummyDesc);
      });
    })
  );

  it(
    "should be undone",
    async(() => {
      comp.todo = {
        id: 1,
        description: "dummy description",
        done: false
      };

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(comp.done).toBeFalsy();
        expect(el.classList).not.toContain("done");
      });
    })
  );

  it(
    "should be done",
    async(() => {
      comp.todo = {
        id: 1,
        description: "dummy description",
        done: true
      };

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(comp.done).toBeTruthy();
        expect(el.classList).toContain("done");
      });
    })
  );
});
