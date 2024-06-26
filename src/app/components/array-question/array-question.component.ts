import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Question } from '../../core/models/application-step.model';
import { AnswerType } from '../../core/enums/answer-type.enum';
import { PropertyInformationComponent } from './components/property-information/property-information.component';

@Component({
  selector: 'app-array-question',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PropertyInformationComponent
  ],
  templateUrl: './array-question.component.html',
  styleUrl: './array-question.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayQuestionComponent {
  public readonly AnswerType = AnswerType;
  
  public formGroup = input.required<FormGroup>();
  public question = input.required<Question>();

  public ngOnInit(): void {
    this.formGroup().valueChanges.subscribe(data => {
      console.log('cchange', data)
    })
  }

  get answerContentFormArray(): FormArray {
    return <FormArray>this.formGroup().get('answerContent'); 
  }

}
