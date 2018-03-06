import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";

import Dexie from "dexie";

import { DexieService } from "./dexie.service";

export interface Todo {
  description: string;
  done: boolean;
}

export interface TodoWithID extends Todo {
  id: number;
}

@Injectable()
export class TodosService {
  table: Dexie.Table<TodoWithID, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table("todos");
  }

  getAll() {
    return Observable.fromPromise(this.table.toArray());
  }

  get(id) {
    return Observable.fromPromise(this.table.get(id));
  }

  add(data) {
    return Observable.fromPromise(this.table.add(data));
  }

  update(id, data) {
    return Observable.fromPromise(this.table.update(id, data));
  }

  remove(id) {
    return Observable.fromPromise(this.table.delete(id));
  }
}
