import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationStepService {
  private innerCurrentStep$ = new BehaviorSubject<number>(3);

  public constructor() {}

  get currentStep$(): Observable<number> {
    return this.innerCurrentStep$.asObservable();
  }

  public nextStep(): void {
    this.innerCurrentStep$.next(this.innerCurrentStep$.value + 1);
  }

  public preStep(): void {
    this.innerCurrentStep$.next(this.innerCurrentStep$.value - 1);
  }
}
