import { environment } from './../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

const url = environment.urlApi;

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTasks', (done: DoneFn) => {
    const mockResponseData: Task[] = [
      { id: '1', title: 'test', description: 'test', completed: false },
    ];
    service.getTasks().subscribe((response) => {
      expect(response).toEqual(mockResponseData);
      done();
    });

    const req = httpTestingController.expectOne(
      (testRequest) => testRequest.url === `${url}/tasks`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponseData);
  });
});
