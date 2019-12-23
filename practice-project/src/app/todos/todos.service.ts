import { TodoItem } from './todo/todo-item.model';
export class TodoService{
    private todos :TodoItem[] = [
               new TodoItem('Parmeet','Clean room'),
               new TodoItem('Manu','Finish the assignment')
    ];

    getTodos(){
        console.log(this.todos);
        return this.todos;
    }
}