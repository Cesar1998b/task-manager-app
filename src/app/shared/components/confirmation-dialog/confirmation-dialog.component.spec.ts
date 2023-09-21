import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  beforeEach(() => {
    const matDialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
      ],
    });

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when onConfirmDelete is called', () => {
    component.onConfirmDelete();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
