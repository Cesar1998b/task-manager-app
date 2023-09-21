import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './services/task.service';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    TaskRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule
  ],
  providers: [TaskService]
})
export class TaskModule { }
