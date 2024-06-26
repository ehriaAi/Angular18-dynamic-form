import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { ApplicationStepModal } from '../../core/models/application-step.model';
import { FrequencialIncome } from './enums/frequencial-income.enum';
import { PensionFund } from './enums/pension-fund.enum';
import { SingleQuestionComponent } from '../../shared/components/single-question/single-question.component';
import { ShowErrorComponent } from '../../shared/components/show-error/show-error.component';
import { FormGroupCastPipe } from '../../shared/pipes/form-group-cast.pipe';

@Component({
  selector: 'app-primary-income',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    MatExpansionModule, 
    MatInputModule, 
    MatButtonToggleModule, 
    ShowErrorComponent, 
    FormGroupCastPipe, 
    SingleQuestionComponent
  ],
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
