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
  UpdateFail = "[Todos] Update Fail",
  FilterAll = "[Todos] Filter All",
  FilterDone = "[Todos] Filter Done",
  FilterUndone = "[Todos] Filter Undone",
  ToggleDone = "[Todos] Toggle Done"
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

export class FilterAll implements Action {
  readonly type: string = TodosActionTypes.FilterAll;
  constructor(public payload?: any) {}
}

export class FilterDone implements Action {
  readonly type: string = TodosActionTypes.FilterDone;
  constructor(public payload?: any) {}
}

export class FilterUndone implements Action {
  readonly type: string = TodosActionTypes.FilterUndone;
  constructor(public payload?: any) {}
}

export class ToggleDone implements Action {
  readonly type: string = TodosActionTypes.ToggleDone;
  constructor(public payload: number) {}
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
  | UpdateFail
  | FilterAll
  | FilterDone
  | FilterUndone
  | ToggleDone;
