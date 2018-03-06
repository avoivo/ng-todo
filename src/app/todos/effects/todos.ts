import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { mergeMap, map, catchError } from "rxjs/operators";

import { of } from "rxjs/observable/of";

import * as fromActions from "../actions";
import { TodosService } from "../services/todos.service";
import { switchMap } from "rxjs/operators/switchMap";

@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.TodosActionTypes.Load),
    mergeMap(action => {
      return this.todosService.getAll().pipe(
        // If successful, dispatch success action with result
        map(data => new fromActions.LoadSuccess(data)),
        // If request fails, dispatch failed action
        catchError(err => of(new fromActions.LoadFail(err)))
      );
    })
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.TodosActionTypes.Add),
    mergeMap((action: fromActions.Add) =>
      this.todosService.add(action.payload).pipe(
        switchMap(id => this.todosService.get(id)),
        map(todo => new fromActions.AddSuccess(todo)),
        // If request fails, dispatch failed action
        catchError(err => of(new fromActions.AddFail(err)))
      )
    )
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.TodosActionTypes.Update),
    mergeMap((action: fromActions.Update) =>
      this.todosService.update(action.payload.id, action.payload).pipe(
        switchMap(recordsUpdated => this.todosService.get(action.payload.id)),
        map(todo => new fromActions.UpdateSuccess(todo)),
        // If request fails, dispatch failed action
        catchError(err => of(new fromActions.UpdateFail(err)))
      )
    )
  );
}
