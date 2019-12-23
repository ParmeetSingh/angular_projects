import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todos/todo/todo.component';
import { Routes, RouterModule} from '@angular/router';
import { TodoService } from './todos/todos.service';

const appRoutes: Routes = [
  {
    path: 'todos',
    component: TodosComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
