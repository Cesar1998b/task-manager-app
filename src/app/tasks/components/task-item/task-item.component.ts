import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { RxjsSubscriber } from '../../../common/abstracts/RxjsSubscriber';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent extends RxjsSubscriber {
  @Input() id: string;
  @Input() title: string;
  @Input() description: string;
  @Input() completed: boolean = false;
  @Output() deleteClicked = new EventEmitter<string>();

  constructor(
    private readonly _router: Router,
    private _taskService: TaskService,
    private readonly _notificationService: NotificationsService
  ) {
    super();
  }

  editTask() {
    const task = { title: this.title, description: this.description };
    this._taskService.setSelectedTask(task);
    this._router.navigate(['/tasks/edit', this.id]);
  }

  deleteTask() {
    this.deleteClicked.emit(this.id);
  }

  updateState() {
    const state = !this.completed;
    this._taskService.updateTask(this.id, { completed: state }).pipe(
      takeUntil(this.destroySubject$),
      catchError((error) => {
        this._notificationService.showError(error);
        return EMPTY;
      })
    )
    .subscribe((res) => {
      this._notificationService.showSuccess(res.message);
    });
  }
}
