import { FormGroup } from '@angular/forms';
import { AnswerFormGroup } from '@models/form-templates/answer-form-group.model';

export interface PropertyFormGroup {
  assetName: FormGroup<AnswerFormGroup>;
  assetValue: FormGroup<AnswerFormGroup>;
  isLiability: FormGroup<AnswerFormGroup>;
  liability: FormGroup<AnswerFormGroup>;
}

export type PropertyFormKey = keyof PropertyFormGroup;
