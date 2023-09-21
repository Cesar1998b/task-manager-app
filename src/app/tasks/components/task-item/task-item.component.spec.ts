import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TaskItemComponent } from './task-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../services/task.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let serviceStub: jasmine.SpyObj<TaskService>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let notificationService: jasmine.SpyObj<NotificationsService>;

  beforeEach(async () => {
    serviceStub = jasmine.createSpyObj('TaskService', {
      updateTask: of({ mesagge: 'okay' }),
      setSelectedTask: of({title: 'test', description: 'test'})
    });

    notificationService = jasmine.createSpyObj('NotificationsService', {
      showError: of({}),
      showSuccess: of({})
    });

    await TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: TaskService, useValue: serviceStub },
        { provide: Router, useValue: routerSpy },
        {
          provide: NotificationsService,
          useValue: notificationService,
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editTask and navigate to edit page', () => {
    component.title = 'test';
    component.description = 'test';

    component.editTask();

    expect(serviceStub.setSelectedTask).toHaveBeenCalledWith({
      title: component.title,
      description: component.description,
    });
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should emit deleteClicked event when deleteTask is called', () => {
    const deleteSpy = jasmine.createSpy('deleteSpy');

    component.deleteClicked.subscribe(deleteSpy);
    component.deleteTask();

    expect(deleteSpy).toHaveBeenCalledWith(component.id);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should call updateState and success', () => {
    component.completed = false;

    serviceStub.updateTask.and.returnValue(of({message: 'Tarea creada con éxito'}));

    component.updateState();

    expect(serviceStub.updateTask).toHaveBeenCalled();
    expect(notificationService.showSuccess).toHaveBeenCalled();
  });


  it('should call updateState and error', () => {
    component.completed = false;
    const error = new Error('Something went wrong');


    serviceStub.updateTask.and.returnValue(throwError(error));

    component.updateState();

    expect(serviceStub.updateTask).toHaveBeenCalled();
    expect(notificationService.showError).toHaveBeenCalled();
  });
});
