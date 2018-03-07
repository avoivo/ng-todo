import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Todo } from "../../models";

import * as fromTodos from "../../reducers";
import * as fromTodosActions from "../../actions";

@Component({
  selector: "todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"]
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<fromTodos.State>) {
    this.todos$ = store.select(fromTodos.selectAllTodos);
  }

  add(description: string) {
    this.store.dispatch(
      new fromTodosActions.Add({
        description: description,
        done: false
      })
    );
  }

  toggle(todo: Todo) {
    this.store.dispatch(
      new fromTodosActions.Update({ ...todo, done: !todo.done })
    );
  }

  ngOnInit() {
    this.store.dispatch(new fromTodosActions.Load());
  }
}
