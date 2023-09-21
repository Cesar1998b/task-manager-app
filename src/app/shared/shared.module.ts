import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [ConfirmationDialogComponent],
  providers: [NotificationsService],
})
export class SharedModule {}
