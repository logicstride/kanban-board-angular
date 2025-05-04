import { Component, OnInit } from '@angular/core'; // Import OnInit
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './task.model';
// Removed uuid import

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { // Implement OnInit

  // Keys for localStorage
  private readonly TODO_KEY = 'kanban_angular_todo';
  private readonly INPROGRESS_KEY = 'kanban_angular_inProgress';
  private readonly DONE_KEY = 'kanban_angular_done';

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  // Simple counter for ID generation, start at 1
  private nextId = 1;

  ngOnInit(): void {
    this.loadState();
  }

  private loadState(): void {
    const todoData = localStorage.getItem(this.TODO_KEY);
    const inProgressData = localStorage.getItem(this.INPROGRESS_KEY);
    const doneData = localStorage.getItem(this.DONE_KEY);

    // Use default data generation which now uses getNextId()
    this.todo = todoData ? JSON.parse(todoData) : this.getDefaultTodo();
    this.inProgress = inProgressData ? JSON.parse(inProgressData) : this.getDefaultInProgress();
    this.done = doneData ? JSON.parse(doneData) : this.getDefaultDone();

    // Reset nextId before potentially loading defaults
    this.nextId = 1;

    // Update nextId based on loaded data to avoid collisions
    // Find the maximum ID across all loaded tasks
    const allTasks = [...this.todo, ...this.inProgress, ...this.done];
    const maxId = allTasks.length > 0 ? Math.max(...allTasks.map(t => t.id)) : 0;
    this.nextId = maxId + 1; // Set nextId to be one greater than the max found ID
  }

  private saveState(): void {
    localStorage.setItem(this.TODO_KEY, JSON.stringify(this.todo));
    localStorage.setItem(this.INPROGRESS_KEY, JSON.stringify(this.inProgress));
    localStorage.setItem(this.DONE_KEY, JSON.stringify(this.done));
  }

  // Helper to get next ID
  private getNextId(): number {
    return this.nextId++;
  }

  // Methods to get default data if localStorage is empty
  // These now use the getNextId method
  private getDefaultTodo(): Task[] {
    // Reset nextId before generating defaults
    this.nextId = 1;
    return [
      { id: this.getNextId(), title: 'Get to work' },
      { id: this.getNextId(), title: 'Pick up groceries' },
      { id: this.getNextId(), title: 'Go home' },
      { id: this.getNextId(), title: 'Fall asleep' }
    ];
  }

  private getDefaultInProgress(): Task[] {
    // Assuming this is called after getDefaultTodo if loading defaults
    return [
      { id: this.getNextId(), title: 'Start coding Kanban board' }
    ];
  }

  private getDefaultDone(): Task[] {
    // Assuming this is called after getDefaultInProgress if loading defaults
    return [
      { id: this.getNextId(), title: 'Get up' },
      { id: this.getNextId(), title: 'Brush teeth' },
      { id: this.getNextId(), title: 'Take a shower' },
      { id: this.getNextId(), title: 'Check e-mail' },
      { id: this.getNextId(), title: 'Walk dog' }
    ];
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.saveState(); // Save state after dropping
  }

  addTask(list: Task[], title: string) {
    if (title) {
      const newTask: Task = {
        id: this.getNextId(), // Use simple counter for ID
        title: title
      };
      list.push(newTask);
      this.saveState(); // Save state after adding
    }
  }
}
