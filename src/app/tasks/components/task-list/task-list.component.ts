import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError, finalize, takeUntil } from 'rxjs';
import { RxjsSubscriber } from '../../../common/abstracts/RxjsSubscriber';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationsService } from './../../../shared/services/notifications.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent extends RxjsSubscriber implements OnInit {
  tasks: Task[];
  loading = false;

  constructor(
    private readonly _taskService: TaskService,
    private readonly _dialog: MatDialog,
    private readonly _notificationService: NotificationsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    this.loading = true;
    this._taskService
      .getTasks()
      .pipe(
        takeUntil(this.destroySubject$),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: Task[]) => {
        this.tasks = res;
      });
  }

  deleteTask(taskId: string) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._taskService
          .deleteTask(taskId)
          .pipe(
            takeUntil(this.destroySubject$),
            catchError((error) => {
              this._notificationService.showError(error);
              return EMPTY;
            })
          )
          .subscribe((res) => {
            this._notificationService.showSuccess(res.message);
            this.loadTask();
          });
      }
    });
  }
}
