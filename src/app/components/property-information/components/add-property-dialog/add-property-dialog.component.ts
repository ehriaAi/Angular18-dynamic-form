import { ChangeDetectionStrategy, Component, Inject, OnInit, Signal, signal } from '@angular/core';
import { PropertyFormGroup, PropertyFormKey } from '../../models/property-form';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Field } from '@models/application-step.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SingleQuestionComponent } from '@shared/components/question-form-templates/single-question/single-question.component';
import { MatButtonModule } from '@angular/material/button';
import { CdkTrapFocus } from '@angular/cdk/a11y';

import { initPropertyFormGroup, mapFormDataToProperty } from '../../helpers/property-form.helper';
import { LiabilityAssetComponent } from '../liability-asset/liability-asset.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-property-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    LiabilityAssetComponent,
    SingleQuestionComponent,
    CdkTrapFocus
  ],
  templateUrl: './add-property-dialog.component.html',
  styleUrl: './add-property-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPropertyDialogComponent implements OnInit {
  public formGroup = signal<FormGroup<PropertyFormGroup>>(new FormGroup<PropertyFormGroup>(<PropertyFormGroup>{}));
  public fields = signal<Field<PropertyFormKey>[]>([]);
  public isSubmit = signal<boolean>(false);

  public liabilityFormGroup = signal(
    new FormGroup({
      answerContent: new FormControl<any>({})
    })
  );

  public assetValue1!: Signal<number>;

  get assetValue(): number {
    return <number>this.formGroup().getRawValue().assetValue.answerContent || 0;
  }

  public isShowLiabilityForm = signal<boolean>(false);

  public constructor(
    private dialogRef: MatDialogRef<AddPropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { fields: Field<PropertyFormKey>[] }
  ) {
    this.fields.set(this.data.fields);
    initPropertyFormGroup(this.fields(), this.formGroup());

    this.assetValue1 = toSignal(
        <Observable<number>>this.formGroup().get('assetValue')!.get('answerContent')!.valueChanges,
        {
          initialValue: 0
        }
    );

    console.log('sa', this.formGroup());
    this.formGroup().valueChanges.subscribe(data => {
      this.isShowLiabilityForm.set(Boolean(data.isLiability?.answerContent));
      if (data.isLiability?.answerContent) {
        const propertyValue = data.assetValue?.answerContent || 0;
        this.liabilityFormGroup().patchValue({
          answerContent: { propertyValue }
        });
      }
    });
  }

  public save(): void {
    this.isSubmit.set(true);
    if (this.formGroup().invalid) {
      return;
    }

    this.dialogRef.close(mapFormDataToProperty(this.fields(), this.formGroup()));
  }

  ngOnInit(): void {

  }
}
