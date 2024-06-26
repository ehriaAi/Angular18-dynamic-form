import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { QuestionValidation } from '../../../core/models/field-validation.model';

@Component({
  selector: 'app-show-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-error.component.html',
  styleUrl: './show-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowErrorComponent implements OnInit{
  #destroyRef = inject(DestroyRef);

  public validations = input.required<QuestionValidation[]>();
  public formGroup = input.required<FormGroup>();
  public controlName = input<string>('answerContent');
  public errorMessage = signal<string | undefined>(undefined);

  public ngOnInit(): void {
   this.checkControlError();

    this.formGroup().valueChanges.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.checkControlError();
    })
  }

  private checkControlError(): void {
    const controlToCheck = this.formGroup().controls[this.controlName()];
    if(controlToCheck.errors !== null) {
      const firstErrorKey = Object.keys(controlToCheck.errors)[0];
      this.errorMessage.set(this.validations().find(it => it.name === firstErrorKey)?.message)
    }
  }
}
