import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ApplicationStepModal } from '../core/models/application-step.model';
import { SingleQuestionComponent } from '../shared/components/single-question/single-question.component';
import { ShowErrorComponent } from '../shared/components/show-error/show-error.component';
import { PensionFund } from './enums/pension-fund.enum';
import { FrequencialIncome } from './enums/frequencial-income.enum';
import { CommonModule } from '@angular/common';
import { FormGroupCastPipe } from '../shared/pipes/form-group-cast.pipe';

@Component({
  selector: 'app-primary-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatExpansionModule, MatInputModule, MatButtonToggleModule, SingleQuestionComponent, ShowErrorComponent, FormGroupCastPipe, SingleQuestionComponent],
  templateUrl: './primary-income.component.html',
  styleUrl: './primary-income.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryIncomeComponent {
  public readonly PensionFund = PensionFund;
  public readonly FrequencialIncome = FrequencialIncome;

  public applicationStep = input.required<ApplicationStepModal>();
  public formGroup = input.required<FormGroup>();


  getFormGroupQuestion(questionId: string): FormGroup {
    return <FormGroup>this.formGroup().controls[questionId];
  }

  ngOnInit(): void {
    console.log('formRecord-abc', this.formGroup())
  }
}
