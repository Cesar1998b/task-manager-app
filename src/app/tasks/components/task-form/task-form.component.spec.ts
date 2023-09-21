import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { Task } from '../../models/task.model';

const mockTask: Task = { id: '1', title: 'test', description: 'test', completed: false }
;

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let serviceStub: jasmine.SpyObj<TaskService>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let notificationService: jasmine.SpyObj<NotificationsService>;

  beforeEach(async () => {
    serviceStub = jasmine.createSpyObj('TaskService', {
      createTask: of(mockTask),
      updateTask: of(mockTask)
    });

    notificationService = jasmine.createSpyObj('NotificationsService', {
      showError: of({}),
      showSuccess: of({})
    });


    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: '1'
            }),
            snapshot: {}
          }
        },
        { provide: TaskService, useValue: serviceStub },
        { provide: Router, useValue: routerSpy },
        {
          provide: NotificationsService,
          useValue: notificationService,
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form when valid and action is create', () => {
    const taskFormValue = {
      title: 'Test Title',
      description: 'Test Description',
    };

    component.isEdit = false;

    serviceStub.createTask.and.returnValue(of({message: 'Tarea creada con éxito'}));

    component.taskForm.setValue(taskFormValue);

    component.onSubmit();

    expect(serviceStub.createTask).toHaveBeenCalledWith(taskFormValue);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
    expect(notificationService.showSuccess).toHaveBeenCalled();
  });

  it('should handle form submission error', () => {
    const taskFormValue = {
      title: 'Test Title',
      description: 'Test Description',
    };

    const error = new Error('Something went wrong');
    serviceStub.createTask.and.returnValue(throwError(error));

    component.taskForm.setValue(taskFormValue);

    component.onSubmit();

    expect(serviceStub.createTask).toHaveBeenCalled();
    expect(notificationService.showError).toHaveBeenCalled();
  });

  it('should submit the form when valid and action is update', () => {
    const taskFormValue = {
      title: 'Test Title',
      description: 'Test Description',
    };

    component.isEdit = true;

    serviceStub.updateTask.and.returnValue(of({message: 'Tarea creada con éxito'}));

    component.taskForm.setValue(taskFormValue);

    component.onSubmit();

    expect(serviceStub.updateTask).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
    expect(notificationService.showSuccess).toHaveBeenCalled();
  });
});
