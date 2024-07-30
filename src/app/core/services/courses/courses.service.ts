import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICourse } from '../../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private DATABASE = [
    {
      id: 'ASD123',
      name: 'Python',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 'ASD124',
      name: 'Angular',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 'ASD125',
      name: 'React',
      endDate: new Date(),
      startDate: new Date(),
    },
  ];

  constructor() {}

  getCourses(): Observable<ICourse[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.DATABASE);
        observer.complete();
      }, 500);
    });
  }

  addCourse(course: ICourse): Observable<ICourse[]> {
    this.DATABASE.push(course);
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.DATABASE);
        observer.complete();
      }, 1500);
    });
  }

  deleteCourseById(id: string): Observable<ICourse[]> {
    this.DATABASE = this.DATABASE.filter((el) => el.id !== id);
    return this.getCourses();
  }

  editCourseById(id: string, update: ICourse) {
    this.DATABASE = this.DATABASE.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getCourses();
  }

  getCoursesById(id: string): Observable<ICourse | undefined> {
    return this.getCourses().pipe(
      map((courses) => courses.find((el) => el.id === id))
    );
  }
}
