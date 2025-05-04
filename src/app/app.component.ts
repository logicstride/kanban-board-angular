import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './task.model'; // Import the Task interface

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Remove the unused title property
  // title = 'angular-drag-drop-example';

  // Use the Task interface for the arrays
  todo: Task[] = [
    { id: 1, title: 'Get to work' },
    { id: 2, title: 'Pick up groceries' },
    { id: 3, title: 'Go home' },
    { id: 4, title: 'Fall asleep' }
  ];

  done: Task[] = [
    { id: 6, title: 'Get up' },
    { id: 7, title: 'Brush teeth' },
    { id: 8, title: 'Take a shower' },
    { id: 9, title: 'Check e-mail' },
    { id: 10, title: 'Walk dog' }
  ];

  inProgress: Task[] = [
    { id: 5, title: 'Start coding Kanban board' }
  ];

  // Helper function to generate unique IDs (simple example)
  private nextId = 11;
  getNextId(): number {
    return this.nextId++;
  }

  // Update the drop method signature to use Task[]
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
    // Optional: Add logic here to save the state after dropping
  }

  addTask(list: Task[], title: string) {
    if (title) {
      const newTask: Task = {
        id: this.getNextId(),
        title: title
      };
      list.push(newTask);
      // Optional: Add logic here to save the state after adding
    }
  }
}
