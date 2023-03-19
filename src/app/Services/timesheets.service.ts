import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

// import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { PutTimesheetDTO } from '../DTOs/PutTimesheetDTO';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable()
export class TimesheetsService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimesheetsService');
  }

  upsertTimesheet(
    timesheetsURI: string,
    timesheet: PutTimesheetDTO
  ): Observable<PutTimesheetDTO> {
    return this.http
      .put<PutTimesheetDTO>(
        timesheetsURI + '/timesheets',
        timesheet,
        httpOptions
      )
      .pipe(catchError(this.handleError('upsertTimesheet', timesheet)));
  }
}
