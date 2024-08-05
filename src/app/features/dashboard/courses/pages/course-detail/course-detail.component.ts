import { Component } from '@angular/core';
import { ICourse } from '../../../../../core/interfaces/course.interface';
import { Observable } from 'rxjs';
import { CoursesService } from '../../../../../core/services/courses/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  courses$: Observable<ICourse | undefined>;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute
  ){
    this.courses$ = this.coursesService.getCoursesById(
      this.activatedRoute.snapshot.params['id']
    );
  }
}
