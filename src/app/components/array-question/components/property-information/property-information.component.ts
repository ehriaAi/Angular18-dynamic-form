import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, OnInit, Signal, WritableSignal, computed, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';

import { Field, Question } from '../../../../core/models/application-step.model';
import { ShowErrorComponent } from '../../../../shared/components/show-error/show-error.component';
import { FormGroupCastPipe } from '../../../../shared/pipes/form-group-cast.pipe';
import { AddPropertyDialogComponent } from './components/add-property-dialog/add-property-dialog.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { Property } from './models/property';


@Component({
  selector: 'app-property-information',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    ShowErrorComponent,
    FormGroupCastPipe,
    PropertyCardComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PropertyInformationComponent,
    },
  ],
  templateUrl: './property-information.component.html',
  styleUrl: './property-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyInformationComponent implements ControlValueAccessor, OnInit {
  private readonly innerPropertiesChange$ = new Subject<Property[]>();

  public question: InputSignal<Question> = input.required<Question>();
  public count: WritableSignal<number> = signal<number>(1);
  public properties: WritableSignal<Property[]> = signal<Property[]>([]);
  public fields: Signal<Field[]> = computed(() => {
    return this.question().fields!;
  })

  public constructor(
    private dialog: MatDialog,
  ) { }


  public ngOnInit(): void { }

  public onTouched = () => { };

  public writeValue(value: Property[]): void {
    this.properties.set(value);
  }

  public registerOnChange(fn: (value: Property[]) => void): void {
    this.innerPropertiesChange$.asObservable().subscribe(fn)
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public openDialog() {
    const dialogRef = this.dialog.open(AddPropertyDialogComponent, {
      data: { fields: this.fields() },
      minWidth: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.properties.update(array => structuredClone([...array, result]));
        this.innerPropertiesChange$.next(this.properties());
      }
    });
  }
}
