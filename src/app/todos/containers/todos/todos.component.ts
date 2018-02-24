import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Todo } from "../../models";

import * as fromTodos from "../../reducers";
import * as fromTodosActions from "../../actions";

@Component({
  selector: "todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;
  private idCounter: number;

  constructor(private store: Store<fromTodos.State>) {
    this.todos$ = store.select(fromTodos.selectAllTodos);
    this.idCounter = 0;
  }

  add(description: string) {
    this.store.dispatch(
      new fromTodosActions.Add({
        id: ++this.idCounter,
        description: description,
        done: false
      })
    );
  }

  toggle(todo: Todo) {
    if (todo.done) {
      this.store.dispatch(new fromTodosActions.UnDone(todo.id));
    } else {
      this.store.dispatch(new fromTodosActions.Done(todo.id));
    }
  }

  ngOnInit() {}
}
