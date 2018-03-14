import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  DebugElement,
  Component,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import { TodoFilterListComponent } from "./todo-filter-list.component";

@Component({
  selector: "todo-filter-list-item",
  template: "<h1>{{text}}</h1>"
})
export class MockTodoFilterListItemComponent {
  @Input() text: string;
  @Input() clickable: boolean;
  @Output() click: EventEmitter<any> = new EventEmitter<any>();
}

describe("TodoFilterListComponent", () => {
  let comp: TodoFilterListComponent;
  let fixture: ComponentFixture<TodoFilterListComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFilterListComponent, MockTodoFilterListItemComponent] // declare the test component
    });

    fixture = TestBed.createComponent(TodoFilterListComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css("ul"));
    el = de.nativeElement;
  });

  it("should be created", () => {
    expect(comp).toBeTruthy();
  });

  it("should emit select(0)", () => {
    spyOn(comp.select, "emit");
    fixture.detectChanges();
    let itemDe = de.queryAll(By.css("todo-filter-list-item"))[0];
    (itemDe.componentInstance as MockTodoFilterListItemComponent).click.emit(
      null
    );
    expect(comp.select.emit).toHaveBeenCalledWith(0);
  });

  it("should emit select(1)", () => {
    spyOn(comp.select, "emit");
    fixture.detectChanges();
    let itemDe = de.queryAll(By.css("todo-filter-list-item"))[1];
    (itemDe.componentInstance as MockTodoFilterListItemComponent).click.emit(
      null
    );
    expect(comp.select.emit).toHaveBeenCalledWith(1);
  });

  it("should emit select(2)", () => {
    spyOn(comp.select, "emit");
    fixture.detectChanges();
    let itemDe = de.queryAll(By.css("todo-filter-list-item"))[2];
    (itemDe.componentInstance as MockTodoFilterListItemComponent).click.emit(
      null
    );
    expect(comp.select.emit).toHaveBeenCalledWith(2);
  });
});
