import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromReducers from "./reducers";
import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromEffects from "./effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("Todos", fromReducers.reducers),
    EffectsModule.forFeature([...fromEffects.effects])
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  providers: [...fromServices.services],
  exports: [...fromContainers.containers]
})
export class TodosModule {}
