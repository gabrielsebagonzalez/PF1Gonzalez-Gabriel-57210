import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICourse } from '../../interfaces/course.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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

  constructor(
    private httpClient: HttpClient,
  ) {}

  getCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>( environment.apiUrl + 'courses')
  }

  addCourse( body: Object): Observable<ICourse> {
    return this.httpClient.post<ICourse>(environment.apiUrl + 'courses', body);
  }

  deleteCourseById(id: string): Observable<ICourse[]> {
   return this.httpClient.delete<ICourse[]>(environment.apiUrl + 'courses/' + id);
  }

  editCourseById(id: string, update: ICourse): Observable<ICourse[]> {
    return this.httpClient.put<ICourse[]>(environment.apiUrl + 'courses/'+ id, update);
  }

  getCoursesById(id: string): Observable<ICourse | undefined> {
    return this.getCourses().pipe(
      map((courses) => courses.find((el) => el.id === id))
    );
  }
}
