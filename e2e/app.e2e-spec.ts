import { AppPage } from "./app.po";

describe("ng-todo App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  async function expectTodoCountToBe(count: number) {
    let todosCount = await page.getTodosCount();
    expect(todosCount).toBe(count);
  }

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Todos");
  });

  it("should initialy contain zero todos", async () => {
    await expectTodoCountToBe(0);
  });

  it("should add a todo as undone", async () => {
    await page.addTodo("todo 1");
    await expectTodoCountToBe(1);
    let isDone = await page.isTodoDone(0);
    expect(isDone).toBeFalsy();
  });

  it("should add a second todo and then mark it as done", async () => {
    await page.addTodo("todo 2");
    await expectTodoCountToBe(2);
    await page.toggleTodo(1);
    let isDone = await page.isTodoDone(1);
    expect(isDone).toBeTruthy();
  });

  it("should filter the todo list by done todos", async () => {
    await page.filterDone();
    await expectTodoCountToBe(1);
    expect(page.getTodoText(0)).toBe("todo 2");
  });

  it("should filter the todo list by undone todos", async () => {
    await page.filterUndone();
    await expectTodoCountToBe(1);
    expect(page.getTodoText(0)).toBe("todo 1");
  });

  it("should filter the todo list by all todos", async () => {
    await page.filterAll();
    await expectTodoCountToBe(2);
    expect(page.getTodoText(0)).toBe("todo 1");
    expect(page.getTodoText(1)).toBe("todo 2");
  });
});
