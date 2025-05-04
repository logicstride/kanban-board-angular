import { Component, Input, Output, EventEmitter } from '@angular/core'; // Import Output, EventEmitter
import { Task } from '../../task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task | undefined;
  @Output() edit = new EventEmitter<number>(); // Emit task ID for edit
  @Output() delete = new EventEmitter<number>(); // Emit task ID for delete

  onEditClick(): void {
    if (this.task) {
      this.edit.emit(this.task.id);
    }
  }

  onDeleteClick(): void {
    if (this.task) {
      this.delete.emit(this.task.id);
    }
  }
}
