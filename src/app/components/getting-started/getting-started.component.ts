import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { SingleQuestionComponent } from '../../shared/components/single-question/single-question.component';
import { ApplicationStepModal } from '../../core/models/application-step.model';


@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SingleQuestionComponent],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GettingStartedComponent {

  public formGroup = input.required<FormGroup>();
  public applicationStep = input.required<ApplicationStepModal>();

  public constructor() { }

  public getFormGroupQuestion(questionId: string): FormGroup {
    return <FormGroup>this.formGroup().controls[questionId];
  }
}
