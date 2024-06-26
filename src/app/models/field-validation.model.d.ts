import { VALIDATOR_MAP } from '@constants/validator-map.constant';

export interface QuestionValidation {
  name: string;
  validator: keyof typeof VALIDATOR_MAP;
  message: string;
  pattern?: string;
  validationValue?: number;
}
