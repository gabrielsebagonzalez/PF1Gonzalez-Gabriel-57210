import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../../../../../core/interfaces/student.interfaces';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingStudent?: IStudent
  ) {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      course: [null, Validators.required]
    });

    if (this.editingStudent) {
      this.studentForm.patchValue(this.editingStudent);
    }
  }

  onSave(): void {
    if (this.studentForm.valid) {
      this.matDialogRef.close(this.studentForm.value);
    } else {
    }
  }
}
