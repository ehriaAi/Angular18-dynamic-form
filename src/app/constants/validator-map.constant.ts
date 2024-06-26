import { Validators } from '@angular/forms';

export const VALIDATOR_MAP = {
  required: Validators.required,
  pattern: (pattern: string) => Validators.pattern(pattern),
  max: (value: number) => Validators.max(value),
  min: (value: number) => Validators.min(value)
};
