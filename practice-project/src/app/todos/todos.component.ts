import { Component, OnInit } from '@angular/core';
import { TodoService } from './todos.service';
import { TodoItem } from './todo/todo-item.model';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  private todoItems: TodoItem[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoItems = this.todoService.getTodos();
    console.log("after service");
    console.log(this.todoItems);
  }

}
