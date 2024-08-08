import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take} from 'rxjs';
import { ICourse } from '../../../core/interfaces/course.interface';
import { CoursesService } from '../../../core/services/courses/courses.service';
import { CourseDialogComponent } from './dialogs/course-dialog/course-dialog.component';
import { SnackBarService } from '../../../core/services/snackBar/snack-bar.service';

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
  courseData: ICourse[] | undefined;
  nombreCurso: string = '';
  spinnerLoading: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private courseService: CoursesService,
    private snackBarService: SnackBarService
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
      error: () => {
        this.snackBarService.show('Ocurrió un error al cargar los cursos');
        this.spinnerLoading = false;
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
          this.spinnerLoading = true;
          this.courseService.addCourse(res).subscribe({
            next: (courses) => {
              this.courseData = [...this.courseData, courses];
            },
            complete: () => {
              this.spinnerLoading = false;
            },
          });
        },
      });
  }

  deleteCourseById(id: string) {
    if (confirm('¿Está seguro que desea eliminar?')) {
      this.spinnerLoading = true;
      this.courseService.deleteCourseById(id).subscribe({
        next: () => {
          this.getCourses();
        },
        error: (err) => {
          console.error('Error al eliminar el curso:', err);
          this.snackBarService.show('Ocurrió un error al eliminar el curso');
          this.spinnerLoading = false;
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
          if (value) {
            this.courseService.editCourseById(editCourse.id, value).subscribe({
              next: (updatedCourse) => {
                this.courseData = this.courseData.map((course) =>
                  course.id === updatedCourse.id ? updatedCourse : course
                );
              },
            });
          }
        },
      });
  }

}
