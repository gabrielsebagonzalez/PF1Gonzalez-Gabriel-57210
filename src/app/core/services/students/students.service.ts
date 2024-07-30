import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IStudent } from '../../interfaces/student.interfaces';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private DATABASE = [
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

  constructor() {}

  getStudents(): Observable<IStudent[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.DATABASE);
        observer.complete();
      }, 500);
    });
  }

  addStudent(student: IStudent): Observable<IStudent[]> {
    this.DATABASE.push(student);
    return this.getStudents();
  }

  editStudentById(id: string, update: IStudent) {
    this.DATABASE = this.DATABASE.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getStudents();
  }

  deleteStudentById(id: string): Observable<IStudent[]> {
    this.DATABASE = this.DATABASE.filter((el) => el.id !== id);
    return this.getStudents();
  }

  getStudentsById(id: string): Observable<IStudent | undefined> {
    return this.getStudents().pipe(
      map((students) => students.find((el) => el.id === id))
    );
  }
}
