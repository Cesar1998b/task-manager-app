import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { ResponseTask, Task, TaskCreateBody } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = environment.urlApi;

  constructor(private _http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.url}/tasks`);
  }

  createTask(data: TaskCreateBody): Observable<ResponseTask> {
    return this._http.post<ResponseTask>(`${this.url}/tasks`, data);
  }
}
