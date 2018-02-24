import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import * as fromReducers from "./reducers";
import * as fromContainers from "./containers";
import * as fromComponents from "./components";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("Todos", fromReducers.reducers)
  ],
  declarations: [...fromContainers.containers, fromComponents.components],
  exports: [...fromContainers.containers]
})
export class TodosModule {}
