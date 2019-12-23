import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
//import { NewCompComponent } from './new-comp/new-comp.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    //NewCompComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
