import { Task } from "../models/Task.js";

export class TaskService{
    private _taskList: Task[] = [];

    // Add a task to the list 
    addTask(task: Task): void{
        this._taskList.push(task);       
    }

    // List all the tasks added to _taskList
    listTasks(): Task[]{
        return [...this._taskList];
    }

    // Finds tasks by name 
    findByTitle(name: string): Task[] {
        const searchName = name.toLowerCase;
        return this._taskList.filter(task => task.title.toLowerCase() === searchName());
    }

    // Finds task by id
    findById(id: string): Task | undefined{
        return this._taskList.find(task => task.id === id);
    }

    // Removes the targeted task
    removeTask(id: string): boolean{
        const index = this._taskList.findIndex(task => task.id === id);
        
        if(index === -1) return false;

        this._taskList.splice(index, 1);
        return true;
    }

    // Returns the array length
    listLength(): number{
        return this._taskList.length;
    }   
}