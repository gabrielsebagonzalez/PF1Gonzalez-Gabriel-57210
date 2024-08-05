import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ICourse } from '../../../core/interfaces/course.interface';
import { generateId } from '../../../shared/utils';
import { CoursesService } from '../../../core/services/courses/courses.service';
import { CourseDialogComponent } from './dialogs/course-dialog/course-dialog.component';

const courseElements: ICourse[] = [];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'startDate',
    'endDate',
    'actions',
  ];
  courseData = courseElements;
  nombreCurso: string = '';
  spinnerLoading: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.spinnerLoading = true;
    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.courseData = res;
      },
      complete: () => {
        this.spinnerLoading = false;
      },
    });
  }

  openCourseDialog() {
    this.matDialog
      .open(CourseDialogComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.nombreCurso = res.name;
          res.id = generateId(5);
          this.spinnerLoading = true;
          this.courseService.addCourse(res).subscribe({
            next: (courses) => {
              this.courseData = [...courses];
            },
            complete: () => {
              this.spinnerLoading = false;
            },
          });
        },
      });
  }

  deleteCourseById(id: string) {
    if (confirm('Está seguro que desea eliminar?')) {
      this.spinnerLoading = true;
      this.courseService.deleteCourseById(id).subscribe({
        next: (courses) => {
          this.courseData = [...courses];
        },
        complete: () => {
          this.spinnerLoading = false;
        },
      });
    }
  }

  editCourse(editCourse: ICourse) {
    this.matDialog
      .open(CourseDialogComponent, { data: editCourse })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.courseService.editCourseById(editCourse.id, value).subscribe({
              next: (course) => {
                this.courseData = [...course]
              }
            })

          }
        },
      });
  }
}
