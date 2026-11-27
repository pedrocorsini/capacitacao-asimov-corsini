import type { Priority } from "../models/Priority.js";
import { Status } from "../models/Status.js";
import { Task } from "../models/Task.js";
export class TaskService {
  private _taskList: Task[] = [];

  // Add a task to the list
  addTask(task: Task): void {
    this._taskList.push(task);
  }

  // List all the tasks added to _taskList
  listTasks(): Task[] {
    return [...this._taskList];
  }

  // Finds tasks by title
  findByTitle(name: string): Task[] {
    const searchName = name.toLowerCase;
    return this._taskList.filter(
      (task) => task.title.toLowerCase() === searchName(),
    );
  }

  // Finds task by id
  findById(id: string): Task | undefined {
    return this._taskList.find((task) => task.id === id);
  }

  // Removes the targeted task
  removeTask(id: string): boolean {
    const index = this._taskList.findIndex((task) => task.id === id);

    if (index === -1) return false;

    this._taskList.splice(index, 1);
    return true;
  }

  // Returns the array length
  listLength(): number {
    return this._taskList.length;
  }

  // Complete Task
  completeTask(id: string): boolean {
    const task = this.findById(id);
    if (task === undefined) return false;
    if (task.status !== Status.COMPLETED) {
      task.status = Status.COMPLETED;
      task.markAsEdited();
    }
    return true;
  }

  // Edit task
  editTask(
    id: string,
    newTitle?: string,
    newDescription?: string,
    newStatus?: Status,
    newPriority?: Priority,
  ): boolean {
    const task = this.findById(id);
    if (task === undefined) return false;

    let changed = false;

    if (newTitle !== undefined && task.title !== newTitle) {
      task.title = newTitle;
      changed = true;
    }
    if (newDescription !== undefined && task.description !== newDescription) {
      task.description = newDescription;
      changed = true;
    }
    if (newStatus !== undefined && task.status !== newStatus) {
      task.status = newStatus;
      changed = true;
    }
    if (newPriority !== undefined && task.priority !== newPriority) {
      task.priority = newPriority;
      changed = true;
    }

    if (changed) task.markAsEdited();

    return true;
  }

  // Filter by priority
  filterByPriority(priority: Priority): Task[] {
    return this._taskList.filter((task) => task.priority === priority);
  }
}
