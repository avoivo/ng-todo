import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { TodoFilterListItemComponent } from "./todo-filter-list-item.component";

describe("TodoFilterListItemComponent", () => {
  let comp: TodoFilterListItemComponent;
  let fixture: ComponentFixture<TodoFilterListItemComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFilterListItemComponent] // declare the test component
    });

    fixture = TestBed.createComponent(TodoFilterListItemComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css("li"));
    el = de.nativeElement;
  });

  it("should be created", () => {
    expect(comp).toBeTruthy();
  });

  describe("when is clickable", () => {
    let dummyDesc;
    beforeEach(() => {
      dummyDesc = "dummy text";

      comp.clickable = true;
      comp.text = dummyDesc;
    });

    it(
      "should have an anchor element with text",
      async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(comp.text).toBe(dummyDesc);
          let childEl = el.querySelector("a");
          expect(childEl).not.toBeNull();
          expect(childEl.innerText).toBe(dummyDesc);
          expect(el.innerText).toBe(dummyDesc);
        });
      })
    );

    it(
      "should emit on click",
      async(() => {
        spyOn(comp.click, "emit");
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(comp.text).toBe(dummyDesc);
          let childEl = el.querySelector("a");
          childEl.click();
          expect(comp.click.emit).toHaveBeenCalled();
        });
      })
    );
  });

  describe("when is not clickable", () => {
    let dummyDesc;
    beforeEach(() => {
      dummyDesc = "dummy text";

      comp.clickable = false;
      comp.text = dummyDesc;
    });

    it(
      "should have a span element with text",
      async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(comp.text).toBe(dummyDesc);
          let childEl = el.querySelector("span");
          expect(childEl).not.toBeNull();
          expect(childEl.innerText).toBe(dummyDesc);
          expect(el.innerText).toBe(dummyDesc);
        });
      })
    );

    it(
      "should not emit on click",
      async(() => {
        spyOn(comp.click, "emit");
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(comp.text).toBe(dummyDesc);
          let childEl = el.querySelector("span");
          childEl.click();
          expect(comp.click.emit).not.toHaveBeenCalled();
        });
      })
    );
  });
});
