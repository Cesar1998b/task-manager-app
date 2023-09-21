import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [NotificationsService],
    });
    service = TestBed.inject(NotificationsService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar open method for success notification', () => {
    const snackBarOpenSpy = spyOn(snackBar, 'open').and.stub();
    const message = 'Success message';
    service.showSuccess(message);
    expect(snackBarOpenSpy).toHaveBeenCalledWith(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  });

  it('should call MatSnackBar open method for error notification', () => {
    const snackBarOpenSpy = spyOn(snackBar, 'open').and.stub();
    const message = 'Error message';
    service.showError(message);
    expect(snackBarOpenSpy).toHaveBeenCalledWith(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  });
});
