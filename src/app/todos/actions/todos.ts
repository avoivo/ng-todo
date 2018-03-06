import { Action } from "@ngrx/store";
import { Todo } from "../models";

export enum TodosActionTypes {
  Load = "[Todos] Load",
  LoadSuccess = "[Todos] Load Success",
  LoadFail = "[Todos] Load Fail",
  Add = "[Todos] Add",
  AddSuccess = "[Todos] Add Success",
  AddFail = "[Todos] Add Fail",
  Update = "[Todos] Update",
  UpdateSuccess = "[Todos] Update Success",
  UpdateFail = "[Todos] Update Fail"
}

export class Load implements Action {
  readonly type: string = TodosActionTypes.Load;
  constructor(public payload?: any) {}
}

export class LoadSuccess implements Action {
  readonly type: string = TodosActionTypes.LoadSuccess;
  constructor(public payload: Todo[]) {}
}

export class LoadFail implements Action {
  readonly type: string = TodosActionTypes.LoadFail;
  constructor(public payload: any) {}
}

export class Add implements Action {
  readonly type: string = TodosActionTypes.Add;
  constructor(public payload: Todo) {}
}

export class AddSuccess implements Action {
  readonly type: string = TodosActionTypes.AddSuccess;
  constructor(public payload: Todo) {}
}

export class AddFail implements Action {
  readonly type: string = TodosActionTypes.AddFail;
  constructor(public payload: any) {}
}

export class Update implements Action {
  readonly type: string = TodosActionTypes.Update;
  constructor(public payload: Todo) {}
}

export class UpdateSuccess implements Action {
  readonly type: string = TodosActionTypes.UpdateSuccess;
  constructor(public payload: Todo) {}
}

export class UpdateFail implements Action {
  readonly type: string = TodosActionTypes.UpdateFail;
  constructor(public payload: any) {}
}

export type TodosActions =
  | Load
  | LoadSuccess
  | LoadFail
  | Add
  | AddSuccess
  | AddFail
  | Update
  | UpdateSuccess
  | UpdateFail;
