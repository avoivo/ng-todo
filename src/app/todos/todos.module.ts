import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import * as fromReducers from "./reducers";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("Todos", fromReducers.reducers)
  ],
  declarations: []
})
export class TodosModule {}
