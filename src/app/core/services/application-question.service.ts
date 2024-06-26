import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ApplicationStepModal } from '@models/application-step.model';
import { QUESTION_RESPONSE } from '@core/services/mock_data/question-response';

@Injectable({ providedIn: 'root' })
export class ApplicationQuestionService {
  public constructor() {}

  public getQuestions(): Observable<ApplicationStepModal[]> {
    return of(QUESTION_RESPONSE).pipe(delay(1000));
  }
}
