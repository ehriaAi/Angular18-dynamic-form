import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AnswerType } from '@enums/answer-type.enum';
import { Field, Question } from '@models/application-step.model';
import { ShowErrorDirective } from '@shared/directives/show-error.directive';

@Component({
  selector: 'app-single-question',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    ShowErrorDirective
  ],
  providers: [],
  templateUrl: './single-question.component.html',
  styleUrl: './single-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleQuestionComponent {
  public readonly AnswerType = AnswerType;

  public formGroup = input.required<FormGroup>();
  public question = input.required<Question | Field>();
  public isShowLabel = input<boolean>(true);
  public isSubmit = input<boolean>(false);

  public constructor(private cdRef: ChangeDetectorRef) {
    effect(() => {
      if (this.isSubmit()) {
        this.formGroup().markAllAsTouched();
        this.cdRef.detectChanges();
      }
    });
  }
}
