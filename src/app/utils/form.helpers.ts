import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ApplicationStepModal, Field, Question } from '@models/application-step.model';
import { AnswerFormGroup } from '@models/form-templates/answer-form-group.model';

import { buildControlValidators } from './form-validation.helpers';

export function createFormGroupStep(data: ApplicationStepModal): FormGroup {
  const formGroup = new FormGroup({});

  data.questions.forEach(item => {
    switch (item.questionFormType) {
      case 'Array':
        return formGroup.addControl(item.questionId, initFormArrayAnswer());
      case 'Group':
        return formGroup.addControl(item.questionId, initFormGroupAnswer(item));
      default:
        return formGroup.addControl(item.questionId, initFormSingleAnswer(item));
    }
  });

  return formGroup;
}

export function getFormControlWitPath(formGroup: FormGroup, controlPath: string): AbstractControl | null {
  const keys: string[] = controlPath.split('.');
  let controlResult: FormGroup | null = null;

  if (keys.length === 1) {
    return formGroup.get(keys[0])?.get('answerContent') || null;
  }

  keys.forEach(questionId => {
    if (!controlResult) {
      controlResult = <FormGroup>formGroup.get(questionId);
    } else {
      controlResult = <FormGroup>controlResult.get(questionId);
    }
  });

  return controlResult!.get('answerContent');
}

function initFormGroupAnswer(question: Question): FormGroup {
  const formGroup = new FormGroup({});

  const subQuestions = question.questions;
  if (subQuestions?.length) {
    subQuestions.forEach(item => {
      formGroup.addControl(item.questionId, initFormSingleAnswer(item));
    });
  }

  return formGroup;
}

export function initFormSingleAnswer(question: Question | Field): FormGroup<AnswerFormGroup> {
  return new FormGroup<AnswerFormGroup>({
    answerContent: new FormControl(question.defaultValue ?? '', buildControlValidators(question.validations))
  });
}

function initFormArrayAnswer(): FormGroup<AnswerFormGroup> {
  return new FormGroup<AnswerFormGroup>({
    answerContent: new FormControl([])
  });
}
