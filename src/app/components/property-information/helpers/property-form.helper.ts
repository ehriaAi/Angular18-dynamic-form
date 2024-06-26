import { FormGroup } from '@angular/forms';
import { Field } from '@models/application-step.model';
import { initFormSingleAnswer } from '@utils/form.helpers';

import { PropertyFormGroup, PropertyFormKey } from '../models/property-form';
import { Property } from '../models/property';

export function initPropertyFormGroup(fields: Field<PropertyFormKey>[], formGroup: FormGroup<PropertyFormGroup>): void {
  fields.forEach(field => {
    formGroup.addControl(<PropertyFormKey>field.name, initFormSingleAnswer(field));
  });
}

export function mapFormDataToProperty(
  fields: Field<PropertyFormKey>[],
  formGroup: FormGroup<PropertyFormGroup>
): Property {
  const formData = formGroup.getRawValue();
  return fields.reduce(
    (previous, current: Field) => {
      const control = formData[<PropertyFormKey>current.name].answerContent;
      return {
        ...previous,
        [current.name]: control
      };
    },
    <Property>{}
  );
}
