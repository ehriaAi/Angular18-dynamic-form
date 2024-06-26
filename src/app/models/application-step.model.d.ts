import { QuestionValidation } from './field-validation.model';

export interface ApplicationStepModal {
  step: string;
  stepNumber: number;
  stepName: string;
  questions: Question[];
}

export interface Field<T = any> {
  answerType: string;
  label: string;
  name: T;
  placeholder: string | null;
  validations: QuestionValidation[];
  options?: { text: string; value: string }[];
  defaultValue?: string | number | boolean;
  conditionPopulated?: ConditionPopulated;
  conditionReadonly?: ConditionReadonly;
  conditionVisibility?: ConditionVisibility;
  fields?: Field[];
}

export interface Question extends Field {
  questionFormType: QuestionFormType;
  parentQuestionId?: string;
  questionId: string;
  // questionFormType: QuestionFormType;
  // answerType: string;
  // label: string;
  // name: string;
  description?: string;
  // placeholder: string | null;
  // options?: {text: string, value: string}[]; // Only for select type questions
  // defaultValue?: string | number;
  // validations: QuestionValidation[];
  questions?: Question[];
  fields?: Field[]; // Only for answerType has value is ListItem (FormArray)
  // conditionPopulated?: ConditionPopulated;
  // conditionReadonly?: ConditionReadonly;
}

export type QuestionFormType = 'Single' | 'Array' | 'Group';

export interface ConditionPopulated {
  conditionFieldIds: string[];
  populatedFormula: string;
}

export interface ConditionVisibility {
  conditionFieldIds: string[];
  visibilityWhen: string;
}

export interface ConditionReadonly {
  conditionFieldIds: string[];
  readonlyWhen: string;
}
