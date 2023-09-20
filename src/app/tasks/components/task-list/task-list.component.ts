import { Component, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { RxjsSubscriber } from '../../../common/abstracts/RxjsSubscriber';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent extends RxjsSubscriber implements OnInit {
  tasks: Task[] = [];
  loading = false;

  constructor(private readonly _taskService: TaskService) {
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
}
