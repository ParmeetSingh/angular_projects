import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from './todo-item.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() public todoItem:TodoItem;

  constructor() { }

  ngOnInit() {
  }

}
