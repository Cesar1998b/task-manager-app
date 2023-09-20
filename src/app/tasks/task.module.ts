import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './services/task.service';
import { TaskItemComponent } from './components/task-item/task-item.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    TaskRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [TaskService]
})
export class TaskModule { }
