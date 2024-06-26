import { FormGroup } from "@angular/forms"

import { Field } from "../../../../../core/models/application-step.model"
import { PropertyFormGroup, PropertyFormKey } from "../models/property-form"
import { initFormSingleAnswer } from "../../../../../core/helpers/form.helpers"
import { Property } from "../models/property"

export function initPropertyFormGroup(fields: Field<PropertyFormKey>[], formGroup: FormGroup<PropertyFormGroup>): void {
    fields.forEach(field => {
        formGroup.addControl(<PropertyFormKey>field.name, initFormSingleAnswer(field))
    })
}

export function mapFormDataToProperty(fields: Field<PropertyFormKey>[], formGroup: FormGroup<PropertyFormGroup>): Property {
    const formData = formGroup.getRawValue();
    const data = fields.reduce((previous, current: Field) => {
        const control = formData[<PropertyFormKey>current.name].answerContent;
        return {
            ...previous,
            [current.name]: control
        };
    }, <Property>{})
    return data;
}
