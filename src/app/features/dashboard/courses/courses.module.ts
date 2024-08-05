import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { CoursesComponent } from './courses.component';
import { CourseDialogComponent } from './dialogs/course-dialog/course-dialog.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ],
})
export class CoursesModule { }
