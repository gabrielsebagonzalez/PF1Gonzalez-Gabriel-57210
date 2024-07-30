import { Component } from '@angular/core';
import { StudentsService } from '../../../../../core/services/students/students.service';
import { Observable } from 'rxjs';
import { IStudent } from '../../../../../core/interfaces/student.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent {
  student$: Observable<IStudent | undefined>;

  constructor(
    private studentsService: StudentsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.student$ = this.studentsService.getStudentsById(
      this.activatedRoute.snapshot.params['id']
    );
  }
}
