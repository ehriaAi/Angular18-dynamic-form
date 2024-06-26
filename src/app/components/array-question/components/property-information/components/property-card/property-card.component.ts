import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Property } from '../../models/property';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyCardComponent {
  public data: InputSignal<Property> =  input.required<Property>();
  public deleteEvent = new EventEmitter<void>();

  public delete(): void {
    this.deleteEvent.emit();
  }
}
