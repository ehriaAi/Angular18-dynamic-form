import { FormControl, FormGroup } from "@angular/forms";

export interface AnswerFormGroup {
    answerContent: FormControl<string | number | boolean>;
}

export interface PropertyFormGroup {
    assetName: FormGroup<AnswerFormGroup>;
    assetValue: FormGroup<AnswerFormGroup>;
}

export type PropertyFormKey = keyof PropertyFormGroup;
