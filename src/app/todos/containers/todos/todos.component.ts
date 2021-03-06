import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/let";
import { map } from "rxjs/operators";
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
  filter$: Observable<number>;

  constructor(private store: Store<fromTodos.State>) {
    this.filter$ = store.select(fromTodos.selectFilter);

    this.todos$ = Observable.combineLatest(
      store.select(fromTodos.selectAllTodos),
      this.filter$
    ).let(fromTodos.filteredTodosSelector);
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
    this.store.dispatch(new fromTodosActions.ToggleDone(todo.id));
  }

  ngOnInit() {
    this.store.dispatch(new fromTodosActions.Load());
  }

  filter(filter: fromTodos.FilterBy) {
    switch (filter) {
      case fromTodos.FilterBy.All:
        return this.store.dispatch(new fromTodosActions.FilterAll());
      case fromTodos.FilterBy.Done:
        return this.store.dispatch(new fromTodosActions.FilterDone());
      case fromTodos.FilterBy.Undone:
        return this.store.dispatch(new fromTodosActions.FilterUndone());
    }
  }
}
