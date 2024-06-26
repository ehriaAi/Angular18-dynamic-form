import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { Question } from '../../core/models/application-step.model';
import { ShowErrorComponent } from '../components/show-error/show-error.component';
import { SingleQuestionComponent } from '../components/single-question/single-question.component';
import { FormGroupCastPipe } from '../pipes/form-group-cast.pipe';

@Component({
  selector: 'app-general-group-question',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SingleQuestionComponent,
    FormGroupCastPipe,
    MatExpansionModule, MatInputModule, MatButtonToggleModule,
    ShowErrorComponent
],
  templateUrl: './general-group-question.component.html',
  styleUrl: './general-group-question.component.css'
})
export class GeneralGroupQuestionComponent {

  public formGroup = input.required<FormGroup>();
  public parentQuestion = input.required<Question>();
  public subQuestions = input.required<Question[]>();

  // ngOnInit(): void {
  //   console.log('vclcca', this.formGroup())
  // }
}
