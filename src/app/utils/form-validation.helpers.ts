import { ValidatorFn } from '@angular/forms';
import { VALIDATOR_MAP } from '@constants/validator-map.constant';
import { QuestionValidation } from '@models/field-validation.model';

export function buildControlValidators(validations: QuestionValidation[]): ValidatorFn[] {
  if (validations.length === 0) {
    return [];
  }

  return validations.map(item => {
    switch (item.validator) {
      case 'pattern':
        return VALIDATOR_MAP[item.validator](item.pattern!);
      case 'max':
        return VALIDATOR_MAP[item.validator](item.validationValue!);
      case 'min':
        return VALIDATOR_MAP[item.validator](item.validationValue!);
      default:
        return VALIDATOR_MAP[item.validator];
    }
  });
}
