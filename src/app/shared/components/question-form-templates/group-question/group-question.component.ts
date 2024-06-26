import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { Question } from '@models/application-step.model';

import { SingleQuestionComponent } from '../single-question/single-question.component';
import { FormGroupCastPipe } from '../../../../pipes/form-group-cast.pipe';

@Component({
  selector: 'app-general-group-question',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SingleQuestionComponent,
    FormGroupCastPipe,
    MatExpansionModule,
    MatInputModule,
    MatButtonToggleModule
  ],
  templateUrl: './group-question.component.html',
  styleUrl: './group-question.component.scss'
})
export class GroupQuestionComponent {
  public formGroup = input.required<FormGroup>();
  public parentQuestion = input.required<Question>();
  public subQuestions = input.required<Question[]>();
}
