import { ChangeDetectionStrategy, Component, Input, input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { isOriginalDebtBiggerThanAssetValueValidator } from '../../helpers/liability-validador.helpers';

@Component({
  selector: 'app-liability-asset',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonToggle, MatButtonToggleGroup, MatOption, MatSelect],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LiabilityAssetComponent
    }
  ],
  templateUrl: './liability-asset.component.html',
  styleUrl: './liability-asset.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiabilityAssetComponent implements OnInit, ControlValueAccessor {
  // public assetValue = input.required<number>();
  // public assetValue = input.required<number>();
  @Input() assetValue!: number;
  public remainingTerms = signal<number[]>(Array.from({ length: 12 * 10 }, (_, i) => i + 1));

  public formGroup = signal<FormGroup>(
    new FormGroup(
      {
        propertyValue: new FormControl({ value: this.assetValue, disabled: true }, {}),
        originalDebt: new FormControl(null),
        fixedInterestRate: new FormControl(null),
        remainingFixedRateTerm: new FormControl(null)
      },
      [isOriginalDebtBiggerThanAssetValueValidator()]
    )
  );

  public onTouched = () => {};
  public onChanged = (data: any) => {};

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(obj: any): void {
    this.formGroup().patchValue({
      propertyValue: obj.propertyValue
    });
  }

  public ngOnInit(): void {
    this.formGroup().valueChanges.subscribe(a => {
      console.log('vclonchange', a, this.formGroup());
    });
  }
}
