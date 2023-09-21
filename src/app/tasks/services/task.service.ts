import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { ResponseTask, Task, TaskCreateBody } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = environment.urlApi;

  private selectedTaskSubject = new BehaviorSubject<TaskCreateBody | null>(null);
  selectedTask$ = this.selectedTaskSubject.asObservable();

  constructor(private _http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.url}/tasks`);
  }

  createTask(data: TaskCreateBody): Observable<ResponseTask> {
    return this._http.post<ResponseTask>(`${this.url}/tasks`, data);
  }

  deleteTask(taskId: string): Observable<ResponseTask> {
    return this._http.delete<ResponseTask>(`${this.url}/tasks/${taskId}`);
  }

  updateTask(taskId: string, data: TaskCreateBody): Observable<ResponseTask> {
    return this._http.put<ResponseTask>(`${this.url}/tasks/${taskId}`, data);
  }

  setSelectedTask(task: TaskCreateBody) {
    this.selectedTaskSubject.next(task);
  }
}
