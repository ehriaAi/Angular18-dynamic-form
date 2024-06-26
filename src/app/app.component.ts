import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormGroup, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable, combineLatest, debounceTime, filter, startWith, takeUntil } from 'rxjs';

import { MatExpansionModule } from '@angular/material/expansion';
import { ApplicationStepNumber } from './enums/application-step.enum';
import { createFormGroupStep, getFormControlWitPath } from './utils/form.helpers';
import { ApplicationStepModal, Question } from './models/application-step.model';
import { ApplicationQuestionService } from '@core/services/application-question.service';
import { ApplicationStepService } from '@core/services/application-step.service';
import { SingleQuestionComponent } from './shared/components/question-form-templates/single-question/single-question.component';
import { FormGroupCastPipe } from './pipes/form-group-cast.pipe';
import { ArrayQuestionComponent } from './shared/components/question-form-templates/array-question/array-question.component';
import { PropertyInformationComponent } from './components/property-information/property-information.component';
import { GroupQuestionComponent } from './shared/components/question-form-templates/group-question/group-question.component';

export type QuestionFormType = 'Array' | 'Group' | 'Single';
// export enum QuestionFormTypeEnum {
//   FormArray = 'FormArray'
//   FormGroup =  'FormGroup'
// };

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatButtonModule,
    CommonModule,
    FormGroupCastPipe,
    ReactiveFormsModule,
    MatExpansionModule,
    SingleQuestionComponent,
    PropertyInformationComponent,
    GroupQuestionComponent,
    ArrayQuestionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  public formRecord = signal<FormRecord>(new FormRecord({}));
  public applicationStep = signal<ApplicationStepModal | null>(null);
  public ApplicationStepNumber = ApplicationStepNumber;
  public isLoading = signal<boolean>(false);

  // public questionFormType = signal<Record<'FormGroup' | 'FormArray', string>[]>([]);

  // public questionFormType: Signal<Map<string, QuestionFormType>> = computed(() => {
  //   if(this.applicationStep()) {
  //     return new Map(this.applicationStep()!.questions.map(it => {
  //       // const formType = it.answerType === AnswerType.List_Item ? 'FormArray': 'FormGroup';
  //       let formType: QuestionFormType = 'Single';
  //       if(it.questions?.length) {
  //         formType =  'Group';
  //       } else if(it.answerType == AnswerType.List_Item) {
  //         formType =  'Array'
  //       } else {
  //         formType =  'Single';
  //       }
  //       return[it.questionId, formType]
  //     }));
  //   }
  //   return new Map([]);
  // });

  public constructor(
    private applicationQuestionService: ApplicationQuestionService,
    private applicationStepService: ApplicationStepService
  ) {}

  get formGroupStep(): FormGroup | null {
    if (this.applicationStep()) {
      return this.formRecord().controls[this.applicationStep()!.step] as FormGroup;
    }
    return null;
  }

  get currentStep$(): Observable<number> {
    return this.applicationStepService.currentStep$;
  }

  get totalStep(): number {
    return Object.keys(ApplicationStepNumber).length / 2;
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public nextStep() {
    this.applicationStepService.nextStep();
  }

  public prevStep() {
    this.applicationStepService.preStep();
  }

  public onSubmit() {}

  private fetchData(): void {
    this.isLoading.set(true);

    combineLatest([this.applicationQuestionService.getQuestions(), this.applicationStepService.currentStep$]).subscribe(
      {
        next: ([data, currentStep]: [ApplicationStepModal[], number]) => {
          const currentAppStep: ApplicationStepModal = data.find(it => it.stepNumber === currentStep)!;

          this.applicationStep.set(currentAppStep);
          this.initFormWithApplicationStep(currentAppStep);
          console.log('form', this.formRecord());
          this.isLoading.set(false);
          this.formRecord()
            .valueChanges.pipe(
              debounceTime(300),
              takeUntil(
                this.currentStep$.pipe(filter(currentStep => currentStep !== this.applicationStep()?.stepNumber))
              )
            )
            .subscribe(change => console.log('valuechange', change));
        }
      }
    );
  }

  private initFormWithApplicationStep(data: ApplicationStepModal): void {
    this.formRecord.set(new FormRecord({}));
    const formGroupStep: FormGroup = createFormGroupStep(data);
    this.formRecord().addControl(data.step, formGroupStep);

    this.initConditionControlListeners(data.questions, formGroupStep, 'conditionPopulated');
    this.initConditionControlListeners(data.questions, formGroupStep, 'conditionReadonly');
  }

  private initConditionControlListeners(
    questions: Question[],
    formGroupStep: FormGroup,
    checkType: 'conditionPopulated' | 'conditionReadonly'
  ): void {
    const flatQuestions = questions.flatMap(q => q.questions || q).filter(Boolean);

    const conditionQuestions = flatQuestions.filter(it => Boolean(it[checkType]));
    conditionQuestions.forEach(it => {
      const conditionControls = it[checkType]!.conditionFieldIds.map((controlPath: string) =>
        getFormControlWitPath(formGroupStep, controlPath)
      );

      const formGroupPopulatedPath = it.parentQuestionId ? `${it.parentQuestionId}.${it.questionId}` : it.questionId;
      const populatedControl = getFormControlWitPath(formGroupStep, formGroupPopulatedPath);
      this.listenNeededFormControlsChange(it, conditionControls, populatedControl, checkType);
    });
  }

  private listenNeededFormControlsChange(
    currentQuestion: Question,
    conditionControls: (AbstractControl<any, any> | null)[],
    populatedControl: AbstractControl | null,
    checkType: 'conditionPopulated' | 'conditionReadonly'
  ): void {
    const neededFormControlsChanges$: Observable<any>[] = conditionControls
      .filter(Boolean)
      .map(control => control!.valueChanges.pipe(startWith(control?.value)));
    console.log('neededFormControlsChanges$', conditionControls);

    combineLatest(neededFormControlsChanges$)
      .pipe(
        debounceTime(300),
        filter((listData: string[]) => Boolean(listData.filter(Boolean).length)),
        takeUntil(this.currentStep$.pipe(filter(currentStep => currentStep !== this.applicationStep()?.stepNumber)))
      )
      .subscribe({
        next: data => {
          console.log('data', data);
          if (checkType === 'conditionPopulated') {
            this.handleConditionPopulatedChanged(data, currentQuestion, conditionControls, populatedControl);
          } else {
            this.handleConditionReadonlyChanged(data, currentQuestion, populatedControl);
          }
        }
      });
  }

  private handleConditionPopulatedChanged(
    data: string[],
    currentQuestion: Question,
    conditionControls: (AbstractControl<any, any> | null)[],
    populatedControl: AbstractControl | null
  ): void {
    if (conditionControls.some(control => control?.invalid)) {
      populatedControl?.setValue(0);
      return;
    }
    const paramsQuestionsId = currentQuestion.conditionPopulated!.conditionFieldIds.map(
      it => it.split('.').reverse()[0]
    );
    const funcReturn = `return ${currentQuestion.conditionPopulated?.populatedFormula};`;
    const calcFunc = new Function(...paramsQuestionsId, funcReturn);
    populatedControl?.setValue(calcFunc.apply(null, data));
  }

  private handleConditionReadonlyChanged(
    data: string[],
    currentQuestion: Question,
    populatedControl: AbstractControl | null
  ): void {
    const paramsQuestionsId = currentQuestion.conditionReadonly!.conditionFieldIds.map(
      it => it.split('.').reverse()[0]
    );
    const isReadonlyFunc = new Function(
      ...paramsQuestionsId,
      `return ${currentQuestion.conditionReadonly?.readonlyWhen};`
    );
    if (isReadonlyFunc.apply(null, data)) {
      populatedControl?.disable();
    } else {
      populatedControl?.enable();
    }
  }
}
