import { Component } from '@angular/core';

class TodoItem {
  isDone: boolean;
  name: string;
}

@Component({
  selector: 'todo-list',
  template: `<input type='text' name='todo' [(ngModel)]="itemToAdd">
            <button (click)="add(itemToAdd)">Add</button>
            <ul>
                <li *ngFor="let item of items" (click)="toggleItem(item)" [ngClass]="{isdone: item.isDone==true}">{{item.name}}</li>
            </ul><br>
            {{remainingItems}} remaining out of {{this.items.length}}`,
  styles: [`
    .isdone {
      text-decoration: line-through;
    }
  `]
})
export class TodoItemComponent {
  public name: string = '';
  public items: Array<TodoItem> = [];
  public remainingItems: number=0;

  public getRemainingCount() {
    return this.items.filter(item => !item.isDone).length;
  }

  public add(itemToAdd: string) {
    let itemElem = new TodoItem();
    itemElem.isDone = false;
    itemElem.name = itemToAdd;
    if(itemToAdd !==''){
        this.items.push(itemElem);
    }else{
        console.log("Item list is empty");
    }
    this.remainingItems = this.getRemainingCount();
  }
    

  public toggleItem(item: TodoItem) {
    console.log("Toggle item clicked");
    item.isDone = !item.isDone;
    this.remainingItems = this.getRemainingCount();
  }
  

}