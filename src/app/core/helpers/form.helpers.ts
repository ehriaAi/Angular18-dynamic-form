import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

import { ApplicationStepModal, Field, Question } from "../models/application-step.model";
import { buildControlValidations as buildControlValidators } from "./form-validation.helpers";

export function createFormGroupStep(data: ApplicationStepModal): FormGroup {
    const formGroup = new FormGroup({});

    data.questions.forEach((item) => {
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

    keys.forEach((questionId) => {
        if (!controlResult) {
            controlResult = <FormGroup>formGroup.get(questionId);
        } else {
            controlResult = <FormGroup>controlResult.get(questionId);
        }
    })


    return controlResult!.get('answerContent');
};

function initFormGroupAnswer(question: Question): FormGroup {
    const formGroup = new FormGroup({});

    const subQuestions = question.questions;
    if (subQuestions?.length) {
        subQuestions.forEach((item) => {
            const answerFormGroup = new FormGroup({});
            answerFormGroup.addControl('answerContent', new FormControl(item.defaultValue || '', buildControlValidators(question.validations)));
            formGroup.addControl(item.questionId, answerFormGroup);
        });
    }

    return formGroup;
}


export function initFormSingleAnswer(question: Question | Field): FormGroup {
    const formGroup = new FormGroup({});
    formGroup.addControl('answerContent', new FormControl(question.defaultValue ?? '', buildControlValidators(question.validations)))

    return formGroup;
}

function initFormArrayAnswer(): FormGroup {
    const formGroup = new FormGroup({});
    formGroup.addControl('answerContent', new FormControl([]))
    // formGroup.addControl('answerContent', new FormArray([
    //     new FormGroup({
    //         assetName: new FormControl('Car'),
    //         assetValue: new FormControl(500)
    //     }),
    //     new FormGroup({
    //         assetName: new FormControl('Thick Car'),
    //         assetValue: new FormControl(5000)
    //     })
    // ]))

    return formGroup;
}



