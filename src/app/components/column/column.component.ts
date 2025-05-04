import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Task} from '../../task.model'

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];
  @Output() taskDropped = new EventEmitter<CdkDragDrop<Task[]>>();
  @Output() taskAdded = new EventEmitter<string>();
  @Output() taskEdited = new EventEmitter<number>(); // Relay edit event
  @Output() taskDeleted = new EventEmitter<number>(); // Relay delete event

  newTaskTitle: string = '';

  onDrop(event: CdkDragDrop<Task[]>) {
    this.taskDropped.emit(event);
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskAdded.emit(this.newTaskTitle.trim());
      this.newTaskTitle = '';
    }
  }

  // Methods to relay events from TaskComponent
  relayEditTask(taskId: number): void {
    this.taskEdited.emit(taskId);
  }

  relayDeleteTask(taskId: number): void {
    this.taskDeleted.emit(taskId);
  }
}
