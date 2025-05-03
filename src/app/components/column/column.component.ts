import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  @Input() title: string = '';
  @Input() tasks: string[] = [];
  @Output() itemDropped = new EventEmitter<CdkDragDrop<string[]>>();

  onDrop(event: CdkDragDrop<string[]>) {
    this.itemDropped.emit(event);
  }
}