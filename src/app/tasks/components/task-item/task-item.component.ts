import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() id: string;
  @Input() title: string;
  @Input() completed: boolean = false;
  @Output() deleteClicked = new EventEmitter<string>();

  constructor() { }

  deleteTask(){
    this.deleteClicked.emit(this.id);
  }
}
