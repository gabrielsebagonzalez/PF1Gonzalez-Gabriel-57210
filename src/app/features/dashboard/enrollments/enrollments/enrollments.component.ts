import { Component } from '@angular/core';
import { EnrollmentsService } from '../../../../core/services/enrollments/enrollments.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent {

  constructor(
    private enrollmentsService: EnrollmentsService,
  ) {}
}
