import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { RxjsSubscriber } from '../../../common/abstracts/RxjsSubscriber';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent extends RxjsSubscriber {
  taskForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private readonly _router: Router,
    private _taskService: TaskService
  ) {
    super();

    this.taskForm = this._fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(240)]],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const data = this.taskForm.value;
      this._taskService
        .createTask(data)
        .pipe(
          takeUntil(this.destroySubject$),
          catchError(() => {
            return EMPTY;
          })
        )
        .subscribe((res) => {
          this._router.navigate(['/tasks']);
        });
    }
  }
}
