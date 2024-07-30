import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './dialogs/student-dialog/student-dialog.component';
import { IStudent } from '../../../core/interfaces/student.interfaces';
import { generateId } from '../../../shared/utils';
import { StudentsService } from '../../../core/services/students/students.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  nombreAlumno = '';
  displayedColumns: string[] = ['id', 'name', 'surname', 'course', 'actions'];
  studentsData: IStudent[] = [];
  spinnerLoading: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.spinnerLoading = true;
    this.studentsService
      .getStudents()
      .pipe(take(1))
      .subscribe({
        next: (students) => {
          this.spinnerLoading = false;
          this.studentsData = students;
        },
        error: (err) => {
          this.spinnerLoading = false;
          alert('Ocurrió un error');
        },
        complete: () => {
          this.spinnerLoading = false;
        },
      });
  }

  openDialogStudent(): void {
    this.matDialog
      .open(StudentDialogComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.nombreAlumno = value.name;
          value['id'] = generateId(5);
          this.spinnerLoading = true;
          this.studentsService.addStudent(value).subscribe({
            next: (student) => {
              this.studentsData = [...student];
            },
            complete: () => {
              this.spinnerLoading = false;
            },
          });
        },
      });
  }

  deleteStudentById(id: string) {
    if (confirm('¿Está seguro que desea eliminar al alumno?:')) {
      this.studentsService
        .deleteStudentById(id)
        .pipe(take(1))
        .subscribe({
          next: (student) => {
            this.studentsData = [...student];
          },
        });
    }
  }

  editStudent(editingStudent: IStudent) {
    this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.studentsService
              .editStudentById(editingStudent.id, value)
              .subscribe({
                next: (student) => {
                  this.studentsData = [...student];
                },
              });
          }
        },
      });
  }
}
