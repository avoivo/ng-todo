import { browser, by, element, Key } from "protractor";
import { promise } from "selenium-webdriver";

export class AppPage {
  navigateTo() {
    return browser.get("/");
  }

  getParagraphText() {
    return element(by.css("app-root h1")).getText();
  }

  getTodosCount() {
    return this.getTodos().count();
  }

  async addTodo(text: string) {
    let input = element(by.css("input"));
    await input.sendKeys(text);
    await input.sendKeys(Key.ENTER);
  }

  toggleTodo(index: number) {
    let todo = this.getTodos().get(index);
    return todo.click();
  }

  async getTodoText(index: number): Promise<string> {
    let todo = this.getTodos().get(index);
    return todo.getText();
  }

  async isTodoDone(index: number): Promise<boolean> {
    let todo = this.getTodos().get(index);
    let classes = await todo.getAttribute("class");
    return classes.split(" ").indexOf("done") !== -1;
  }

  filterAll = () =>
    this.getFilters()
      .get(0)
      .click();

  filterDone = () =>
    this.getFilters()
      .get(1)
      .click();

  filterUndone = () =>
    this.getFilters()
      .get(2)
      .click();

  private getTodos = () => element.all(by.css("todo-list > ul li"));
  private getFilters = () => element.all(by.css("todo-filter-list > ul li"));
}
