import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isOriginalDebtBiggerThanAssetValueValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const data = formGroup.getRawValue();
    const isError = Number(data.propertyValue) < Number(data.originalDebt);
    if (isError) {
      formGroup.get('originalDebt')?.setErrors({ originalBiggerThanAssetValue: true });
    }
    return null;
    // return Number(control.get('propertyValue')?.value) > Number(control.get('originalDebt')?.value)
    //   ? { originalBiggerThanAssetValue: true }
    //   : null;
  };
}
