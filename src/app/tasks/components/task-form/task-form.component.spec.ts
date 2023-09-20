import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { of, throwError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

const mockTask: Task = { id: '1', title: 'test', description: 'test', completed: false }
;

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let serviceStub: jasmine.SpyObj<TaskService>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    serviceStub = jasmine.createSpyObj('TaskService', {
      createTask: of(mockTask),
    });

    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: TaskService, useValue: serviceStub },
        { provide: Router, useValue: routerSpy },
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

  it('should submit the form when valid', () => {
    const taskFormValue = {
      title: 'Test Title',
      description: 'Test Description',
    };

    serviceStub.createTask.and.returnValue(of({message: 'Tarea creada con éxito'}));

    component.taskForm.setValue(taskFormValue);

    component.onSubmit();

    expect(serviceStub.createTask).toHaveBeenCalledWith(taskFormValue);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
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
  });
});
