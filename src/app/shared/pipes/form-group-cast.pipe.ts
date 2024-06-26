import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'formGroupCast',
  standalone: true,
})
export class FormGroupCastPipe implements PipeTransform {

  transform(control: AbstractControl<any, any>): FormGroup {
    return <FormGroup>control;
  }

}
