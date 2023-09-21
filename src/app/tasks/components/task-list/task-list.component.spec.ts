import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { ReplaySubject, of, throwError } from 'rxjs';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

const mockTask: Task[] = [
  { id: '1', title: 'test', description: 'test', completed: false },
];

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let serviceStub: jasmine.SpyObj<TaskService>;
  let matDialogRefMock: jasmine.SpyObj<any>;
  let matDialogStub: jasmine.SpyObj<MatDialog>;
  let matDialogAfterClosedSubject: jasmine.SpyObj<any>;
  let notificationService: jasmine.SpyObj<NotificationsService>;

  beforeEach(async () => {
    serviceStub = jasmine.createSpyObj('TaskService', {
      getTasks: of(mockTask),
      deleteTask: of({ mesagge: 'okay' }),
    });

    matDialogStub = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    notificationService = jasmine.createSpyObj('NotificationsService', {
      showSuccess: of({}),
      showError: of({})
    });

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        {
          provide: TaskService,
          useValue: serviceStub,
        },
        { provide: MatDialog, useValue: matDialogStub },
        {
          provide: NotificationsService,
          useValue: notificationService,
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTask in ngOnInit', () => {
    spyOn(component, 'loadTask').and.callThrough();

    component.ngOnInit();

    expect(component.loadTask).toHaveBeenCalled();
  });

  it('should set tasks data', () => {
    component.loadTask();

    expect(component.tasks).toEqual(mockTask);
    expect(component.loading).toBeFalsy();
  });

  it(
    'should open confirmation dialog and success',
    waitForAsync(() => {
      spyOn(component, 'loadTask').and.callThrough();

      matDialogAfterClosedSubject = new ReplaySubject();
      matDialogRefMock.afterClosed.and.returnValue(matDialogAfterClosedSubject.asObservable());
      matDialogStub.open.and.returnValue(matDialogRefMock);

      matDialogAfterClosedSubject.next(true);

      component.deleteTask('test');

      expect(matDialogStub.open).toHaveBeenCalledWith(ConfirmationDialogComponent);

      expect(notificationService.showSuccess).toHaveBeenCalled();
      expect(component.loadTask).toHaveBeenCalled();
    })
  );

  it(
    'should open confirmation dialog and success',
    waitForAsync(() => {
      const error = new Error('Something went wrong');
      serviceStub.deleteTask.and.returnValue(throwError(error));
      spyOn(component, 'loadTask').and.callThrough();

      matDialogAfterClosedSubject = new ReplaySubject();
      matDialogRefMock.afterClosed.and.returnValue(matDialogAfterClosedSubject.asObservable());
      matDialogStub.open.and.returnValue(matDialogRefMock);

      matDialogAfterClosedSubject.next(true);

      component.deleteTask('test');

      expect(matDialogStub.open).toHaveBeenCalledWith(ConfirmationDialogComponent);

      expect(notificationService.showError).toHaveBeenCalled();
      expect(component.loadTask).not.toHaveBeenCalled();
    })
  );
});
