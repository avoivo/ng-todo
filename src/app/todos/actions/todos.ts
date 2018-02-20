import { Action } from "@ngrx/store";
import { Todo } from "../models";

export enum TodosActionTypes {
  Add = "[Todos] Add",
  Done = "[Todo] Done",
  UnDone = "[Todo] UnDone"
}

export class Add implements Action {
  readonly type: string = TodosActionTypes.Add;
  constructor(public payload: Todo) {}
}

export class Done implements Action {
  readonly type: string = TodosActionTypes.Done;
  constructor(public payload: number) {}
}

export class UnDone implements Action {
  readonly type: string = TodosActionTypes.UnDone;
  constructor(public payload: number) {}
}

export type TodosActions = Add | Done | UnDone;
