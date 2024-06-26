import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionValidation } from '@models/field-validation.model';

@Directive({
  selector: '[customShowError]',
  standalone: true
})
export class ShowErrorDirective implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() validations!: QuestionValidation[];

  public constructor(private viewContainer: ViewContainerRef) {}

  public ngOnInit() {
    this.checkControlError();

    this.formGroup.valueChanges.pipe().subscribe(() => {
      this.checkControlError();
    });
  }

  private checkControlError(): void {
    const controlToCheck = this.formGroup.controls['answerContent'];
    if (controlToCheck.errors !== null) {
      const firstErrorKey = Object.keys(controlToCheck.errors).shift();
      const errorMsg = this.validations.find(it => it.name === firstErrorKey)?.message;
      if (errorMsg) {
        this.viewContainer.element.nativeElement.textContent = errorMsg;
      }
    }
  }
}
