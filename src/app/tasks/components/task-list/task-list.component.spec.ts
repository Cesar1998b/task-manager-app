import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';

const mockTask: Task[] = [
  { id: '1', title: 'test', description: 'test', completed: false }
];

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let serviceStub: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    serviceStub = jasmine.createSpyObj('TaskService', {
      getTasks: of(mockTask),
    });

    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      providers: [
        {
          provide: TaskService,
          useValue: serviceStub
        }
      ]
    })
    .compileComponents();

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
});
