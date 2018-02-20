import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { TodosModule } from "./todos";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TodosModule, StoreModule.forRoot({})],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
