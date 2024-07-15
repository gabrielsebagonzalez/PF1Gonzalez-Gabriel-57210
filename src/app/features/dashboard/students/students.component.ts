import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './dialogs/student-dialog/student-dialog.component';
import { IStudent } from '../../../core/interfaces/student.interfaces';
import { generateId } from '../../../shared/utils';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  nombreAlumno = '';
  displayedColumns: string[] = ['id', 'name', 'surname', 'course', 'actions'];
  dataSource: IStudent[] = [
    {
      id: 'JDCD1',
      name: 'Carlos',
      surname: 'Pérez',
      course: 'Angular',
    },
    {
      id: 'JDCD2',
      name: 'Cecilia',
      surname: 'González',
      course: 'React',
    },
    {
      id: 'JDCD3',
      name: 'Tomás',
      surname: 'Soto',
      course: 'JavaScript',
    },
  ];

  constructor(private matDialog: MatDialog) {}

  openDialogStudent(): void {
    this.matDialog
      .open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          this.nombreAlumno = value.name;
          value['id'] = generateId(5);
          this.dataSource = [...this.dataSource, value];
        },
      });
  }

  deleteStudentById(id: string) {
    if (confirm('¿Está seguro que desea eliminar al alumno?:')) {
      this.dataSource = this.dataSource.filter((el) => el.id !== id);
    }
  }

  editStudent(editingStudent: IStudent) {
    this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.dataSource = this.dataSource.map((el) =>
              el.id === editingStudent.id
                ? { ...value, id: editingStudent.id }
                : el
            );
          }
        },
      });
  }
}
