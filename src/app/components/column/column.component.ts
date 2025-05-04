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
  @Input() tasks: Task[] = []; // Change to Task[]
  @Output() taskDropped = new EventEmitter<CdkDragDrop<Task[]>>(); // Change to Task[]
  @Output() taskAdded = new EventEmitter<string>(); // Keep this for the title

  newTaskTitle: string = '';

  // Change method signature to Task[]
  onDrop(event: CdkDragDrop<Task[]>) {
    this.taskDropped.emit(event);
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskAdded.emit(this.newTaskTitle.trim());
      this.newTaskTitle = '';
    }
  }
}
