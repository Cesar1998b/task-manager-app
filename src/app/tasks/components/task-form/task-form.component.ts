import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxjsSubscriber } from '../../../common/abstracts/RxjsSubscriber';
import { EMPTY, catchError, filter, map, switchMap, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { NotificationsService } from './../../../shared/services/notifications.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent extends RxjsSubscriber implements OnInit {
  id: string;
  taskForm: FormGroup;
  titleForm: string;
  textButton: string;
  isEdit = false;

  constructor(
    private _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private _taskService: TaskService,
    private readonly _notificationService: NotificationsService
  ) {
    super();

    this.taskForm = this._fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(240)]],
    });
  }

  ngOnInit(): void {
    this.titleForm = 'Create Task';
    this.textButton = 'Create';

    this._route.params
      .pipe(
        map((params) => params['id']),
        filter((id) => !!id),
        switchMap((id) => {
          this.id = id;
          return this._taskService.selectedTask$;
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe((task) => {
        this.taskForm.patchValue({
          title: task?.title,
          description: task?.description,
        });
        this.titleForm = 'Update Task';
        this.textButton = 'Update';
        this.isEdit = true;
      });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const data = this.taskForm.value;
      const service = !this.isEdit
        ? this._taskService.createTask(data)
        : this._taskService.updateTask(this.id, data);
      service
        .pipe(
          takeUntil(this.destroySubject$),
          catchError((error) => {
            this._notificationService.showError(error);
            return EMPTY;
          })
        )
        .subscribe((res) => {
          this._notificationService.showSuccess(res.message);
          this._router.navigate(['/tasks']);
        });
    }
  }
}
