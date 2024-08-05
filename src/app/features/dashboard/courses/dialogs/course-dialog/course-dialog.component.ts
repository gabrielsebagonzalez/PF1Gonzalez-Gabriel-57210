import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../../../../core/interfaces/course.interface';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss',
})
export class CourseDialogComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editCourse?: ICourse
  ) {
    this.courseForm = this.fb.group({
      name: [null, Validators.required],
      startDate: [],
      endDate: [],
    });
    if (this.editCourse) {
      this.courseForm.patchValue(this.editCourse);
    }
  }

  onSave(): void {
    if (this.courseForm.valid) {
      this.matDialogRef.close(this.courseForm.value);
    }
  }
}
